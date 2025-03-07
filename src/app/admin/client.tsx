"use client";

import { useRouter } from "next/navigation";
import { Tooltip } from 'react-tooltip'
import { createClient } from "../../../utils/supabase/client";
import {
  IoPersonCircleOutline,
  IoLogOutOutline,
  IoRefresh,
} from "react-icons/io5";
import { FaMagnifyingGlass, FaXmark, FaPen, FaTrash } from "react-icons/fa6";
import { ImSpinner9 } from "react-icons/im"
import { useEffect, useRef, useState } from "react";
import { PostgrestError } from "@supabase/supabase-js";
import r2 from "../../../utils/cloudflare/upload";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { Slide, ToastContainer, toast } from "react-toastify";
import { BsExclamationCircleFill } from "react-icons/bs";
import "react-toastify/dist/ReactToastify.css";
import { AnimatePresence, motion } from 'framer-motion'
import { FileUpload } from "@/components/fileUpload";
import { categories, formatDate } from "@/lib/helperFunctions";
import { useAdmin } from "./admin-context";

const supabase = createClient();

export const Menu: React.FC<MenuDataType> = (props) => {
  const [menuState, setMenuState] = useState(false);
  const [modalLogOutState, setModalLogOutState] = useState(false);
  const router = useRouter();
  const handleLogOut = async () => {
    const { error } = await supabase.auth.signOut({ scope: 'local' })

    if (error) {
      router.refresh()
    } else {
      router.push('/login');
    }
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
        onClick={() => {
          setMenuState(!menuState);
        }}
        className="cursor-pointer"
      >
        <IoPersonCircleOutline
          className="text-4xl lg:text-5xl fill-black hover:fill-creatBright
        transition-colors duration-100"
        />
      </div>
      {menuState && (
        <div
          ref={menuRef}
          className="absolute lg:top-[76px] lg:right-[62px] w-fit bg-white
        z-10 flex-col rounded drop-shadow-xl flex min-w-[300px]"
        >
          <div className="flex gap-x-6 justify-between p-2 lg:px-6 lg:py-3 items-center border-b">
            <div className="flex flex-col">
              <h1 className="text-base lg:text-xl leading-none capitalize font-semibold">
                {props.name}
              </h1>
              <h1 className="text-sm lg:text-lg leading-none lowercase text-neutral-500">
                {props.role}
              </h1>
            </div>
            <button onClick={() => setModalLogOutState(true)}>
              <IoLogOutOutline className="text-2xl lg:text-3xl hover:text-red-500 transition-colors duration-100" />
            </button>
          </div>
          <div className="p-2 lg:px-6 lg:py-3">
            <h1 className="text-base lg:text-xl leading-none lowercase">
              {props.email}
            </h1>
          </div>
        </div>
      )}

      {/* backdrop of modal */}
      <div
        onClick={() => setModalLogOutState(false)}
        style={{ display: modalLogOutState ? "flex" : "none" }}
        className="fixed top-0 left-0 w-full h-full z-50 bg-black/50 flex
      items-center justify-center"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-lg flex flex-col gap-y-4 p-4"
        >
          <h1 className="text-lg text-center">
            Are you sure you want to log out?
          </h1>
          <div className="flex justify-around">
            <button
              onClick={() => setModalLogOutState(false)}
              className="capitalize px-2 py-1 text-base font-semibold"
            >
              cancel
            </button>
            <button
              onClick={handleLogOut}
              type="button"
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

  const { editingProject, setEditingProject, deleteProject, setDeleteProject } = useAdmin();
  const [existingProject, setExistingProject] = useState<Project | null>(null);
  const [existingImages, setExistingImages] = useState<Record<string, string>>({});
  const [deleteProjectModal, setDeleteProjectModal] = useState(false);

  useEffect(() => {
    if (deleteProject) {
      setDeleteProjectModal(true);
    }
  }, [deleteProject]);

  const handleDeleteProject = async () => {
    if (!editingProject) return;

    try {
      // Delete images from R2
      const { category, name, images } = editingProject;
      const dir = `projects/${category}/${name}`;

      // Delete all project images from Cloudflare R2
      const deletePromises = Object.keys(images || {}).map(async (imageName) => {
        const key = `${dir}/${imageName}`;
        const command = new DeleteObjectCommand({
          Bucket: "creat",
          Key: key,
        });
        await r2.send(command);
      });

      await Promise.all(deletePromises);

      // Delete project from Supabase
      const { error } = await supabase
        .from('images')
        .delete()
        .eq('id', editingProject.id);

      if (error) throw error;


      toast.success('Project deleted successfully');
    } catch (error) {
      toast.error('Error deleting project. Please try again.');
    } finally {
      setDeleteProject(false);
      setEditingProject(null);
      setDeleteProjectModal(false);
    }
  };

  useEffect(() => {
    const fetchProject = async () => {
      if (editingProject && !deleteProject) {
        const { data, error } = await supabase
          .from('images')
          .select('*')
          .eq('id', editingProject.id)
          .single();

        if (data) {
          setExistingProject(data);
          setExistingImages(data.images || {});
          // Populate form fields
          const form = document.getElementById("uploadForm") as HTMLFormElement;
          if (form) {
            (form.elements.namedItem('category') as HTMLInputElement).value = data.category;
            (form.elements.namedItem('name') as HTMLInputElement).value = data.name;
            (form.elements.namedItem('location') as HTMLInputElement).value = data.location || '';
            (form.elements.namedItem('service') as HTMLInputElement).value = data.service || '';
            (form.elements.namedItem('description') as HTMLInputElement).value = data.description || '';
          }
        }
      }
    };

    fetchProject();
  }, [editingProject]);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
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
      category: formData.get("category") as string,
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      location: formData.get("location") as string,
      service: formData.get("service") as string
    };

    const form = e.currentTarget;

    try {
      setLoading(true);

      if (editingProject && !deleteProject) {
        // Update existing project
        const { error } = await supabase
          .from('images')
          .update({
            ...uploadData,
            images: existingImages
          })
          .eq('id', editingProject.id);

        if (!error) {
          toast.success('Project updated successfully');
          setEditingProject(null);
        }
      } else {
        const dir = `projects/${uploadData.category}/${uploadData.name}`;
        const r2Response = await handleR2Upload(selectedImages, dir);

        const hasR2Errors = r2Response.some(
          (result) => result instanceof Error
        );

        if (hasR2Errors) {
          throw new Error
        }
        else {

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
            .getElementById("category")
            ?.dispatchEvent(new Event("change", { bubbles: true }));
          setSelectedImages([]);
          if (!toast.isActive("sb")) {
            toast.success(
              <>
                Project uploaded successfully
                <br />
                <span className="opacity-80">
                  Changes may take a few minutes to apply
                </span>
              </>,
              {
                toastId: "sb",
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
        }
      }
    } catch (error) {
      if (!toast.isActive("r2") && !toast.isActive(2) && !toast.isActive("sb")) {
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
    } finally {
      setLoading(false);
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
            if (!toast.isActive("r2")) {
              toast.error(`Error uploading image ${key}, plese try again`, {
                toastId: "r2",
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
            return error;
          }
        });
    });

    return Promise.all(uploadPromises);
  };

  const handleSupabaseUpload = async ({
    category,
    name,
    description,
    images,
    location,
    service,
  }: tableTypes) => {
    const { error: insertErr } = await supabase.from("images").insert([
      {
        category,
        name,
        description,
        images,
        location,
        service,
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
    return `${endpoint}/${encodeURIComponent(dir + "/" + name)}`;
  };

  const [modalDeleteState, setModalDeleteState] = useState(false);

  const handleImageSelect = (images: File[]) => {
    if (images) {
      setSelectedImages(Array.from(images));
      const formData = new FormData();
      formData.append("images", images[0]);
    }
  };


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
    const lastDotIndex = image.name.lastIndexOf('.');
    const extension = lastDotIndex !== -1 ? image.name.slice(lastDotIndex) : '';

    // Remove any existing '$' prefix and extension from the new name
    let sanitizedNewName = newName.trim();
    const newNameDotIndex = sanitizedNewName.lastIndexOf('.');
    if (newNameDotIndex !== -1) {
      sanitizedNewName = sanitizedNewName.slice(0, newNameDotIndex);
    }
    // Remove '$' if it exists at the start
    if (sanitizedNewName.startsWith('$')) {
      sanitizedNewName = sanitizedNewName.slice(1);
    }

    // Check if the name is empty or just '$'
    if (!sanitizedNewName || sanitizedNewName === '$') {
      return;
    }

    const newFileName = '$' + sanitizedNewName + extension;

    const renamedImage = new File([image], newFileName, { type: image.type });

    setSelectedImages((prevImages) =>
      prevImages.map((img, i) => (i === index ? renamedImage : img))
    );

    // Reset states
    setImageIndex(-1);
    setRenameState(false);
    setNewName('');
    setRenameInputChanged(false);

    // Reset the input field
    const renameInput = document.getElementById('renameInput') as HTMLInputElement;
    if (renameInput) {
      renameInput.value = '';
    }
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
  const [loading, setLoading] = useState(false);

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

      {/* Delete Project Confirmation Modal */}
      <div
        onClick={() => setDeleteProjectModal(false)}
        style={{ display: deleteProjectModal ? "flex" : "none" }}
        className="fixed top-0 left-0 w-full h-full z-50 bg-black/50 flex items-center justify-center"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-lg flex flex-col gap-y-4 p-4"
        >
          <h1 className="text-lg text-center">
            Are you sure you want to delete this entire project?
          </h1>
          <span className="text-red-500 text-lg font-semibold text-center">
            This action cannot be undone!
          </span>
          <div className="flex justify-around">
            <button
              onClick={() => {
                setDeleteProjectModal(false);
                setDeleteProject(false);
                setEditingProject(null);
              }}
              className="capitalize px-2 py-1 text-base font-semibold"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteProject}
              className="capitalize px-2 py-1 text-base bg-red-500
            text-white font-semibold rounded-lg hover:bg-transparent
            border-2 border-red-500 hover:text-red-500 transition-all duration-100"
            >
              Delete Project
            </button>
          </div>
        </div>
      </div>

      {/* delete modal */}
      <div
        onClick={() => setModalDeleteState(false)}
        style={{ display: modalDeleteState ? "flex" : "none" }}
        className="fixed top-0 left-0 w-full h-full z-50 bg-black/50 flex
      items-center justify-center"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-lg flex flex-col gap-y-4 p-4"
        >
          <h1 className="text-lg text-center">
            Delete all the images selected
          </h1>
          <div className="flex justify-around">
            <button
              onClick={() => setModalDeleteState(false)}
              className="capitalize px-2 py-1 text-base font-semibold"
            >
              cancel
            </button>
            <button
              onClick={() => {
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
        onClick={() => setRenameState(false)}
        style={{ display: renameState ? "flex" : "none" }}
        className="fixed top-0 left-0 w-full h-full z-50 bg-black/50 flex
      items-center justify-center"
      >
        <div
          onClick={(e) => e.stopPropagation()}
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
              onClick={() => setRenameState(false)}
              className="capitalize px-2 py-1 text-base font-semibold"
            >
              cancel
            </button>
            <button
              onClick={() => {
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

      <section className="w-full drop-shadow col-start-1 row-start-1">
        {/* add new project */}
        <div
          style={{
            background: resetForm ? "transparent" : "white",
            pointerEvents: resetForm ? "none" : "auto"
          }}
          className="w-full flex flex-col gap-y-6 rounded-lg p-4">
          {/* heading and desc */}
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold capitalize leading-tight">
                Add new project
              </h1>
              <p className="text-orange-500 font-bold">Please review changes before publishing!</p>
            </div>
            {editingProject && !deleteProject ?
              <button
                onClick={() => {
                  setEditingProject(null)
                  setResetForm(true);
                  const form = document.getElementById(
                    "uploadForm",
                  ) as HTMLFormElement;
                  form.reset();
                  document
                    .getElementById("category")
                    ?.dispatchEvent(new Event("change", { bubbles: true }));
                  setTimeout(() => {
                    setResetForm(false);
                  }, 500);
                }}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full z-10"
              >
                <FaXmark className="text-xl" />
              </button>
              :
              <motion.div
                animate={{ rotate: resetForm ? 360 : [0, 360] }}
              >
                <IoRefresh
                  onClick={() => {
                    setResetForm(true);
                    const form = document.getElementById(
                      "uploadForm",
                    ) as HTMLFormElement;
                    form.reset();
                    document
                      .getElementById("category")
                      ?.dispatchEvent(new Event("change", { bubbles: true }));
                    setTimeout(() => {
                      setResetForm(false);
                    }, 500);
                  }}
                  className="lg:text-3xl origin-center" />
              </motion.div>
            }
          </div>
          {/* upload form */}
          <form
            id="uploadForm"
            onSubmit={handleSubmit}
            className="flex flex-wrap gap-y-3"
          >
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
                className="w-full bg-transparent border rounded-lg p-2 mt-0.5"
              >
                {Object.entries(categories).map(([key, category]) => (
                  <option key={key} value={key}>{category.name}</option>
                ))}
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
              <label htmlFor="location" className="text-lg">
                Location
              </label>
              <input
                type="text"
                name="location"
                id="location"
                placeholder="Enter project location"
                className="w-full bg-transparent border rounded-lg p-2 mt-0.5
    placeholder-zinc-500"
              />
            </span>

            <span className="w-full">
              <label htmlFor="text" className="text-lg">
                Service
              </label>
              <input
                type="text"
                name="service"
                id="service"
                placeholder="Enter service provided"
                className="w-full bg-transparent border rounded-lg p-2 mt-0.5
    placeholder-zinc-500 [color-scheme:light]"
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
                    onClick={() => {
                      setModalDeleteState(true);
                    }}
                  >
                    <h1 className="text-red-500 font-bold text-sm">
                      Delete all
                    </h1>
                  </button>
                ) : (
                  <div className="text-zinc-500 flex gap-x-2 text-sm">
                    <span>.jpg</span>
                    <span>.jpeg</span>
                    <span>.png</span>
                    <span>.webp</span>
                    <span>.avif</span>
                    <span>.gif</span>
                    <span>.svg</span>
                  </div>
                )}
              </span>
              <FileUpload
                onDelete={handleSingleImageDelete}
                setImageIndex={setImageIndex} setRenameState={setRenameState}
                files={selectedImages} inputRef={imageUploadRef} onChange={(e: File[]) => handleImageSelect(e)} />
            </span>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg
              font-semibold hover:bg-blue-700 transition-colors duration-100"
            >
              Publish Changes
            </button>
            {loading ? <ImSpinner9 className="animate-spin my-auto ml-2 text-blue-600" /> : <span className="w-6 h-6 my-auto ml-2" />}
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

const HighlightText = ({ text, searchTerm }: { text: string; searchTerm: string }) => {
  if (!searchTerm.trim()) return <span>{text}</span>;

  const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));

  return (
    <span>
      {parts.map((part, index) =>
        part.toLowerCase() === searchTerm.toLowerCase() ?
          <span key={index} className="font-black">{part}</span> :
          part
      )}
    </span>
  );
};


export const Preview = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dataTable, setDataTable] = useState<Project[]>([]);
  const [dataError, setDataError] = useState<PostgrestError | null>(null);
  const imageRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const { setEditingProject, setDeleteProject } = useAdmin();

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


  const filteredProjects = dataTable.filter(project => {
    const searchLower = searchTerm.toLowerCase().trim();
    if (searchLower === '') return true;

    const searchableFields = [
      project.name,
      project.category,
      project.location,
      project.service,
      project.description,
      ...Object.keys(project.images || {})
    ].filter(Boolean) as string[];

    return searchableFields.some(field =>
      field.toLowerCase().includes(searchLower)
    );
  });

  const hasImageNameMatch = (project: Project, searchTerm: string) => {
    if (!project.images) return false;
    const searchLower = searchTerm.toLowerCase().trim();
    return Object.keys(project.images).some(imageName =>
      imageName.toLowerCase().includes(searchLower)
    );
  };


  useEffect(() => {
    // Scroll matching image into view after search
    filteredProjects.forEach((project) => {
      if (hasImageNameMatch(project, searchTerm)) {
        const matchingImageKey = Object.keys(project.images || {}).find(
          imageName => imageName.toLowerCase().includes(searchTerm.toLowerCase().trim())
        );
        if (matchingImageKey) {
          const elementKey = `${project.name}-${matchingImageKey}`;
          const element = imageRefs.current[elementKey];
          element?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    });
  }, [searchTerm, filteredProjects]);

  return (
    <AnimatePresence>
      {
        <section className="w-full drop-shadow col-start-2 row-start-1
      scrollbar-thin scrollbar-track-transparent scrollbar-thumb-neutral-200/50
      hover:scrollbar-thumb-neutral-300/75 scrollbar-thumb-rounded-full">
          <div className="w-full flex flex-col bg-white gap-y-6 rounded-lg p-4">
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold capitalize leading-tight">
                content overview
              </h1>
              <p>View and manage the contents of website</p>
            </div>

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
              <div className="space-y-4">
                {dataError ? (
                  <p className="text-red-500">Error loading projects. Please try again later.</p>
                ) : filteredProjects.length > 0 ? (
                  filteredProjects.map((project, index) => (
                    <div key={index} className="grid gap-4 grid-cols-3 bg-white drop-shadow p-2 rounded-lg">
                      <div className="col-span-1">
                        <div className="aspect-video w-full">
                          {project.images && (
                            <img
                              className="w-full h-full object-cover rounded-lg"
                              src={Object.values(project.images)[0]}
                              alt={project.name || "Project Image"}
                            />
                          )}
                        </div>
                      </div>

                      <div className="col-span-2 flex justify-between items-start">
                        <h1 className="text-xl font-medium">
                          <HighlightText text={project.name} searchTerm={searchTerm} />
                        </h1>
                        <div className="flex gap-x-2">
                          <button
                            onClick={() => setEditingProject(project)}
                            data-tip="Edit" className="lg:tooltip p-2 text-blue-500 rounded-full hover:bg-blue-500
                        hover:text-white transition border border-blue-500">
                            <FaPen className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setDeleteProject(true);
                              setEditingProject(project);
                            }}
                            data-tip="Delete" className="lg:tooltip p-2 text-red-500 rounded-full hover:bg-red-500
                        hover:text-white transition border border-red-500">
                            <FaTrash className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="col-span-2 grid grid-cols-2 gap-y-4 gap-x-2">
                        <h2 className="font-medium">
                          <span className="font-semibold">Service: </span>
                          <span className="line-clamp-2">
                            <HighlightText text={project.service || ''} searchTerm={searchTerm} />
                          </span>
                        </h2>
                        <h2 className="font-medium justify-self-end">
                          <span className="font-semibold">Category: </span>
                          <HighlightText text={project.category || ''} searchTerm={searchTerm} />
                        </h2>
                        <h2 className="font-medium">
                          <span className="font-semibold">Location: </span>
                          <HighlightText text={project.location || ''} searchTerm={searchTerm} />
                        </h2>
                        <h2 className="font-medium justify-self-end">
                          <span className="font-semibold">Date: </span>
                          <HighlightText text={formatDate(project.created_at) || ''} searchTerm={searchTerm} />
                        </h2>
                      </div>

                      <div className="col-span-3">
                        <p className="">
                          <HighlightText text={project.description || ''} searchTerm={searchTerm} />
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500">
                    {dataTable.length === 0 ? "No projects found" : "No matching projects found"}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      }
    </AnimatePresence>
  );
};


interface EmailData {
  email: string;
  created_at: string;
}

export const Customers = () => {
  const [emails, setEmails] = useState<EmailData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmails = async () => {
      const { data, error } = await supabase
        .from('email_submissions')
        .select('email, created_at')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching emails:', error);
      } else {
        setEmails(data || []);
      }
      setLoading(false);
    };

    fetchEmails();
  }, []);

  const deleteEmail = async (email: string) => {
    try {
      const { error } = await supabase
        .from('email_submissions')
        .delete()
        .eq('email', email);

      if (error) {
      } else {
        setEmails(emails.filter((item) => item.email !== email));
      }
    } catch (error) {
      throw new Error('Error deleting email: ' + error);
    }
  };

  const [isDeleteAllModalOpen, setIsDeleteAllModalOpen] = useState(false);
  const openDeleteAllModal = () => setIsDeleteAllModalOpen(true);
  const closeDeleteAllModal = () => setIsDeleteAllModalOpen(false);

  const deleteAllEmails = async () => {
    try {
      const { error } = await supabase.from('email_submissions').delete().neq('email', 0);

      if (!error) {
        setEmails([]);
      }
    } catch (error) {
      if (error instanceof Error) {
        return
      }
    } finally {
      closeDeleteAllModal();
    }
  };

  const exportEmailsToXLSX = () => {
    // Create workbook and worksheet
    const XLSX = require('xlsx');
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet([
      ['Email', 'Created At'], // Header row
      ...emails.map((item) => [item.email, new Date(item.created_at).toLocaleDateString()])
    ]);

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Emails");

    // Generate XLSX file
    const xlsxContent = XLSX.write(workbook, { type: 'array', bookType: 'xlsx' });

    // Convert array to Blob
    const blob = new Blob([xlsxContent], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // Create download link
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'emails.xlsx';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      {isDeleteAllModalOpen && (
        <div
          onClick={() => closeDeleteAllModal()}
          style={{ display: isDeleteAllModalOpen ? "flex" : "none" }}
          className="fixed inset-0 z-50 bg-black/50 flex
      items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg flex flex-col gap-y-4 p-4"
          >
            <h1 className="text-lg text-center">
              Delete all the email history?
            </h1>
            <div className="flex justify-around">
              <button
                onClick={() => closeDeleteAllModal()}
                className="capitalize px-2 py-1 text-base font-semibold"
              >
                cancel
              </button>
              <button
                onClick={() => deleteAllEmails()}
                className="capitalize px-2 py-1 text-base bg-red-500
            text-white font-semibold rounded-lg hover:bg-transparent
            border-2 border-red-500 hover:text-red-500 transition-all duration-100"
              >
                Delete all
              </button>
            </div>
          </div>
        </div>
      )}
      <section className="w-full drop-shadow col-start-1 row-start-2 max-h-screen overflow-y-scroll">
        <Tooltip anchorSelect="#email-delete" place="top" content="Click to Remove" />
        <div className="w-full flex flex-col bg-white gap-y-6 rounded-lg p-4">
          <div className="flex justify-between items-end">
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold capitalize leading-tight">
                List of Submitted Emails
              </h1>
              <p>View the emails that have been submitted to us</p>
            </div>
            <div className="flex gap-x-4">
              <button
                onClick={() => openDeleteAllModal()}
                className="px-4 py-3 rounded-lg border border-red-500 group hover:bg-red-500 transition-colors">
                <h1 className="text-sm font-bold text-red-500 group-hover:text-white">Delete All</h1>
              </button>
              <button
                onClick={() => exportEmailsToXLSX()}
                className="px-4 py-3 rounded-lg border border-blue-500 group hover:bg-blue-500 transition-colors">
                <h1 className="text-sm font-bold text-blue-500 group-hover:text-white">Export to XLSX file</h1>
              </button>
            </div>
          </div>
          <div>
            {loading ? (
              <h1
                className="text-center uppercase"
              >
                Loading...
              </h1>
            ) : (
              <ul className="list-disc space-y-2">
                {emails.length > 0 ? (
                  emails.map((item, index) => (
                    <div className="flex items-end gap-x-2">
                      <li key={index} className="flex justify-between items-center w-full border p-2 rounded-md shadow-md">
                        <span>{item.email}</span>
                        <FaXmark id="email-delete" onClick={() => deleteEmail(item.email)} className="text-red-500 text-xl cursor-pointer" />
                      </li>
                      <span className="text-sm text-gray-500 min-w-20 text-right">{new Date(item.created_at).toLocaleDateString()}</span>
                    </div>
                  ))
                ) : (
                  <p>No emails submitted yet</p>
                )}
              </ul>
            )}
          </div>
        </div>
      </section>
    </>
  );
};
