"use client";

import { useEffect, useState } from "react";
import Modal from "react-modal";
import Image from "next/image";

const VideoModal = ({
  videoId = "prb1NXQhUMI",
  thumbnailUrl = "https://img.youtube.com/vi/prb1NXQhUMI/hqdefault.jpg",
  title = "Adarsh Jayasoorya",

  // Class overrides
  containerClass = "relative 2xl:w-[700px] 2xl:h-[600px] md:h-[550px] md:w-[550px] sm:h-[400px] sm:w-[400px] h-[250px] w-[250px] rounded-2xl overflow-hidden shadow-lg cursor-pointer",
  imageClass = "object-cover rounded-2xl",
  nameBadgeClass = "absolute bottom-0 left-0 bg-[#3274eb] px-4 py-2 rounded-tr-2xl",
  nameTextClass = "text-white font-bold text-lg",
  playButtonWrapperClass = "absolute inset-0 flex items-center justify-center",
  playButtonClass = "bg-[#04CE78] rounded-full p-4 shadow-md",
  playIconClass = "w-6 h-6 text-white",

  modalOverlayClass = "fixed inset-0 bg-black/70 backdrop-blur-sm z-40 flex items-center justify-center px-4",
  modalContentClass = "relative w-full max-w-4xl aspect-video z-50",
  iframeClass = "w-full h-full rounded-xl shadow-2xl",
  closeButtonClass = "absolute -top-10 right-0 text-white text-3xl sm:text-4xl font-bold hover:text-red-400 transition",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    Modal.setAppElement("body");
  }, []);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const youtubeEmbed = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

  return (
    <>
      {/* Thumbnail Block */}
      <div onClick={openModal} className={containerClass}>
        <Image
          src={thumbnailUrl}
          alt={title}
          fill
          className={imageClass}
        />

        <div className={nameBadgeClass}>
          <p className={nameTextClass}>{title}</p>
        </div>

        <div className={playButtonWrapperClass}>
          <div className={playButtonClass}>
            <svg
              className={playIconClass}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M6 4l10 6-10 6V4z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Video Modal"
        overlayClassName={modalOverlayClass}
        className={modalContentClass}
      >
        <div className="relative w-full h-full">
          <iframe
            src={youtubeEmbed}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className={iframeClass}
          ></iframe>

          <button onClick={closeModal} className={`${closeButtonClass} cursor-pointer`}>
            &times;
          </button>
        </div>
      </Modal>
    </>
  );
};

export default VideoModal;
