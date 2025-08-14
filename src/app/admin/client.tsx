"use client";

import { useRouter } from "next/navigation";
import { Tooltip } from "react-tooltip";
import { createClient } from "../../../utils/supabase/client";
import {
  IoPersonCircleOutline,
  IoLogOutOutline,
  IoRefresh,
} from "react-icons/io5";
import {
  FaMagnifyingGlass,
  FaXmark,
  FaPen,
  FaTrash,
  FaArrowUpRightFromSquare,
  FaEnvelopeOpen,
} from "react-icons/fa6";
import { ImSpinner9 } from "react-icons/im";
import { useEffect, useRef, useState } from "react";
import { PostgrestError } from "@supabase/supabase-js";
import r2 from "../../../utils/cloudflare/upload";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AnimatePresence, motion } from "framer-motion";
import { FileUpload } from "@/components/fileUpload";
import {
  categories,
  createProjectSlug,
  formatDate,
  handleImageName,
} from "@/lib/helperFunctions";
import { useAdmin } from "./admin-context";
import Link from "next/link";

const supabase = createClient();

export const Menu: React.FC<MenuDataType> = (props) => {
  const [menuState, setMenuState] = useState(false);
  const [modalLogOutState, setModalLogOutState] = useState(false);
  const router = useRouter();
  const handleLogOut = async () => {
    const { error } = await supabase.auth.signOut({ scope: "local" });

    if (error) {
      router.refresh();
    } else {
      router.push("/login");
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

  const {
    editingProject,
    setEditingProject,
    deleteProject,
    setDeleteProject,
    triggerRefresh,
  } = useAdmin();
  const [existingImages, setExistingImages] = useState<Record<string, string>>(
    {},
  );
  const [deleteProjectModal, setDeleteProjectModal] = useState(false);

  useEffect(() => {
    if (deleteProject) {
      setDeleteProjectModal(true);
    }
  }, [deleteProject]);

  const handleExistingImageRename = (imageName: string) => {
    // Set up for rename modal
    setNewName(imageName.startsWith("$") ? imageName.slice(1) : imageName);
    setRenameState(true);

    // Set a flag to indicate we're renaming an existing image
    setIsRenamingExisting(true);
    setImageToRename(imageName);
  };

  // Handle existing image delete
  const handleExistingImageDelete = (imageName: string) => {
    // Add to list of images to delete from R2
    setImagesToDelete((prev) => [...prev, imageName]);

    // Remove from existingImages
    const updatedImages = { ...existingImages };
    delete updatedImages[imageName];
    setExistingImages(updatedImages);
  };

  // Additional state for renaming existing images
  const [isRenamingExisting, setIsRenamingExisting] = useState(false);
  const [imageToRename, setImageToRename] = useState("");

  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);

  // Display existing images when editing
  const renderExistingImages = () => {
    if (
      !editingProject ||
      !existingImages ||
      Object.keys(existingImages).length === 0
    ) {
      return null;
    }

    return (
      <div className="mt-4">
        <h3 className="text-lg font-medium mb-2">Current Images</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Object.entries(existingImages).map(([imageName, imageUrl]) => (
            <div key={imageName} className="relative group">
              <img
                src={imageUrl as string}
                alt={imageName}
                className="w-full h-32 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 rounded-lg">
                <button
                  type="button"
                  onClick={() => handleExistingImageRename(imageName)}
                  className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                >
                  <FaPen className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleExistingImageDelete(imageName)}
                  className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  <FaTrash className="w-4 h-4" />
                </button>
              </div>
              <span className="text-sm mt-1 block truncate">
                {handleImageName(imageName)}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const handleDeleteProject = async () => {
    if (!editingProject) return;

    try {
      // Delete images from R2
      const { category, name, images } = editingProject;
      const dir = `projects/${category}/${name}`;

      // Delete all project images from Cloudflare R2
      const deletePromises = Object.keys(images || {}).map(
        async (imageName) => {
          const key = `${dir}/${imageName}`;
          const command = new DeleteObjectCommand({
            Bucket: "creat",
            Key: key,
          });
          await r2.send(command);
        },
      );

      await Promise.all(deletePromises);

      // Delete project from Supabase
      const { error } = await supabase
        .from("images")
        .delete()
        .eq("id", editingProject.id);

      if (error) throw error;

      toast.success("Project deleted successfully");
      triggerRefresh();
    } catch (error) {
      toast.error("Error deleting project. Please try again.");
    } finally {
      setDeleteProject(false);
      setEditingProject(null);
      setDeleteProjectModal(false);
    }
  };

  useEffect(() => {
    const fetchProject = async () => {
      if (editingProject && !deleteProject) {
        const { data } = await supabase
          .from("images")
          .select("*")
          .eq("id", editingProject.id)
          .single();

        if (data) {
          setExistingImages(data.images || {});
          // Populate form fields
          const form = document.getElementById("uploadForm") as HTMLFormElement;
          if (form) {
            (form.elements.namedItem("category") as HTMLInputElement).value =
              data.category;
            (form.elements.namedItem("name") as HTMLInputElement).value =
              data.name;
            (form.elements.namedItem("location") as HTMLInputElement).value =
              data.location || "";
            (form.elements.namedItem("service") as HTMLInputElement).value =
              data.service || "";
            (form.elements.namedItem("description") as HTMLInputElement).value =
              data.description || "";
          }
        }
      }
    };

    fetchProject();
  }, [editingProject]);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    // Validate category selection
    if (!formData.has("category")) {
      const category = document.getElementById("category") as HTMLSelectElement;
      category?.reportValidity();
      return;
    }

    // Base upload data
    const uploadData = {
      category: formData.get("category") as string,
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      location: formData.get("location") as string,
      service: formData.get("service") as string,
    };

    try {
      setLoading(true);

      if (editingProject && !deleteProject) {
        // Edit existing project
        const { category: editCategory, name: editName } = editingProject;
        const dir = `projects/${editCategory}/${editName}`;

        // Handle image deletions
        if (imagesToDelete.length > 0) {
          await Promise.all(
            imagesToDelete.map(async (imageName) => {
              const command = new DeleteObjectCommand({
                Bucket: "creat",
                Key: `${dir}/${imageName}`,
              });
              await r2.send(command);
            }),
          );
        }

        // Handle new image uploads
        let updatedImages = { ...existingImages };
        if (selectedImages.length > 0) {
          const r2Response = await handleR2Upload(selectedImages, dir);
          if (r2Response.some((result) => result instanceof Error)) {
            throw new Error("Image upload failed");
          }

          // Add new images to existing ones
          selectedImages.forEach((image) => {
            updatedImages[image.name] = handleImageUrl({
              endpoint: "https://pub-5c15a84b97fc4cc889a06969fb95be5f.r2.dev",
              dir,
              name: image.name,
            });
          });
        }

        // Update database record
        const { error } = await supabase
          .from("images")
          .update({ ...uploadData, images: updatedImages })
          .eq("id", editingProject.id);

        if (error) throw error;
        toast.success("Project updated successfully");
      } else {
        // Create new project
        const dir = `projects/${uploadData.category}/${uploadData.name}`;
        const r2Response = await handleR2Upload(selectedImages, dir);

        if (r2Response.some((result) => result instanceof Error)) {
          throw new Error("Image upload failed");
        }

        // Create images mapping
        const images = selectedImages.reduce(
          (acc: Record<string, string>, image) => {
            acc[image.name] = handleImageUrl({
              endpoint: "https://pub-5c15a84b97fc4cc889a06969fb95be5f.r2.dev",
              dir,
              name: image.name,
            });
            return acc;
          },
          {},
        );

        // Insert new database record
        const { error } = await supabase
          .from("images")
          .insert([{ ...uploadData, images }]);
        if (error) throw error;
        toast.success("Project created successfully");
      }

      // Common success operations
      triggerRefresh();
      resetFormState(form);
    } catch (error: any) {
      toast.error(error.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Helper function to reset form state
  const resetFormState = (form: HTMLFormElement) => {
    form.reset();
    setSelectedImages([]);
    setExistingImages({});
    setImagesToDelete([]);
    setEditingProject(null);
    document
      .getElementById("category")
      ?.dispatchEvent(new Event("change", { bubbles: true }));
  };

  const handleR2Upload = async (images: File[], dir: string) => {
    const uploadPromises = images.map(async (image) => {
      const key = `${dir}/${image.name}`;

      try {
        const arrayBuffer = await image.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);

        const uploadCommand = new PutObjectCommand({
          Bucket: "creat",
          Key: key,
          Body: uint8Array,
          ContentType: image.type,
          ContentLength: image.size,
        });

        await r2.send(uploadCommand);
        return key;
      } catch (error) {
        toast.error(`Error uploading image ${image.name}, please try again`);
        return error;
      }
    });

    return Promise.all(uploadPromises);
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
    if (isRenamingExisting) {
      // Handle renaming existing image
      const currentUrl = existingImages[imageToRename];

      // Remove the old key
      const updatedImages = { ...existingImages };
      delete updatedImages[imageToRename];

      // Add with new key
      const sanitizedNewName = newName.trim();
      const newFileName = "$" + sanitizedNewName;
      updatedImages[newFileName] = currentUrl;

      setExistingImages(updatedImages);
      setIsRenamingExisting(false);
      setImageToRename("");
    } else {
      const image = selectedImages[index];
      const lastDotIndex = image.name.lastIndexOf(".");
      const extension =
        lastDotIndex !== -1 ? image.name.slice(lastDotIndex) : "";

      // Remove any existing '$' prefix and extension from the new name
      let sanitizedNewName = newName.trim();
      const newNameDotIndex = sanitizedNewName.lastIndexOf(".");
      if (newNameDotIndex !== -1) {
        sanitizedNewName = sanitizedNewName.slice(0, newNameDotIndex);
      }
      // Remove '$' if it exists at the start
      if (sanitizedNewName.startsWith("$")) {
        sanitizedNewName = sanitizedNewName.slice(1);
      }

      // Check if the name is empty or just '$'
      if (!sanitizedNewName || sanitizedNewName === "$") {
        return;
      }

      const newFileName = "$" + sanitizedNewName + extension;

      const renamedImage = new File([image], newFileName, { type: image.type });

      setSelectedImages((prevImages) =>
        prevImages.map((img, i) => (i === index ? renamedImage : img)),
      );
    }

    // Reset states
    setImageIndex(-1);
    setRenameState(false);
    setNewName("");
    setRenameInputChanged(false);

    // Reset the input field
    const renameInput = document.getElementById(
      "renameInput",
    ) as HTMLInputElement;
    if (renameInput) {
      renameInput.value = "";
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
  const [selectedCategory, setSelectedCategory] =
    useState<string>("placeholder");

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
        onClick={() => {
          setRenameState(false);
          setIsRenamingExisting(false);
        }}
        style={{ display: renameState ? "flex" : "none" }}
        className="fixed top-0 left-0 w-full h-full z-50 bg-black/50 flex items-center justify-center"
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
            defaultValue={isRenamingExisting ? newName : ""}
            onChange={(e) => {
              setRenameInputChanged(true);
              setNewName(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (isRenamingExisting) {
                  handleImageRename(-1, newName);
                } else {
                  handleImageRename(imageIndex, newName);
                }
              }
            }}
            placeholder="display name"
          />
          <div className="flex justify-around">
            <button
              onClick={() => {
                setRenameState(false);
                setIsRenamingExisting(false);
              }}
              className="capitalize px-2 py-1 text-base font-semibold"
            >
              cancel
            </button>
            <button
              onClick={() => {
                if (!renameInputChanged) {
                  return;
                }
                if (isRenamingExisting) {
                  handleImageRename(-1, newName);
                } else {
                  handleImageRename(imageIndex, newName);
                }
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

      <section className="w-full col-start-1 row-start-1">
        {/* Add New Project */}
        <div className="w-full flex flex-col gap-y-8 bg-gradient-to-br from-slate-50 to-white rounded-2xl p-6 shadow-xl border border-slate-100 relative">
          {resetForm && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 rounded-2xl flex items-center justify-center pointer-events-none">
              <ImSpinner9 className="animate-spin text-blue-600 text-4xl" />
            </div>
          )}
          {/* Heading and Description */}
          <div className="flex justify-between items-center">
            <div className="flex flex-col space-y-2">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent leading-tight">
                Add New Project
              </h1>
              <p className="text-orange-500 font-bold text-lg">
                Please review changes before publishing!
              </p>
            </div>
            <motion.div
              className="cursor-pointer p-3 rounded-xl hover:bg-slate-100 transition-all duration-200 hover:shadow-md border border-slate-200 hover:border-slate-300"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{ rotate: resetForm ? -360 : 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="flex items-center justify-center"
              >
                <IoRefresh
                  onClick={() => {
                    setEditingProject(null);
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
                  className="text-3xl text-slate-600 hover:text-blue-500 transition-colors duration-200"
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Upload Form */}
          <form
            id="uploadForm"
            onSubmit={handleSubmit}
            className="flex flex-wrap gap-y-6"
          >
            {/* Category Select */}
            <span className="w-full">
              <label
                htmlFor="category"
                className="block text-lg font-medium text-slate-700 mb-2 relative after:content-['*'] after:text-red-500 after:text-2xl after:absolute after:-top-1 after:-right-2"
              >
                Category
              </label>
              <div className="relative w-full">
                <select
                  name="category"
                  id="category"
                  required
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  style={{
                    color:
                      selectedCategory === "placeholder"
                        ? "oklch(0.552 0.016 285.938)"
                        : "black",
                  }}
                  className="w-full bg-white/80 backdrop-blur-sm border-2 border-slate-200 rounded-xl
               p-4 pr-10 text-slate-700
               focus:border-blue-400 focus:ring-4 focus:ring-blue-100 focus:bg-white transition-all
               duration-200
               shadow-sm hover:shadow-md hover:border-slate-300 appearance-none"
                  defaultValue="placeholder"
                >
                  <option value="placeholder" disabled hidden>
                    Select a category
                  </option>
                  {Object.entries(categories).map(([key, category]) => (
                    <option key={key} value={key}>
                      {category.name}
                    </option>
                  ))}
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg
                    className="w-5 h-5 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </span>

            {/* Name Input */}
            <span className="w-full">
              <label
                htmlFor="name"
                className="block text-lg font-medium text-slate-700 mb-2 relative after:content-['*'] after:text-2xl after:text-red-500 after:absolute after:-top-1 after:-right-2"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                placeholder="Provide a name for the project"
                className="w-full bg-white/80 backdrop-blur-sm border-2 border-slate-200 rounded-xl p-4
                  text-slate-700 placeholder-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100
                  focus:bg-white transition-all duration-200 shadow-sm hover:shadow-md hover:border-slate-300"
              />
            </span>

            {/* Location Input */}
            <span className="w-full">
              <label
                htmlFor="location"
                className="block text-lg font-medium text-slate-700 mb-2"
              >
                Location
              </label>
              <input
                type="text"
                name="location"
                id="location"
                placeholder="Enter project location"
                className="w-full bg-white/80 backdrop-blur-sm border-2 border-slate-200 rounded-xl p-4
                  text-slate-700 placeholder-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100
                  focus:bg-white transition-all duration-200 shadow-sm hover:shadow-md hover:border-slate-300"
              />
            </span>

            {/* Service Input */}
            <span className="w-full">
              <label
                htmlFor="service"
                className="block text-lg font-medium text-slate-700 mb-2"
              >
                Service
              </label>
              <input
                type="text"
                name="service"
                id="service"
                placeholder="Enter service provided"
                className="w-full bg-white/80 backdrop-blur-sm border-2 border-slate-200 rounded-xl p-4
                  text-slate-700 placeholder-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100
                  focus:bg-white transition-all duration-200 shadow-sm hover:shadow-md hover:border-slate-300
                  [color-scheme:light]"
              />
            </span>

            {/* Description Textarea */}
            <span className="w-full">
              <label
                htmlFor="description"
                className="block text-lg font-medium text-slate-700 mb-2"
              >
                Description
              </label>
              <textarea
                name="description"
                id="description"
                className="resize-y overflow-y-scroll w-full bg-white/80 backdrop-blur-sm border-2 border-slate-200
                  rounded-xl p-4 text-slate-700 placeholder-slate-400 focus:border-blue-400 focus:ring-4
                  focus:ring-blue-100 focus:bg-white transition-all duration-200 shadow-sm hover:shadow-md
                  hover:border-slate-300 min-h-[8rem] max-h-[16rem]"
                placeholder="Provide a description for the project"
              />
            </span>

            {/* Image Upload */}
            <span className="w-full flex flex-col space-y-4">
              <span className="flex justify-between items-center flex-wrap">
                <label
                  htmlFor="images"
                  className="text-lg font-medium text-slate-700 relative after:content-['*'] after:text-2xl
                    after:text-red-500 after:absolute after:-top-1 after:-right-4 text-nowrap"
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
                    <h1 className="text-red-500 font-bold text-sm hover:text-red-600 transition-colors duration-200">
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
              {renderExistingImages()}
              <FileUpload
                required={editingProject ? false : true}
                onDelete={handleSingleImageDelete}
                setImageIndex={setImageIndex}
                setRenameState={setRenameState}
                files={selectedImages}
                inputRef={imageUploadRef}
                onChange={(e: File[]) => handleImageSelect(e)}
              />
            </span>

            {/* Submit Button and Loading */}
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center gap-x-2">
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl
                  font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200
                  shadow-md hover:shadow-lg hover:scale-105"
                >
                  Publish Changes
                </button>
                {loading && (
                  <ImSpinner9 className="animate-spin text-blue-600 text-2xl" />
                )}
              </div>
              <span className="text-slate-500 text-sm">
                Fields marked with an asterisk
                <span className="text-red-500 mx-1">*</span>are required.
              </span>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

const HighlightText = ({
  text,
  searchTerm,
}: {
  text: string;
  searchTerm: string;
}) => {
  if (!searchTerm.trim()) return <span>{text}</span>;

  const parts = text.split(new RegExp(`(${searchTerm})`, "gi"));

  return (
    <span>
      {parts.map((part, index) =>
        part.toLowerCase() === searchTerm.toLowerCase() ? (
          <span key={index} className="font-black">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </span>
  );
};

export const Preview = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dataTable, setDataTable] = useState<Project[]>([]);
  const [dataError, setDataError] = useState<PostgrestError | null>(null);
  const imageRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const { setEditingProject, setDeleteProject, refreshTrigger } = useAdmin();

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
  }, [refreshTrigger]);

  const filteredProjects = dataTable.filter((project) => {
    const searchLower = searchTerm.toLowerCase().trim();
    if (searchLower === "") return true;

    const searchableFields = [
      project.name,
      project.category,
      project.location,
      project.service,
      project.description,
      ...Object.keys(project.images || {}),
    ].filter(Boolean) as string[];

    return searchableFields.some((field) =>
      field.toLowerCase().includes(searchLower),
    );
  });

  const hasImageNameMatch = (project: Project, searchTerm: string) => {
    if (!project.images) return false;
    const searchLower = searchTerm.toLowerCase().trim();
    return Object.keys(project.images).some((imageName) =>
      imageName.toLowerCase().includes(searchLower),
    );
  };

  useEffect(() => {
    // Scroll matching image into view after search
    filteredProjects.forEach((project) => {
      if (hasImageNameMatch(project, searchTerm)) {
        const matchingImageKey = Object.keys(project.images || {}).find(
          (imageName) =>
            imageName.toLowerCase().includes(searchTerm.toLowerCase().trim()),
        );
        if (matchingImageKey) {
          const elementKey = `${project.name}-${matchingImageKey}`;
          const element = imageRefs.current[elementKey];
          element?.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      }
    });
  }, [searchTerm, filteredProjects]);

  return (
    <AnimatePresence>
      {
        <section
          className="w-full col-start-2 row-start-1
    scrollbar-thin scrollbar-track-transparent scrollbar-thumb-neutral-200/50
    hover:scrollbar-thumb-neutral-300/75 scrollbar-thumb-rounded-full"
        >
          <div className="w-full flex flex-col bg-gradient-to-br from-slate-50 to-white gap-y-8 rounded-2xl p-6 shadow-xl border border-slate-100">
            {/* Header Section */}
            <div className="flex flex-col space-y-2">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent leading-tight">
                Content Overview
              </h1>
              <p className="text-slate-600 text-lg font-medium">
                View and manage your website content
              </p>
            </div>

            <div className="flex flex-wrap gap-y-4">
              {/* Enhanced Search Bar */}
              <span className="w-full relative group">
                <input
                  type="text"
                  placeholder="Search projects, categories, locations..."
                  className="w-full bg-white/80 backdrop-blur-sm border-2 border-slate-200
                rounded-xl p-4 pl-12 text-slate-700 placeholder-slate-400
                focus:border-blue-400 focus:ring-4 focus:ring-blue-100
                focus:bg-white transition-all duration-200 shadow-sm
                hover:shadow-md group-hover:border-slate-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FaMagnifyingGlass
                  className="absolute top-1/2 -translate-y-1/2 left-4
              text-slate-400 text-lg pointer-events-none
              group-focus-within:text-blue-500 transition-colors duration-200"
                />
                {/* Search suggestions hint */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hidden md:block">
                  {searchTerm
                    ? `${filteredProjects.length} results`
                    : "Type to search..."}
                </div>
              </span>

              {/* Projects Grid */}
              <div className="w-full space-y-6">
                {dataError ? (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                    <div className="text-red-600 text-lg font-medium mb-2">
                      ⚠️ Error Loading Projects
                    </div>
                    <p className="text-red-500">
                      Please try refreshing the page or contact support.
                    </p>
                  </div>
                ) : filteredProjects.length > 0 ? (
                  filteredProjects.map((project, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="group bg-white rounded-2xl shadow-lg hover:shadow-xl
                    transition-all duration-300 border border-slate-100
                    hover:border-slate-200 overflow-hidden"
                    >
                      {/* Project Card */}
                      <div className="grid gap-6 lg:grid-cols-4 p-6">
                        {/* Image Section */}
                        <div className="lg:col-span-1">
                          <div
                            className="aspect-video w-full relative overflow-hidden rounded-xl
                        shadow-md group-hover:shadow-lg transition-shadow duration-300"
                          >
                            {project.images && (
                              <img
                                className="w-full h-full object-cover group-hover:scale-105
                              transition-transform duration-500"
                                src={Object.values(project.images)[0]}
                                alt={project.name || "Project Image"}
                              />
                            )}
                            {/* Overlay gradient */}
                            <div
                              className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0
                          group-hover:opacity-100 transition-opacity duration-300"
                            />
                          </div>
                        </div>

                        {/* Content Section */}
                        <div className="lg:col-span-3 flex flex-col space-y-4">
                          {/* Header with Actions */}
                          <div className="flex justify-between items-start">
                            <Link
                              href={`/projects/${createProjectSlug(project.name, project.id)}/`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-2xl font-bold text-slate-800 group-hover:text-blue-600
                              transition-colors duration-200 hover:underline"
                            >
                              <HighlightText
                                text={project.name}
                                searchTerm={searchTerm}
                              />
                              <FaArrowUpRightFromSquare className="ml-2 w-4 h-4 text-slate-600 group-hover:text-blue-600 transition-colors duration-200 inline" />
                            </Link>
                            <div className="flex gap-2 opacity-70 group-hover:opacity-100 transition-opacity duration-200">
                              <button
                                onClick={() => setEditingProject(project)}
                                className="p-3 text-blue-500 rounded-xl hover:bg-blue-50
                                                  hover:scale-105 transition-all duration-200 border border-blue-200
                                                  hover:border-blue-300 shadow-sm hover:shadow-md"
                                title="Edit Project"
                              >
                                <FaPen className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => {
                                  setDeleteProject(true);
                                  setEditingProject(project);
                                }}
                                className="p-3 text-red-500 rounded-xl hover:bg-red-50
                                                  hover:scale-105 transition-all duration-200 border border-red-200
                                                  hover:border-red-300 shadow-sm hover:shadow-md"
                                title="Delete Project"
                              >
                                <FaTrash className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          {/* Project Details Grid */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                                Service
                              </span>
                              <p className="text-slate-800 font-medium mt-1">
                                <HighlightText
                                  text={project.service || "Not specified"}
                                  searchTerm={searchTerm}
                                />
                              </p>
                            </div>

                            <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                                Category
                              </span>
                              <p className="text-slate-800 font-medium mt-1">
                                <HighlightText
                                  text={project.category || "Uncategorized"}
                                  searchTerm={searchTerm}
                                />
                              </p>
                            </div>

                            <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                                Location
                              </span>
                              <p className="text-slate-800 font-medium mt-1">
                                <HighlightText
                                  text={project.location || "Not specified"}
                                  searchTerm={searchTerm}
                                />
                              </p>
                            </div>

                            <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                                Created
                              </span>
                              <p className="text-slate-800 font-medium mt-1">
                                <HighlightText
                                  text={
                                    formatDate(project.created_at) || "Unknown"
                                  }
                                  searchTerm={searchTerm}
                                />
                              </p>
                            </div>
                          </div>

                          {/* Description - Inset/Sunken Design */}
                          {project.description && (
                            <div className="relative">
                              <div
                                className="bg-gradient-to-br from-slate-100 to-slate-50
                            rounded-xl p-5 border-2 border-slate-200
                            shadow-inner relative overflow-hidden"
                              >
                                {/* Inner shadow effect */}
                                <div className="absolute inset-0 shadow-inner rounded-xl pointer-events-none" />

                                <div className="relative z-10">
                                  <div className="flex items-center gap-2 mb-3">
                                    <div className="w-1 h-4 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full" />
                                    <span className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
                                      Description
                                    </span>
                                  </div>
                                  <div className="text-slate-700 leading-relaxed font-medium">
                                    <HighlightText
                                      text={project.description}
                                      searchTerm={searchTerm}
                                    />
                                  </div>
                                </div>

                                {/* Subtle pattern overlay */}
                                <div
                                  className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_1px_1px,_rgba(0,0,0,0.15)_1px,_transparent_0)]
                              bg-[length:20px_20px] pointer-events-none"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl p-12 text-center">
                    <div className="flex w-full items-center justify-center">
                      <FaMagnifyingGlass className="text-6xl mb-4 text-center" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-600 mb-2">
                      {dataTable.length === 0
                        ? "No Projects Yet"
                        : "No Matching Projects"}
                    </h3>
                    <p className="text-slate-500">
                      {dataTable.length === 0
                        ? "Start by creating your first project above."
                        : "Try adjusting your search terms or clearing the search."}
                    </p>
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm("")}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg
                                          hover:bg-blue-600 transition-colors duration-200"
                      >
                        Clear Search
                      </button>
                    )}
                  </div>
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
        .from("email_submissions")
        .select("email, created_at")
        .order("created_at", { ascending: false });

      if (error) {
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
        .from("email_submissions")
        .delete()
        .eq("email", email);

      if (error) {
      } else {
        setEmails(emails.filter((item) => item.email !== email));
      }
    } catch (error) {
      throw new Error("Error deleting email: " + error);
    }
  };

  const [isDeleteAllModalOpen, setIsDeleteAllModalOpen] = useState(false);
  const openDeleteAllModal = () => setIsDeleteAllModalOpen(true);
  const closeDeleteAllModal = () => setIsDeleteAllModalOpen(false);

  const deleteAllEmails = async () => {
    try {
      const { error } = await supabase
        .from("email_submissions")
        .delete()
        .neq("email", 0);

      if (!error) {
        setEmails([]);
      }
    } catch (error) {
      if (error instanceof Error) {
        return;
      }
    } finally {
      closeDeleteAllModal();
    }
  };

  const exportEmailsToXLSX = () => {
    // Create workbook and worksheet
    const XLSX = require("xlsx");
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet([
      ["Email", "Created At"], // Header row
      ...emails.map((item) => [
        item.email,
        new Date(item.created_at).toLocaleDateString(),
      ]),
    ]);

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Emails");

    // Generate XLSX file
    const xlsxContent = XLSX.write(workbook, {
      type: "array",
      bookType: "xlsx",
    });

    // Convert array to Blob
    const blob = new Blob([xlsxContent], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // Create download link
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "emails.xlsx";
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
      <section className="w-full col-start-1 row-start-2 max-h-screen overflow-y-scroll">
        <Tooltip
          anchorSelect="#email-delete"
          place="top"
          content="Click to Remove"
        />
        <div className="w-full flex flex-col bg-gradient-to-br from-slate-50 to-white gap-y-8 rounded-2xl p-6 shadow-xl border border-slate-100">
          {/* Header Section */}
          <div className="flex justify-between items-end">
            <div className="flex flex-col space-y-2">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent leading-tight">
                List of Submitted Emails
              </h1>
              <p className="text-slate-600 text-lg font-medium">
                View the emails that have been submitted to us
              </p>
            </div>
            <div className="flex gap-x-4">
              <button
                onClick={() => emails.length > 0 && openDeleteAllModal()}
                className={`${
                  emails.length > 0
                    ? "border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 hover:shadow-md transition-all duration-200 hover:scale-105"
                    : "cursor-default border-slate-200 text-slate-600 bg-slate-50"
                }
    bg-white px-6 py-3 rounded-xl border-2 font-bold`}
                disabled={emails.length === 0}
              >
                Delete All
              </button>

              <button
                onClick={() => emails.length > 0 && exportEmailsToXLSX()}
                className={`${
                  emails.length > 0
                    ? "border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 hover:shadow-md transition-all duration-200 hover:scale-105"
                    : "cursor-default border-slate-200 text-slate-500 bg-slate-50"
                }
    bg-white px-6 py-3 rounded-xl border-2 font-bold`}
                disabled={emails.length === 0}
              >
                Export to XLSX
              </button>
            </div>
          </div>

          {/* Emails List */}
          <div className="w-full">
            {loading ? (
              <div className="flex justify-center items-center h-32">
                <ImSpinner9 className="animate-spin text-blue-600 text-4xl" />
                <span className="ml-4 text-slate-600 font-medium">
                  Loading...
                </span>
              </div>
            ) : (
              <ul className="space-y-4">
                {emails.length > 0 ? (
                  emails.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="flex items-center justify-between bg-white rounded-xl p-4 shadow-md
                        hover:shadow-lg border border-slate-100 hover:border-slate-200 transition-all duration-300
                        group overflow-hidden"
                    >
                      <a
                        href={`mailto:${item.email}`}
                        className="text-slate-800 font-medium group-hover:text-blue-600 transition-colors duration-200"
                      >
                        {item.email}
                      </a>
                      <div className="flex items-center gap-x-4">
                        <FaXmark
                          id="email-delete"
                          onClick={() => deleteEmail(item.email)}
                          className="text-red-500 text-xl cursor-pointer hover:text-red-600
                                              hover:scale-110 transition-all duration-200"
                        />
                        <span className="text-sm text-slate-500 min-w-20 text-right">
                          {new Date(item.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </motion.li>
                  ))
                ) : (
                  <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl p-12 text-center">
                    <div className="w-full flex justify-center items-center">
                      <FaEnvelopeOpen className="text-6xl mb-4" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-600 mb-2">
                      No Emails Submitted Yet
                    </h3>
                    <p className="text-slate-500">
                      Check back later or encourage submissions on your website.
                    </p>
                  </div>
                )}
              </ul>
            )}
          </div>
        </div>
      </section>
    </>
  );
};
