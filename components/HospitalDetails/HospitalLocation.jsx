"use client";
import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Car,
  Bus,
  Train,
  Plane,
  Navigation,
  Copy,
  ExternalLink,
} from "lucide-react";

const HospitalLocation = () => {
  const hospitalInfo = {
    name: "Granite Medical Center",
    address: "123 Medical Center Drive, Delhi, India 110001",
    phone: "+91 11 2345 6789",
    email: "info@granitemedical.com",
    emergency: "+91 11 2345 6790",
    coordinates: {
      lat: 28.6139,
      lng: 77.209,
    },
  };

  const operatingHours = [
    {
      day: "Monday - Friday",
      hours: "24/7 Emergency, 8:00 AM - 8:00 PM General",
    },
    { day: "Saturday", hours: "24/7 Emergency, 9:00 AM - 6:00 PM General" },
    { day: "Sunday", hours: "24/7 Emergency, 10:00 AM - 4:00 PM General" },
  ];

  const transportOptions = [
    {
      icon: <Car className="w-6 h-6 text-blue-500" />,
      title: "By Car",
      description: "Free parking available with 500+ spaces",
      details: "Main entrance parking, Valet service available",
    },
    {
      icon: <Bus className="w-6 h-6 text-green-500" />,
      title: "By Bus",
      description: "Multiple bus routes stop nearby",
      details: "Bus stops: Medical Center (50m), Central Station (200m)",
    },
    {
      icon: <Train className="w-6 h-6 text-purple-500" />,
      title: "By Metro",
      description: "Central Metro Station - 5 minutes walk",
      details: "Blue Line, Red Line connections available",
    },
    {
      icon: <Plane className="w-6 h-6 text-orange-500" />,
      title: "By Air",
      description: "Delhi Airport - 45 minutes drive",
      details: "Airport shuttle service available on request",
    },
  ];

  const nearbyLandmarks = [
    { name: "Central Park", distance: "0.5 km", type: "Park" },
    { name: "City Mall", distance: "1.2 km", type: "Shopping" },
    { name: "Delhi University", distance: "2.1 km", type: "Education" },
    { name: "Government Hospital", distance: "3.0 km", type: "Medical" },
    { name: "International Airport", distance: "25 km", type: "Transport" },
  ];

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const openGoogleMaps = () => {
    const { lat, lng } = hospitalInfo.coordinates;
    const url = `https://www.google.com/maps?q=${lat},${lng}`;
    window.open(url, "_blank");
  };

  const openDirections = () => {
    const { lat, lng } = hospitalInfo.coordinates;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, "_blank");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Location & Contact
        </h2>
        <p className="text-gray-600 text-lg">
          Find us easily with detailed location information and multiple
          transportation options.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Map Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="relative w-full h-80">
            {/* Interactive Map */}
            <iframe
              title="Hospital Location Map"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${
                hospitalInfo.coordinates.lng - 0.01
              }%2C${hospitalInfo.coordinates.lat - 0.01}%2C${
                hospitalInfo.coordinates.lng + 0.01
              }%2C${hospitalInfo.coordinates.lat + 0.01}&layer=mapnik&marker=${
                hospitalInfo.coordinates.lat
              }%2C${hospitalInfo.coordinates.lng}`}
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
            />

            {/* Map Controls */}
            <div className="absolute top-4 right-4 space-y-2">
              <button
                onClick={openDirections}
                className="bg-white shadow-md rounded-lg p-2 hover:bg-gray-50 transition-colors"
                title="Get Directions"
              >
                <Navigation className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={openGoogleMaps}
                className="bg-white shadow-md rounded-lg p-2 hover:bg-gray-50 transition-colors"
                title="Open in Google Maps"
              >
                <ExternalLink className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Map Overlay Info */}
            <div className="absolute top-4 left-4 z-10">
              <div className="bg-white rounded-md shadow-lg p-4 w-fit max-w-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-800">
                    {hospitalInfo.name}
                  </span>
                  <MapPin className="w-5 h-5 text-[#04CE78]" />
                </div>
                <div className="text-xs text-gray-600 leading-snug mb-2">
                  {hospitalInfo.address}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={openDirections}
                    className="text-xs text-blue-500 underline cursor-pointer hover:text-blue-700"
                  >
                    Directions
                  </button>
                  <button
                    onClick={openGoogleMaps}
                    className="text-xs text-blue-500 underline cursor-pointer hover:text-blue-700"
                  >
                    View larger map
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <h3 className="font-bold text-gray-800 mb-2">
              {hospitalInfo.name}
            </h3>
            <div className="flex items-start gap-2 text-gray-600">
              <MapPin className="w-5 h-5 mt-0.5 text-[#04CE78]" />
              <div>
                <p>{hospitalInfo.address}</p>
                <button
                  onClick={() => copyToClipboard(hospitalInfo.address)}
                  className="text-[#04CE78] text-sm hover:underline flex items-center gap-1 mt-1"
                >
                  <Copy className="w-3 h-3" />
                  Copy Address
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-6">
          {/* Contact Details */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Contact Information
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#04CE78]" />
                <div>
                  <p className="font-medium text-gray-800">General Inquiries</p>
                  <p className="text-gray-600">{hospitalInfo.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-red-500" />
                <div>
                  <p className="font-medium text-gray-800">Emergency</p>
                  <p className="text-gray-600">{hospitalInfo.emergency}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#04CE78]" />
                <div>
                  <p className="font-medium text-gray-800">Email</p>
                  <p className="text-gray-600">{hospitalInfo.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Operating Hours */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Operating Hours
            </h3>
            <div className="space-y-3">
              {operatingHours.map((schedule, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#04CE78] mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-800">{schedule.day}</p>
                    <p className="text-gray-600 text-sm">{schedule.hours}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Transportation Options */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">
          How to Reach Us
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {transportOptions.map((option, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                {option.icon}
                <h4 className="font-bold text-gray-800">{option.title}</h4>
              </div>
              <p className="text-gray-600 text-sm mb-2">{option.description}</p>
              <p className="text-gray-500 text-xs">{option.details}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Nearby Landmarks */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">
          Nearby Landmarks
        </h3>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {nearbyLandmarks.map((landmark, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-800">{landmark.name}</p>
                  <p className="text-gray-500 text-sm">{landmark.type}</p>
                </div>
                <span className="text-[#04CE78] font-medium text-sm">
                  {landmark.distance}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Emergency Information */}
      <div className="mt-12 bg-gradient-to-r from-red-600 to-red-800 rounded-2xl p-8 text-white">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2">Emergency Services</h3>
          <p className="text-red-100 mb-6">
            Our emergency department is open 24/7 for urgent medical care
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <Phone className="w-8 h-8 mx-auto mb-2" />
              <p className="font-bold text-lg">{hospitalInfo.emergency}</p>
              <p className="text-red-100 text-sm">Emergency Hotline</p>
            </div>

            <div className="text-center">
              <Clock className="w-8 h-8 mx-auto mb-2" />
              <p className="font-bold text-lg">24/7</p>
              <p className="text-red-100 text-sm">Always Available</p>
            </div>

            <div className="text-center">
              <MapPin className="w-8 h-8 mx-auto mb-2" />
              <p className="font-bold text-lg">Main Entrance</p>
              <p className="text-red-100 text-sm">Emergency Access</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalLocation;
