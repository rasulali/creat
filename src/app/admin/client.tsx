"use client";

import { useRouter } from "next/navigation";
import { createClient } from "../../../utils/supabase/client";
import { IoPersonCircleOutline, IoLogOutOutline } from "react-icons/io5";
import { FaTrash, FaUpload, FaPen, FaMagnifyingGlass } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { PostgrestError } from "@supabase/supabase-js";

interface MenuDataType {
  name: string;
  email: string;
  role: string;
}

const supabase = createClient();

export const Menu: React.FC<MenuDataType> = (props) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuState(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [menuState, setMenuState] = useState(false);
  const [modalLogOutState, setModalLogOutState] = useState(false);
  const router = useRouter();
  const handleLogOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div
      className="w-1/2 h-full
  relative flex justify-end"
    >
      {/* name*/}
      <IoPersonCircleOutline
        onClick={() => setMenuState(!menuState)}
        className="text-4xl fill-black hover:fill-creatBright
        transition-colors duration-100"
      />
      <div
        style={{ display: menuState ? "flex" : "none" }}
        ref={menuRef}
        className="absolute top-14 right-2 w-fit bg-white
        z-10 flex-col rounded border"
      >
        <div className="flex justify-between p-2 items-center border-b">
          <div className="flex flex-col">
            <h1 className="text-base leading-none capitalize font-semibold">
              {props.name}
            </h1>
            <h1 className="text-sm leading-none lowercase text-neutral-500">
              {props.role}
            </h1>
          </div>
          <button onMouseDown={() => setModalLogOutState(true)}>
            <IoLogOutOutline className="text-2xl hover:text-red-500 transition-colors duration-100" />
          </button>
        </div>
        <div className="p-2">
          <h1 className="text-base leading-none lowercase">{props.email}</h1>
        </div>
      </div>
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
    </div>
  );
};

export const Form = () => {
  const handleSelect = (e: React.SyntheticEvent<HTMLSelectElement>) => {
    const selectedOption = e.currentTarget;
    if (selectedOption) {
      selectedOption.style.color = "black";
    }
  };

  const handleCloudflare = (props: File[]) => {
    // if image name does not start $ it's name should be replaced by _
    //else keep the name as it is and apply it to the alt of the image in supabase
    console.log(props);
  };

  const handleUpload = async (props: any) => {
    const { data: newProject, error: errorUpload } = await supabase
      .from("images")
      .insert([
        {
          category: "",
          name: "",
          description: "",
          page: "",
          images: "",
        },
      ]);

    if (errorUpload) {
      console.error("Error uploading image data:", errorUpload);
      // Handle error (e.g., display error message to user)
    } else {
      console.log("Image data uploaded successfully:", newProject);
      // Handle success (e.g., update UI, redirect, etc.)
      //reset the form
    }
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    // custom error if non selected page
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (!formData.has("page")) {
      const page = document.getElementById("page") as HTMLInputElement;
      page?.focus();
      page?.setCustomValidity("Please select a page");
      page?.reportValidity();
      page.setCustomValidity("");
      return;
    }
    // custom error if non selected category
    if (!formData.has("category")) {
      const category = document.getElementById("category") as HTMLInputElement;
      category?.focus();
      category?.setCustomValidity("Please select a category");
      category?.reportValidity();
      category.setCustomValidity("");
      return;
    }
    const data: {
      page: string;
      category: string;
      name: string;
      description?: string;
      images: string[];
    } = {
      page: formData.get("page") as string,
      category: formData.get("category") as string,
      name: formData.get("name") as string,
      description: (formData.get("description") as string) || undefined,
      images: selectedImages.map((image) => image.name),
    };

    // log out the data for debugging
    console.log(JSON.stringify(data, null, 2));
  };

  const [fileHover, setFileHover] = useState(false);
  const [modalDeleteState, setModalDeleteState] = useState(false);

  const imageUploadRef = useRef<HTMLInputElement>(null);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

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

  return (
    <>
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

      <section className="w-full flex px-4 mt-6">
        {/* add new project */}
        <div className="w-full flex flex-col bg-white drop-shadow gap-y-6 rounded-lg p-4">
          {/* heading and desc */}
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold capitalize leading-tight">
              Add new project
            </h1>
            <p>Please review changes before publishing!</p>
          </div>
          {/* upload form */}
          <form onSubmit={handleSubmit} className="flex flex-wrap gap-y-3">
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
                onChange={handleSelect}
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
                onChange={handleSelect}
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
            snap-x snap-mandatory"
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
            <span className="text-zinc-500 text-sm">
              Fields marked with an asterisk
              <span className="text-red-500 mx-1">*</span> are required.
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

  type ImagesTableType = {
    category: string;
    name: string;
    description?: string;
    page: string;
    images: object;
    created_at: string;
  };

  const [imagesTable, setImagesTable] = useState<ImagesTableType[]>([]);
  const [imagesTableError, setImagesTableError] =
    useState<PostgrestError | null>(null);

  useEffect(() => {
    const handleTable = async () => {
      const {
        data: imagesTable,
        error: imagesTableError,
        status,
      } = await supabase
        .from("images")
        .select("*")
        .order("created_at", { ascending: false });
      if (imagesTable) {
        setImagesTable(imagesTable);
      } else if (imagesTableError) {
        setImagesTableError(imagesTableError);
      } else {
        console.error(status);
      }
    };
    handleTable();
  }, []);

  interface FormattedDate {
    date: string;
    time: string;
  }

  const formatDate = (timestampString: string): FormattedDate => {
    const timestamp = new Date(timestampString);
    const day = String(timestamp.getDate()).padStart(2, "0");
    const month = String(timestamp.getMonth() + 1).padStart(2, "0");
    const year = timestamp.getFullYear();
    const hours = String(timestamp.getHours()).padStart(2, "0");
    const minutes = String(timestamp.getMinutes()).padStart(2, "0");
    const date = `${day}/${month}/${year}`;
    const time = `${hours}:${minutes}`;
    return { date: date, time: time };
  };

  const tableHeadings: (keyof ColumnWidth)[] = [
    "date",
    "category",
    "page",
    "name",
    "description",
    "images",
  ];

  return (
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
  );
};
