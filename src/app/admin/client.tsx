"use client";

import { useRouter } from "next/navigation";
import { createClient } from "../../../utils/supabase/client";
import {
  IoPersonCircleOutline,
  IoLogOutOutline,
  IoRefresh,
} from "react-icons/io5";
import { FaTrash, FaUpload, FaPen, FaMagnifyingGlass } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { PostgrestError } from "@supabase/supabase-js";
import r2 from "../../../utils/cloudflare/upload";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { Slide, ToastContainer, toast } from "react-toastify";
import { BsExclamationCircleFill } from "react-icons/bs";
import "react-toastify/dist/ReactToastify.css";

interface MenuDataType {
  name: string;
  email: string;
  role: string;
}
const supabase = createClient();

export const Menu: React.FC<MenuDataType> = (props) => {
  const [menuState, setMenuState] = useState(false);
  const [modalLogOutState, setModalLogOutState] = useState(false);
  const router = useRouter();
  const handleLogOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const menuRef = useRef<HTMLDivElement | null>(null);
  const iconRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        iconRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !iconRef.current.contains(event.target as Node)
      ) {
        setMenuState(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <>
      {/* name*/}
      <div
        ref={iconRef}
        onMouseDown={() => {
          setMenuState(!menuState);
        }}
        className="cursor-pointer"
      >
        <IoPersonCircleOutline
          className="text-4xl md:text-6xl fill-black hover:fill-creatBright
        transition-colors duration-100"
        />
      </div>
      {menuState && (
        <div
          ref={menuRef}
          className="absolute md:top-[76px] md:right-[62px] w-fit bg-white
        z-10 flex-col rounded drop-shadow-xl flex"
        >
          <div className="flex justify-between p-2 md:px-6 md:py-3 items-center border-b">
            <div className="flex flex-col">
              <h1 className="text-base md:text-xl leading-none capitalize font-semibold">
                {props.name}
              </h1>
              <h1 className="text-sm md:text-lg leading-none lowercase text-neutral-500">
                {props.role}
              </h1>
            </div>
            <button onMouseDown={() => setModalLogOutState(true)}>
              <IoLogOutOutline className="text-2xl md:text-3xl hover:text-red-500 transition-colors duration-100" />
            </button>
          </div>
          <div className="p-2 md:px-6 md:py-3">
            <h1 className="text-base md:text-xl leading-none lowercase">
              {props.email}
            </h1>
          </div>
        </div>
      )}

      {/* backdrop of modal */}
      <div
        onMouseDown={() => setModalLogOutState(false)}
        style={{ display: modalLogOutState ? "flex" : "none" }}
        className="fixed top-0 left-0 w-full h-full z-50 bg-black/50 flex
      items-center justify-center"
      >
        <div
          onMouseDown={(e) => e.stopPropagation()}
          className="bg-white rounded-lg flex flex-col gap-y-4 p-4"
        >
          <h1 className="text-lg text-center">
            Are you sure you want to log out?
          </h1>
          <div className="flex justify-around">
            <button
              onMouseDown={() => setModalLogOutState(false)}
              className="capitalize px-2 py-1 text-base font-semibold"
            >
              cancel
            </button>
            <button
              onMouseDown={handleLogOut}
              className="capitalize px-2 py-1 text-base bg-red-500
            text-white font-semibold rounded-lg hover:bg-transparent
            border-2 border-red-500 hover:text-red-500 transition-all duration-100"
            >
              log out
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export const Form = () => {
  const imageUploadRef = useRef<HTMLInputElement>(null);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  useEffect(() => {
    const pageSelect = document.getElementById("page") as HTMLSelectElement;
    const categorySelect = document.getElementById(
      "category",
    ) as HTMLSelectElement;

    const handleSelectChange = (event: Event) => {
      const target = event.target as HTMLSelectElement;

      if (target.value === "placeholder") {
        target.style.color = "#71717a";
      } else {
        target.style.color = "black";
      }
    };

    pageSelect.addEventListener("change", handleSelectChange);
    categorySelect.addEventListener("change", handleSelectChange);

    return () => {
      pageSelect.removeEventListener("change", handleSelectChange);
      categorySelect.removeEventListener("change", handleSelectChange);
    };
  }, []);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    // custom error if non selected page
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (!formData.has("page")) {
      const page = document.getElementById("page") as HTMLSelectElement;
      page?.focus();
      page?.setCustomValidity("Please select a page");
      page?.reportValidity();
      page.setCustomValidity("");
      return;
    }
    // custom error if non selected category
    if (!formData.has("category")) {
      const category = document.getElementById("category") as HTMLSelectElement;
      category?.focus();
      category?.setCustomValidity("Please select a category");
      category?.reportValidity();
      category.setCustomValidity("");
      return;
    }

    const uploadData = {
      page: formData.get("page") as string,
      category: formData.get("category") as string,
      name: formData.get("name") as string,
      description: formData.get("description") as string,
    };

    const form = e.currentTarget;

    try {
      const dir = `${uploadData.category}_${uploadData.name}`;
      await handleR2Upload(selectedImages, dir);

      interface ImageUrlMap {
        [imageName: string]: string;
      }
      const images = selectedImages.reduce((prev: ImageUrlMap, image) => {
        const url = handleImageUrl({
          endpoint: "https://pub-5c15a84b97fc4cc889a06969fb95be5f.r2.dev",
          dir,
          name: image.name,
        });
        prev[image.name] = url;
        return prev;
      }, {});

      await handleSupabaseUpload({ ...uploadData, images });
      form.reset();
      document
        .getElementById("page")
        ?.dispatchEvent(new Event("change", { bubbles: true }));
      document
        .getElementById("category")
        ?.dispatchEvent(new Event("change", { bubbles: true }));
      setSelectedImages([]);
      if (!toast.isActive(1)) {
        toast.success(
          "Project uploaded successfully, changes may take few minutes to apply",
          {
            toastId: 1,
            position: "top-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            theme: "light",
            transition: Slide,
          },
        );
      }
    } catch (error) {
      if (!toast.isActive(2)) {
        toast.error(
          "Something went wrong, please refresh the page and try again",
          {
            toastId: 2,
            position: "top-left",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
            transition: Slide,
            icon: () => (
              <BsExclamationCircleFill className="text-lg text-red-500" />
            ),
          },
        );
      }
    }
  };

  const handleR2Upload = async (images: File[], dir: string) => {
    const uploadPromises = images.map(async (image) => {
      const key = `${dir}/${image.name}`;
      const uploadCommand = new PutObjectCommand({
        Bucket: "creat",
        Key: key,
        Body: image,
        ContentType: image.type,
      });

      return r2
        .send(uploadCommand)
        .then(() => key)
        .catch((error) => {
          if (error) {
            if (!toast.isActive(key)) {
              toast.error(`Error uploading image ${key}, plese try again`, {
                toastId: key,
                position: "top-left",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
                transition: Slide,
                icon: () => (
                  <BsExclamationCircleFill className="text-lg text-red-500" />
                ),
              });
            }
          }
        });
    });

    return Promise.all(uploadPromises);
  };

  interface tableTypes {
    page: string;
    category: string;
    name: string;
    description?: string;
    images: Record<string, string>;
  }
  const handleSupabaseUpload = async ({
    page,
    category,
    name,
    description,
    images,
  }: tableTypes) => {
    const { error: insertErr } = await supabase.from("images").insert([
      {
        category,
        name,
        description,
        page,
        images,
      },
    ]);
    if (insertErr) {
      if (!toast.isActive(0)) {
        toast.error(
          `Error uploading data to Database, please try again. Error code: ${insertErr.code}`,
          {
            toastId: 0,
            position: "top-left",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
            transition: Slide,
            icon: () => (
              <BsExclamationCircleFill className="text-lg text-red-500" />
            ),
          },
        );
      }
    }
  };

  interface imageUrl {
    endpoint: string;
    dir: string;
    name: string;
  }
  const handleImageUrl = ({ endpoint, dir, name }: imageUrl) => {
    if (name.charAt(0) == "$") {
      name = "%24" + name.slice(1);
    }
    return `${endpoint}/${dir}%2F${name}`;
  };

  const [fileHover, setFileHover] = useState(false);
  const [modalDeleteState, setModalDeleteState] = useState(false);

  const handleImageSelect = (e: React.SyntheticEvent<HTMLInputElement>) => {
    if ((e.target as HTMLInputElement).files?.length !== 0) {
    }
    const images = (e.target as HTMLInputElement).files;
    if (images) {
      setSelectedImages(Array.from(images));
      const formData = new FormData();
      formData.append("images", images[0]);
      console.log(formData);
    }
  };

  useEffect(() => {
    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      setFileHover(true);
    };
    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      setFileHover(false);
    };
    const handleDrop = (e: DragEvent) => {
      setFileHover(false);

      const elementUnderMouse = document.elementFromPoint(e.clientX, e.clientY);

      if (elementUnderMouse !== imageUploadRef.current) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };
    document.body.addEventListener("dragover", handleDragOver);
    document.body.addEventListener("dragleave", handleDragLeave);
    document.body.addEventListener("drop", handleDrop);

    return () => {
      document.body.removeEventListener("dragover", handleDragOver);
      document.body.removeEventListener("dragleave", handleDragLeave);
      document.body.removeEventListener("drop", handleDrop);
    };
  }, []);

  const handleSingleImageDelete = (
    indexToDelete: number,
    imageUrlToDelete: string,
  ) => {
    setSelectedImages((prevImages) =>
      prevImages.filter((_, index) => index !== indexToDelete),
    );

    URL.revokeObjectURL(imageUrlToDelete);

    if (imageUploadRef.current) {
      const dt = new DataTransfer();
      const files = imageUploadRef.current.files;
      if (files) {
        for (let i = 0; i < files.length; i++) {
          if (i !== indexToDelete) {
            dt.items.add(files[i]);
          }
        }
        imageUploadRef.current.files = dt.files;
      }
    }
  };

  const [renameState, setRenameState] = useState(false);
  const [newName, setNewName] = useState("");
  const [renameInputChanged, setRenameInputChanged] = useState(false);
  const [imageIndex, setImageIndex] = useState(-1);
  const handleImageRename = (index: number, newName: string) => {
    const image = selectedImages[index];
    const lastDotIndex = image.name.lastIndexOf(".");
    const extension = lastDotIndex !== -1 ? image.name.slice(lastDotIndex) : "";

    const sanitizedNewName = newName.trim();
    if (!sanitizedNewName || sanitizedNewName === "$") {
      return;
    }

    const newFileName = "$" + sanitizedNewName + extension;

    const renamedImage = new File([image], newFileName, { type: image.type });

    setSelectedImages((prevImages) =>
      prevImages.map((img, i) => (i === index ? renamedImage : img)),
    );

    setImageIndex(-1);
    setRenameState(false);
    setNewName("");
    setRenameInputChanged(false);
  };

  const handleImageName = (name: string) => {
    let displayName: string = name;
    let extension = "";
    if (name.startsWith("$")) {
      displayName = name.slice(1);
    }
    const maxLength = 18;
    const dotIndex = displayName.lastIndexOf(".");
    if (dotIndex !== -1) {
      extension = displayName.slice(dotIndex);
      displayName = displayName.slice(0, dotIndex);
    }

    const availableChars = Math.max(0, maxLength - extension.length - 3);
    if (displayName.length > availableChars) {
      return displayName.slice(0, availableChars) + "..." + extension;
    } else return displayName + extension;
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setRenameState(false);
        setModalDeleteState(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    if (modalDeleteState || renameState) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [modalDeleteState, renameState]);

  const [resetForm, setResetForm] = useState(false);

  return (
    <>
      {/* toast modal */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        limit={2}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />

      {/* delete modal */}
      <div
        onMouseDown={() => setModalDeleteState(false)}
        style={{ display: modalDeleteState ? "flex" : "none" }}
        className="fixed top-0 left-0 w-full h-full z-50 bg-black/50 flex
      items-center justify-center"
      >
        <div
          onMouseDown={(e) => e.stopPropagation()}
          className="bg-white rounded-lg flex flex-col gap-y-4 p-4"
        >
          <h1 className="text-lg text-center">
            Delete all the images selected
          </h1>
          <div className="flex justify-around">
            <button
              onMouseDown={() => setModalDeleteState(false)}
              className="capitalize px-2 py-1 text-base font-semibold"
            >
              cancel
            </button>
            <button
              onMouseDown={() => {
                if (imageUploadRef.current) {
                  imageUploadRef.current.value = "";
                }
                (
                  document.getElementById("renameInput") as HTMLInputElement
                ).value = "";
                setRenameInputChanged(false);
                setModalDeleteState(false);
                setSelectedImages([]);
              }}
              className="capitalize px-2 py-1 text-base bg-red-500
            text-white font-semibold rounded-lg hover:bg-transparent
            border-2 border-red-500 hover:text-red-500 transition-all duration-100"
            >
              Delete all
            </button>
          </div>
        </div>
      </div>
      {/* rename modal */}
      <div
        onMouseDown={() => setRenameState(false)}
        style={{ display: renameState ? "flex" : "none" }}
        className="fixed top-0 left-0 w-full h-full z-50 bg-black/50 flex
      items-center justify-center"
      >
        <div
          onMouseDown={(e) => e.stopPropagation()}
          className="bg-white rounded-lg flex flex-col gap-y-4 p-4"
        >
          <h1 className="text-lg text-center">
            Set Display Name for the Image
          </h1>
          <input
            type="text"
            id="renameInput"
            className="text-lg p-2 border rounded-lg placeholder:text-zinc-500"
            required
            maxLength={32}
            onChange={(e) => {
              setRenameInputChanged(true);
              setNewName(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleImageRename(imageIndex, newName);
                setRenameState(false);
              }
            }}
            placeholder="display name"
          />
          <div className="flex justify-around">
            <button
              onMouseDown={() => setRenameState(false)}
              className="capitalize px-2 py-1 text-base font-semibold"
            >
              cancel
            </button>
            <button
              onMouseDown={() => {
                if (!renameInputChanged) {
                  return;
                }
                handleImageRename(imageIndex, newName);
              }}
              style={
                !renameInputChanged
                  ? {
                      filter: "grayscale(1)",
                      pointerEvents: "none",
                    }
                  : {}
              }
              className="capitalize px-2 py-1 text-base bg-blue-500
            text-white font-semibold rounded-lg hover:bg-transparent
            border-2 border-blue-500 hover:text-blue-500 transition-all duration-100"
            >
              Rename
            </button>
          </div>
        </div>
      </div>

      <section className="w-full md:w-[calc(50%-48px)] flex drop-shadow">
        {/* add new project */}
        <div className="w-full flex flex-col bg-white gap-y-6 rounded-lg p-4">
          {/* heading and desc */}
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold capitalize leading-tight">
                Add new project
              </h1>
              <p>Please review changes before publishing!</p>
            </div>
            <IoRefresh
              onMouseDown={() => {
                setResetForm(true);
                const form = document.getElementById(
                  "uploadForm",
                ) as HTMLFormElement;
                form.reset();
                document
                  .getElementById("page")
                  ?.dispatchEvent(new Event("change", { bubbles: true }));
                document
                  .getElementById("category")
                  ?.dispatchEvent(new Event("change", { bubbles: true }));
                setTimeout(() => {
                  setResetForm(false);
                }, 500);
              }}
              className={`md:text-3xl origin-center ${resetForm && "animate-spin-fast"}`}
            />
          </div>
          {/* upload form */}
          <form
            id="uploadForm"
            onSubmit={handleSubmit}
            className="flex flex-wrap gap-y-3"
          >
            <span className="w-full">
              <label
                htmlFor="page"
                className="text-lg
              relative after:content-['*'] after:text-red-500 after:absolute after:-top-1 after:-right-2"
              >
                Page
              </label>
              <select
                name="page"
                id="page"
                required
                defaultValue="placeholder"
                className="w-full bg-transparent border rounded-lg p-2
                mt-0.5 text-zinc-500"
              >
                {/*placeholder*/}
                <option value="placeholder" disabled hidden>
                  Select a page of the project
                </option>
                {/*placeholder*/}
                <option value="home">Home</option>
                <option value="projects">Projects</option>
              </select>
            </span>
            <span className="w-full">
              <label
                htmlFor="category"
                className="text-lg
              relative after:content-['*'] after:text-red-500 after:absolute after:-top-1 after:-right-2"
              >
                Category
              </label>
              <select
                name="category"
                id="category"
                required
                defaultValue="placeholder"
                className="w-full bg-transparent border rounded-lg p-2 mt-0.5 text-zinc-500"
              >
                {/*placeholder*/}
                <option value="placeholder" disabled hidden>
                  Select a category of the project
                </option>
                {/*placeholder*/}
                <option value="home">Home</option>
                <option value="interior">Interior</option>
                <option value="exterior">Exterior</option>
                <option value="project">Project</option>
              </select>
            </span>
            <span className="w-full">
              <label
                htmlFor="name"
                className="text-lg
              relative after:content-['*'] after:text-red-500 after:absolute after:-top-1 after:-right-2"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                placeholder="Provide a name for the project"
                className="w-full bg-transparent border rounded-lg p-2 mt-0.5
              placeholder-zinc-500"
              />
            </span>
            <span className="w-full">
              <label htmlFor="description" className="text-lg">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                className="resize-y overflow-hidden w-full bg-transparent
                rounded-lg border p-2 mt-0.5 placeholder-zinc-500 min-h-[8rem]"
                placeholder="Provide a description for the project"
              />
            </span>
            <span className="w-full flex flex-col">
              <span className="flex justify-between items-center flex-wrap">
                <label
                  htmlFor="images"
                  className="text-lg relative after:content-['*'] w-fit
          after:text-red-500 after:absolute after:-top-1 after:-right-2 text-nowrap"
                >
                  Upload Image(s)
                </label>
                {selectedImages.length > 0 ? (
                  <button
                    className="appearance-none"
                    type="button"
                    onMouseDown={() => {
                      setModalDeleteState(true);
                    }}
                  >
                    <h1 className="text-red-500 font-bold text-sm">
                      Delete all
                    </h1>
                  </button>
                ) : (
                  <div className="text-zinc-500 flex gap-x-2 text-sm">
                    <span>.png</span>
                    <span>.gif</span>
                    <span>.jpg</span>
                    <span>.jpeg</span>
                    <span>.webp</span>
                    <span>.svg</span>
                  </div>
                )}
              </span>
              <div className="relative">
                <input
                  type="file"
                  name="images"
                  id="images"
                  accept=".png, .gif, .jpg, .jpeg, .webp, .svg"
                  required
                  multiple
                  ref={imageUploadRef}
                  onChange={handleImageSelect}
                  style={{ color: fileHover ? "transparent" : "" }}
                  className={`w-full h-[200px] bg-transparent border rounded-lg p-2
                mt-0.5  text-zinc-500 text-center
                leading-[200px] file:hidden`}
                />
                <div
                  className={`w-full h-full top-0 left-0 bg-creatBright/50
            rounded-lg absolute flex ${!fileHover && "hidden"} items-center
            justify-center gap-x-2 pointer-events-none`}
                >
                  <h1 className="text-white text-lg leading-none block font-bold">
                    Drop the images here
                  </h1>
                  <FaUpload className="text-lg text-white" />
                </div>
              </div>
              <div
                className={`w-full h-[200px]
            overflow-hidden rounded-lg border mt-3 ${selectedImages.length === 0 && "hidden"}`}
              >
                <div
                  className="flex overflow-x-scroll p-2 gap-x-2 h-full relative
            snap-x snap-mandatory md:snap-none"
                >
                  {selectedImages.map((image, index) => {
                    const imageUrl = URL.createObjectURL(image);
                    return (
                      <div
                        key={index}
                        className="relative shrink-0 inline-block h-full max-w-full
                  group"
                      >
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Image ${index}`}
                          draggable={false}
                          className="w-full h-full object-contain snap-center border"
                        />
                        <div
                          className="absolute top-full left-1/2 -translate-y-full px-2
                  -translate-x-1/2 w-full h-8 bg-black/50
                  flex items-center justify-between"
                        >
                          <h1 className="text-white text-lg">
                            {handleImageName(image.name)}
                          </h1>
                          <div className="flex gap-x-2">
                            <button
                              type="button"
                              onClick={() => {
                                setImageIndex(index);
                                setRenameState(true);
                              }}
                              className="appearance-none w-fit h-fit"
                            >
                              <FaPen className="text-lg text-white" />
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                handleSingleImageDelete(index, imageUrl)
                              }
                              className="appearance-none w-fit h-fit"
                            >
                              <FaTrash className="text-lg text-red-500" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </span>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg
              font-semibold hover:bg-blue-700 transition-colors duration-100"
            >
              Publish Changes
            </button>
            <span className="text-zinc-500 text w-full">
              Fields marked with an asterisk
              <span className="text-red-500 mx-1">*</span>are required.
            </span>
          </form>
        </div>
      </section>
    </>
  );
};

export const Preview = () => {
  const [searchTerm, setSearchTerm] = useState("");
  interface ColumnWidth {
    date: number;
    category: number;
    page: number;
    name: number;
    description: number;
    images: number;
  }

  const [columnWidth, setColumnWidth] = useState<ColumnWidth>({
    date: 1,
    category: 1,
    page: 1,
    name: 1,
    description: 1,
    images: 8,
  });

  const handleColumnGrow = (col: keyof ColumnWidth) => {
    setColumnWidth((prevWidth) => {
      const newWidth = { ...prevWidth };
      for (const key in newWidth) {
        newWidth[key as keyof ColumnWidth] = key === col ? 8 : 1;
      }
      return newWidth;
    });
  };

  interface dataTableTypes {
    date: string;
    category: string;
    page: string;
    name: string;
    description?: string;
    images: Record<string, string>;
  }
  const [dataTable, setDataTable] = useState<dataTableTypes[]>([]);
  const [dataError, setDataError] = useState<PostgrestError | null>(null);

  useEffect(() => {
    const handleTable = async () => {
      const { data, error } = await supabase
        .from("images")
        .select("*")
        .order("created_at", { ascending: false });
      if (data) {
        setDataTable(data);
      } else if (error) {
        setDataError(error);
      }
    };
    handleTable();
  }, []);

  const tableHeadings: (keyof ColumnWidth)[] = [
    "date",
    "category",
    "page",
    "name",
    "description",
    "images",
  ];

  return (
    <section className="w-full md:w-[calc(50%-48px)] drop-shadow">
      <div className="w-full flex flex-col bg-white gap-y-6 rounded-lg p-4 min-h-[50vh]">
        {/* heading and desc */}
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold capitalize leading-tight">
            content overview
          </h1>
          <p>View and manage the contents of website</p>
        </div>

        {/* preview */}
        <div className="flex flex-wrap gap-y-3">
          <span className="w-full relative">
            <input
              type="text"
              placeholder="Search Content from Database..."
              className="w-full bg-transparent border rounded-lg p-2
              placeholder-zinc-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaMagnifyingGlass
              className="absolute top-1/2 -translate-y-1/2
        text-zinc-500 right-2 text-lg pointer-events-none"
            />
          </span>
          <div
            className="w-full h-fit flex justify-between gap-x-2 border-b mt-6 pb-2
       text-zinc-500 font-medium overflow-x-scroll"
          >
            {tableHeadings.map((element, index) => {
              return (
                <h1
                  onMouseDown={() => handleColumnGrow(element)}
                  key={index}
                  className={`${columnWidth[element] > 1 && "text-blue-500"} cursor-pointer capitalize`}
                >
                  {element}
                </h1>
              );
            })}
          </div>
          <div className="w-full flex gap-2"></div>
        </div>
      </div>
    </section>
  );
};
