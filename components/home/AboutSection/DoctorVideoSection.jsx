"use client";

import { useEffect, useState } from "react";
import Modal from "react-modal";
import Image from "next/image";

const DoctorVideoSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    Modal.setAppElement("body");
  }, []);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const videoId = "prb1NXQhUMI";
  const youtubeEmbed = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

  return (
    <>
      {/* Thumbnail Block */}
      <div
        onClick={openModal}
        className="relative md:w-[700px] md:h-[600px] h-[300px] w-[300px]  rounded-2xl overflow-hidden shadow-lg cursor-pointer"
      >
        <Image
          src="https://img.youtube.com/vi/prb1NXQhUMI/hqdefault.jpg"
          alt="YouTube Video Thumbnail"
          fill
          className=" md:w-[700px] md:h-[600px] h-[300px] w-[300px] object-cover rounded-2xl"
        />

        <div className="absolute bottom-0 left-0 bg-[#3274eb] px-4 py-2 rounded-tr-2xl">
          <p className="text-white font-bold text-lg">Adarsh Jayasoorya</p>
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-[#04CE78] rounded-full p-4 shadow-md">
            <svg
              className="w-6 h-6 text-white"
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
  contentLabel="Doctor Video"
  overlayClassName="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 flex items-center justify-center px-4"
  className="relative w-full max-w-4xl aspect-video z-50"
>
  <div className="relative w-full h-full">
    <iframe
      src={youtubeEmbed}
      title="Doctor Video"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className="w-full h-full rounded-xl shadow-2xl"
    ></iframe>

    <button
      onClick={closeModal}
      className="absolute -top-10 right-0 text-white text-3xl sm:text-4xl font-bold hover:text-red-400 transition"
    >
      &times;
    </button>
  </div>
</Modal>

    </>
  );
};

export default DoctorVideoSection;
