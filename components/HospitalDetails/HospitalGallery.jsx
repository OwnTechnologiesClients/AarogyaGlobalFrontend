"use client";
import React, { useState } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Download,
  Share2
} from 'lucide-react';

const HospitalGallery = ({ hospital }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState({});
  const [imageLoading, setImageLoading] = useState({});

  const categories = ["All", "Exterior", "Patient Rooms", "Operating Rooms", "Equipment", "Facilities", "Staff"];

  // Create placeholder images with beautiful gradients and icons
  const createPlaceholderImage = (id, title, category, description, colors) => ({
    id,
    url: null, // Will trigger placeholder
    thumbnail: null, // Will trigger placeholder
    title,
    category,
    description,
    colors // For gradient backgrounds
  });

  const galleryImages = [
    // Operating Rooms
    createPlaceholderImage(1, "Modern Operating Room", "Operating Rooms",
      "State-of-the-art surgical suite with advanced equipment and sterile environment",
      ["from-blue-400", "to-blue-600"]),
    createPlaceholderImage(2, "Surgical Suite", "Operating Rooms",
      "Advanced surgical theater with robotic assistance capabilities",
      ["from-green-400", "to-green-600"]),

    // Patient Rooms
    createPlaceholderImage(3, "Private Patient Room", "Patient Rooms",
      "Comfortable private patient room with modern amenities and family seating",
      ["from-purple-400", "to-purple-600"]),
    createPlaceholderImage(4, "ICU Unit", "Patient Rooms",
      "Intensive Care Unit with advanced monitoring and life support equipment",
      ["from-red-400", "to-red-600"]),

    // Equipment
    createPlaceholderImage(5, "MRI Scanner", "Equipment",
      "Advanced 3 Tesla MRI machine for detailed diagnostic imaging",
      ["from-indigo-400", "to-indigo-600"]),
    createPlaceholderImage(6, "CT Scanner", "Equipment",
      "128-slice CT scanner for rapid and accurate diagnosis",
      ["from-cyan-400", "to-cyan-600"]),
    createPlaceholderImage(7, "X-Ray Equipment", "Equipment",
      "Digital X-ray system with immediate image processing",
      ["from-teal-400", "to-teal-600"]),

    // Hospital Exterior
    createPlaceholderImage(8, "Hospital Exterior", "Exterior",
      "Modern hospital building with contemporary architecture and landscaping",
      ["from-orange-400", "to-orange-600"]),
    createPlaceholderImage(9, "Hospital Campus", "Exterior",
      "Expansive medical campus with multiple specialized buildings",
      ["from-yellow-400", "to-yellow-600"]),

    // Facilities
    createPlaceholderImage(10, "Hospital Lobby", "Facilities",
      "Welcoming reception area with modern design and comfortable seating",
      ["from-pink-400", "to-pink-600"]),
    createPlaceholderImage(11, "Hospital Corridor", "Facilities",
      "Clean, well-lit corridors with easy navigation and accessibility",
      ["from-rose-400", "to-rose-600"]),
    createPlaceholderImage(12, "Cafeteria", "Facilities",
      "Modern cafeteria serving healthy meals for patients and visitors",
      ["from-emerald-400", "to-emerald-600"]),

    // Medical Staff
    createPlaceholderImage(13, "Medical Team", "Staff",
      "Our dedicated team of medical professionals and specialists",
      ["from-violet-400", "to-violet-600"]),
    createPlaceholderImage(14, "Surgeon Team", "Staff",
      "Experienced surgical team preparing for complex procedures",
      ["from-sky-400", "to-sky-600"]),
    createPlaceholderImage(15, "Nursing Staff", "Staff",
      "Compassionate nursing staff providing excellent patient care",
      ["from-lime-400", "to-lime-600"])
  ];

  const filteredImages = selectedCategory === "All"
    ? galleryImages
    : galleryImages.filter(image => image.category === selectedCategory);

  const openLightbox = (image, index) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (currentImageIndex + 1) % filteredImages.length;
    setCurrentImageIndex(nextIndex);
    setSelectedImage(filteredImages[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = currentImageIndex === 0 ? filteredImages.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(prevIndex);
    setSelectedImage(filteredImages[prevIndex]);
  };

  const handleImageError = (imageId) => {
    setImageErrors(prev => ({ ...prev, [imageId]: true }));
  };

  const handleImageLoad = (imageId) => {
    setImageLoading(prev => ({ ...prev, [imageId]: false }));
  };

  const handleImageLoadStart = (imageId) => {
    setImageLoading(prev => ({ ...prev, [imageId]: true }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          {hospital?.name ? `${hospital.name} Gallery` : 'Hospital Gallery'}
        </h2>
        <p className="text-gray-600 text-lg">
          Take a virtual tour of our modern facilities and advanced medical equipment.
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 ${selectedCategory === category
                ? 'bg-[#04CE78] text-white shadow-md'
                : 'bg-white text-gray-600 hover:text-gray-800 hover:bg-gray-50 border border-gray-200'
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredImages.map((image, index) => (
          <div
            key={image.id}
            className="group relative bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300"
            onClick={() => openLightbox(image, index)}
          >
            <div className="relative h-64 overflow-hidden">
              <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${image.colors[0]} ${image.colors[1]} group-hover:scale-110 transition-transform duration-300`}>
                <div className="text-center text-white">
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <ZoomIn className="w-8 h-8 text-white" />
                  </div>
                  <p className="font-bold text-sm mb-1">{image.title}</p>
                  <p className="text-xs opacity-90">Medical Facility</p>
                </div>
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Category Badge */}
              <div className="absolute top-4 left-4 bg-[#04CE78] text-white px-3 py-1 rounded-full text-sm font-medium">
                {image.category}
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-bold text-gray-800 mb-1">{image.title}</h3>
              <p className="text-gray-600 text-sm">{image.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image */}
            <div className={`w-full max-w-4xl h-96 flex items-center justify-center bg-gradient-to-br ${selectedImage.colors[0]} ${selectedImage.colors[1]} rounded-lg`}>
              <div className="text-center text-white">
                <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ZoomIn className="w-16 h-16 text-white" />
                </div>
                <p className="font-bold text-3xl mb-2">{selectedImage.title}</p>
                <p className="text-xl opacity-90">Medical Facility</p>
              </div>
            </div>

            {/* Image Info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 text-white">
              <h3 className="text-xl font-bold mb-1">{selectedImage.title}</h3>
              <p className="text-gray-300 mb-3">{selectedImage.description}</p>

              <div className="flex items-center gap-4">
                <span className="bg-[#04CE78] px-3 py-1 rounded-full text-sm font-medium">
                  {selectedImage.category}
                </span>
                <span className="text-sm text-gray-300">
                  {currentImageIndex + 1} of {filteredImages.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* No Results */}
      {filteredImages.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <ZoomIn className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-medium text-gray-600 mb-2">No images found</h3>
          <p className="text-gray-500">Try selecting a different category.</p>
        </div>
      )}

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white text-center">
        <h3 className="text-2xl font-bold mb-2">Want to Visit Our Facilities?</h3>
        <p className="text-blue-100 mb-6">Schedule a tour to see our state-of-the-art facilities in person.</p>
        <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
          Schedule a Tour
        </button>
      </div>
    </div>
  );
};

export default HospitalGallery;
