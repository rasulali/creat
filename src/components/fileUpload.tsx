import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IconUpload } from "@tabler/icons-react";
import { useDropzone } from "react-dropzone";
import { FaPen, FaTrash, FaStar, FaRegStar } from "react-icons/fa6";
import { handleImageName } from "@/lib/helperFunctions";

const mainVariant = {
  initial: {
    scale: 1,
    opacity: 1,
  },
  hover: {
    scale: 1.02,
    opacity: 0.95,
  },
  drag: {
    scale: 1.05,
    opacity: 0.9,
  },
};

const uploadIconVariant = {
  initial: {
    scale: 1,
  },
  hover: {
    scale: 1.1,
  },
  drag: {
    scale: 1.2,
    rotate: [0, -10, 10, -10, 0],
  },
};

// Define accepted file types
const ACCEPTED_FILE_TYPES = {
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/webp": [".webp"],
  "image/avif": [".avif"],
  "image/gif": [".gif"],
  "image/svg+xml": [".svg"],
};

export const FileUpload = ({
  onChange,
  inputRef: externalInputRef,
  files: externalFiles,
  setImageIndex: externalSetImageIndex,
  setRenameState: externalSetRenameState,
  onDelete,
  bannerImage,
  onSetBanner,
  required = true,
}: {
  onChange?: (files: File[]) => void;
  required?: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
  files?: File[];
  setImageIndex: (index: number) => void;
  setRenameState: (state: boolean) => void;
  onDelete?: (indexToDelete: number, imageUrlToDelete: string) => void;
  bannerImage: string | null;
  onSetBanner: (imageName: string) => void;
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (externalFiles) {
      setFiles(externalFiles);

      const dataTransfer = new DataTransfer();
      externalFiles.forEach((file) => dataTransfer.items.add(file));

      if (externalInputRef.current) {
        externalInputRef.current.files = dataTransfer.files;
      }

      // Set first image as banner if none is set
      if (!bannerImage && externalFiles.length > 0) {
        onSetBanner(externalFiles[0].name);
      }
    }
  }, [externalFiles, externalInputRef, bannerImage, onSetBanner]);

  const validateFileType = (file: File): boolean => {
    return Object.keys(ACCEPTED_FILE_TYPES).includes(file.type);
  };

  const handleFileChange = (newFiles: File[]) => {
    // Filter out invalid file types
    const validFiles = newFiles.filter((file) => validateFileType(file));

    if (validFiles.length !== newFiles.length) {
      setErrorMessage(
        "Some files were rejected. Only JPG, PNG, WebP, AVIF, GIF, and SVG files are accepted.",
      );
      setTimeout(() => setErrorMessage(null), 5000); // Clear error after 5 seconds
    }

    if (validFiles.length === 0) return;

    const updatedFiles = [...files, ...validFiles];
    setFiles(updatedFiles);

    const dataTransfer = new DataTransfer();
    updatedFiles.forEach((file) => dataTransfer.items.add(file));
    if (externalInputRef.current) {
      externalInputRef.current.files = dataTransfer.files;
    }

    // Set first image as banner if none is set
    if (!bannerImage && updatedFiles.length > 0) {
      onSetBanner(updatedFiles[0].name);
    }

    onChange && onChange(updatedFiles);
  };

  const handleUploadClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    externalInputRef.current?.click();
  };

  const handleDelete = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const fileToDelete = files[index];
    const updatedFiles = files.filter((_, idx) => idx !== index);

    const dataTransfer = new DataTransfer();
    updatedFiles.forEach((file) => dataTransfer.items.add(file));
    if (externalInputRef.current) {
      externalInputRef.current.files = dataTransfer.files;
    }

    // If deleting the banner image, set a new banner (first image)
    if (bannerImage === fileToDelete.name) {
      onSetBanner(updatedFiles.length > 0 ? updatedFiles[0].name : "");
    }

    onDelete?.(index, URL.createObjectURL(fileToDelete));
    setFiles(updatedFiles);
  };

  const handleRename = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    externalSetImageIndex(index);
    externalSetRenameState(true);
  };

  const handleSetBanner = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    onSetBanner(files[index].name);
  };

  const { getRootProps } = useDropzone({
    multiple: true,
    noClick: true,
    accept: ACCEPTED_FILE_TYPES,
    onDrop: handleFileChange,
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
    onDropAccepted: () => setIsDragging(false),
    onDropRejected: (fileRejections) => {
      setIsDragging(false);
      setErrorMessage(
        "Some files were rejected. Only JPG, PNG, WebP, AVIF, GIF, and SVG files are accepted.",
      );
      setTimeout(() => setErrorMessage(null), 5000); // Clear error after 5 seconds
      return fileRejections;
    },
  });

  return (
    <div className="w-full" {...getRootProps()}>
      <motion.div
        initial="initial"
        whileHover="hover"
        animate={isDragging ? "drag" : "initial"}
        className={cn(
          "p-10 group/file block rounded-lg w-full relative overflow-hidden",
          "transition-colors duration-300",
          isDragging && "bg-creatBright/10",
          !files.length && "cursor-pointer",
        )}
      >
        <input
          ref={externalInputRef}
          multiple
          required={required}
          id="file-upload-handle"
          type="file"
          accept=".jpg,.jpeg,.png,.webp,.avif,.gif,.svg,image/jpeg,image/png,image/webp,image/avif,image/gif,image/svg+xml"
          onChange={(e) => {
            const newFiles = Array.from(e.target.files || []);
            handleFileChange(newFiles);
          }}
          className="hidden"
        />
        <div className="flex flex-col items-center justify-center">
          <p className="relative z-20 font-sans font-bold text-neutral-700 text-base">
            Upload file
          </p>
          <p className="relative z-20 font-sans font-normal text-neutral-400 text-base mt-2">
            Drag or drop your files here or click to upload
          </p>
          {errorMessage && (
            <div className="mt-2 px-4 py-2 bg-red-50 text-red-600 rounded-md text-sm">
              {errorMessage}
            </div>
          )}
          <div className="relative w-full mt-10 max-w-xl mx-auto">
            {files.length > 0 && (
              <>
                <div className="absolute -top-6 -right-6 z-50">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-sm font-medium bg-white shadow-sm text-neutral-700 border border-neutral-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    {files.length} {files.length === 1 ? "file" : "files"}
                  </span>
                </div>
                <div
                  className="max-h-64 overflow-y-auto pr-2 space-y-4
                 scrollbar-thin
                 scrollbar-track-transparent
                 scrollbar-thumb-neutral-200/50
                 hover:scrollbar-thumb-neutral-300/75
                 scrollbar-thumb-rounded-full"
                >
                  {files.map((file, idx) => (
                    <motion.div
                      key={"file" + idx}
                      layoutId={
                        idx === 0 ? "file-upload" : "file-upload-" + idx
                      }
                      onClick={(e) => e.stopPropagation()}
                      className={cn(
                        "relative overflow-hidden z-40 bg-white flex gap-x-4 md:h-24 p-4 mt-4 w-full mx-auto rounded-md",
                        "shadow-sm hover:shadow-md transition-shadow duration-300",
                        bannerImage === file.name && "ring-2 ring-blue-500",
                      )}
                    >
                      <div className="h-full aspect-[4/3] relative">
                        <img
                          className="object-cover w-full h-full"
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                        />
                        {bannerImage === file.name && (
                          <div className="absolute top-1 left-1 bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded">
                            Banner
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col items-start justify-start w-full">
                        <div className="flex justify-between w-full items-center gap-4">
                          <div className="flex gap-x-2 items-center">
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              layout
                              className="text-base text-neutral-700 truncate max-w-xs"
                            >
                              {handleImageName(file.name)}
                            </motion.p>
                            <button
                              type="button"
                              onClick={(e) => handleRename(idx, e)}
                              className="appearance-none w-fit h-fit z-50 p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                              <FaPen className="text-sm text-black/50" />
                            </button>
                            <button
                              type="button"
                              onClick={(e) => handleDelete(idx, e)}
                              className="appearance-none w-fit h-fit z-50 p-2 hover:bg-red-50 rounded-full transition-colors"
                            >
                              <FaTrash className="text-sm text-red-500/50" />
                            </button>
                            <button
                              type="button"
                              onClick={(e) => handleSetBanner(idx, e)}
                              className="appearance-none w-fit h-fit z-50 p-2 hover:bg-blue-50 rounded-full transition-colors"
                              title={
                                bannerImage === file.name
                                  ? "Current banner"
                                  : "Set as banner"
                              }
                            >
                              {bannerImage === file.name ? (
                                <FaStar className="text-sm text-blue-500" />
                              ) : (
                                <FaRegStar className="text-sm text-blue-500/50" />
                              )}
                            </button>
                          </div>
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            layout
                            className="rounded-lg px-2 py-1 w-fit flex-shrink-0 text-sm text-neutral-600 shadow-input"
                          >
                            {(file.size / (1024 * 1024)).toFixed(2)} MB
                          </motion.p>
                        </div>

                        <div className="flex text-sm md:flex-row flex-col items-start md:items-center w-full mt-2 justify-between text-neutral-600">
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            layout
                            className="px-1 py-0.5 rounded-md bg-gray-100"
                          >
                            {file.type}
                          </motion.p>

                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            layout
                          >
                            modified{" "}
                            {new Date(file.lastModified).toLocaleDateString()}
                          </motion.p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            )}
            {!files.length ? (
              <motion.div
                layoutId="file-upload"
                variants={mainVariant}
                onClick={handleUploadClick}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className={cn(
                  "relative z-40 bg-white flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md",
                  "shadow-[0px_10px_50px_rgba(0,0,0,0.1)]",
                  isDragging && "ring-2 ring-creatBright ring-opacity-50",
                )}
              >
                <motion.div variants={uploadIconVariant}>
                  <IconUpload
                    className={cn(
                      "h-8 w-8",
                      isDragging ? "text-creatBright" : "text-neutral-400",
                    )}
                  />
                </motion.div>
              </motion.div>
            ) : (
              <button
                type="button"
                onClick={handleUploadClick}
                className="mt-4 p-2 w-full border border-dashed border-neutral-300 rounded-md text-neutral-500 hover:text-neutral-700 transition-colors"
              >
                Add more files
              </button>
            )}

            {!files.length && isDragging && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute border-2 border-dashed border-creatBright inset-0 z-30 bg-transparent flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md"
              />
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
