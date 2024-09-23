import React, { useCallback, useState, useEffect } from 'react';
import Image from 'next/image';
import { IoChevronBack, IoChevronForward, IoClose } from 'react-icons/io5';

interface FullScreenImageViewerProps {
  images: string[];
  initialIndex: number;
  onClose: () => void;
}

const FullScreenImageViewer: React.FC<FullScreenImageViewerProps> = ({ images, initialIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }, [images.length]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'ArrowRight') {
      handleNext();
    } else if (event.key === 'ArrowLeft') {
      handlePrev();
    } else if (event.key === 'Escape') {
      onClose();
    }
  }, [handleNext, handlePrev, onClose]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-4xl"
        aria-label="Close fullscreen view"
      >
        <IoClose />
      </button>
      <button
        onClick={handlePrev}
        className="absolute left-4 text-white text-4xl"
        aria-label="Previous image"
      >
        <IoChevronBack />
      </button>
      <div className='relative max-h-screen max-w-screen w-full h-full'>
        <Image
          src={images[currentIndex]}
          alt={`Fullscreen image ${currentIndex + 1}`}
          width={1920}
          height={1920}
          quality={100}
          className="w-full h-full object-contain"
        />
      </div>
      <h1
        className='absolute bottom-4 left-4 text-white'
      >{currentIndex + 1} / {images.length}</h1>
      <button
        onClick={handleNext}
        className="absolute right-4 text-white text-4xl"
        aria-label="Next image"
      >
        <IoChevronForward />
      </button>
    </div>
  );
};

export default FullScreenImageViewer;
