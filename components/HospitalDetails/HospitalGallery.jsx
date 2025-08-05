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

  const categories = ["All", "Exterior", "Patient Rooms", "Operating Rooms", "Equipment", "Facilities", "Staff"];

  const galleryImages = [
    // Operating Rooms
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&h=600&fit=crop&q=80",
      thumbnail: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=300&h=200&fit=crop&q=80",
      title: "Modern Operating Room",
      category: "Operating Rooms",
      description: "State-of-the-art surgical suite with advanced equipment and sterile environment"
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&h=600&fit=crop&q=80",
      thumbnail: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=200&fit=crop&q=80",
      title: "Surgical Suite",
      category: "Operating Rooms",
      description: "Advanced surgical theater with robotic assistance capabilities"
    },

    // Patient Rooms
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&q=80",
      thumbnail: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop&q=80",
      title: "Private Patient Room",
      category: "Patient Rooms",
      description: "Comfortable private patient room with modern amenities and family seating"
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&h=600&fit=crop&q=80",
      thumbnail: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=300&h=200&fit=crop&q=80",
      title: "ICU Unit",
      category: "Patient Rooms",
      description: "Intensive Care Unit with advanced monitoring and life support equipment"
    },

    // Equipment
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop&q=80",
      thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=300&h=200&fit=crop&q=80",
      title: "MRI Scanner",
      category: "Equipment",
      description: "Advanced 3 Tesla MRI machine for detailed diagnostic imaging"
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&h=600&fit=crop&q=80",
      thumbnail: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=300&h=200&fit=crop&q=80",
      title: "CT Scanner",
      category: "Equipment",
      description: "128-slice CT scanner for rapid and accurate diagnosis"
    },
    {
      id: 7,
      url: "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=800&h=600&fit=crop&q=80",
      thumbnail: "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=300&h=200&fit=crop&q=80",
      title: "X-Ray Equipment",
      category: "Equipment",
      description: "Digital X-ray system with immediate image processing"
    },

    // Hospital Exterior
    {
      id: 8,
      url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop&q=80",
      thumbnail: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=300&h=200&fit=crop&q=80",
      title: "Hospital Exterior",
      category: "Exterior",
      description: "Modern hospital building with contemporary architecture and landscaping"
    },
    {
      id: 9,
      url: "https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?w=800&h=600&fit=crop&q=80",
      thumbnail: "https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?w=300&h=200&fit=crop&q=80",
      title: "Hospital Campus",
      category: "Exterior",
      description: "Expansive medical campus with multiple specialized buildings"
    },

    // Facilities
    {
      id: 10,
      url: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&q=80",
      thumbnail: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=300&h=200&fit=crop&q=80",
      title: "Hospital Lobby",
      category: "Facilities",
      description: "Welcoming reception area with modern design and comfortable seating"
    },
    {
      id: 11,
      url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&q=80",
      thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop&q=80",
      title: "Hospital Corridor",
      category: "Facilities",
      description: "Clean, well-lit corridors with easy navigation and accessibility"
    },
    {
      id: 12,
      url: "https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=800&h=600&fit=crop&q=80",
      thumbnail: "https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=300&h=200&fit=crop&q=80",
      title: "Cafeteria",
      category: "Facilities",
      description: "Modern cafeteria serving healthy meals for patients and visitors"
    },

    // Medical Staff
    {
      id: 13,
      url: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&h=600&fit=crop&q=80",
      thumbnail: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=200&fit=crop&q=80",
      title: "Medical Team",
      category: "Staff",
      description: "Our dedicated team of medical professionals and specialists"
    },
    {
      id: 14,
      url: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&h=600&fit=crop&q=80",
      thumbnail: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=200&fit=crop&q=80",
      title: "Surgeon Team",
      category: "Staff",
      description: "Experienced surgical team preparing for complex procedures"
    },
    {
      id: 15,
      url: "https://images.unsplash.com/photo-1594824475545-9d0c7c495946?w=800&h=600&fit=crop&q=80",
      thumbnail: "https://images.unsplash.com/photo-1594824475545-9d0c7c495946?w=300&h=200&fit=crop&q=80",
      title: "Nursing Staff",
      category: "Staff",
      description: "Compassionate nursing staff providing excellent patient care"
    }
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
              <img
                src={image.thumbnail}
                alt={image.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />

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
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              className="max-w-full max-h-full object-contain rounded-lg"
            />

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
