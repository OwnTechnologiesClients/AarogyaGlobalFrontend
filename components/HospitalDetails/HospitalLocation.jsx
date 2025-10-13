"use client";
import React from "react";
import {
  MapPin,
  Clock,
  Navigation,
  Copy,
  ExternalLink,
} from "lucide-react";

const HospitalLocation = ({ hospital }) => {
  const hospitalInfo = {
    name: hospital?.name || "Hospital",
    address: hospital?.contact?.address || hospital?.address || "Address not available",
    coordinates: hospital?.coordinates || {
      lat: 28.4595,
      lng: 77.0266,
    },
  };



  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const openGoogleMaps = () => {
    const url = hospital?.mapLink || `https://www.google.com/maps?q=${hospitalInfo.coordinates.lat},${hospitalInfo.coordinates.lng}`;
    window.open(url, "_blank");
  };

  const openDirections = () => {
    const url = hospital?.mapLink || `https://www.google.com/maps/dir//${hospitalInfo.coordinates.lat},${hospitalInfo.coordinates.lng}`;
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
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.2233913121413!2d${hospitalInfo.coordinates.lng}!3d${hospitalInfo.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19f5828c3b8f%3A0x1b9a6b9b9b9b9b9b!2s${encodeURIComponent(hospitalInfo.name)}!5e0!3m2!1sen!2sin!4v1234567890`}
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

        {/* Operating Hours */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Operating Hours
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#04CE78] mt-0.5" />
                <div>
                  <p className="font-medium text-gray-800">Emergency Support</p>
                  <p className="text-gray-600 text-sm">{hospital?.emergencySupport || "24/7 365 days Emergency Support"}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#04CE78] mt-0.5" />
                <div>
                  <p className="font-medium text-gray-800">OPD Hours</p>
                  <p className="text-gray-600 text-sm">{hospital?.opdHours || "9 am to 8 pm (Monday - Saturday)"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



      {/* Nearby Landmarks */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">
          Location & Accessibility
        </h3>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#04CE78] mt-0.5" />
              <div>
                <p className="font-medium text-gray-800">How to Reach</p>
                <p className="text-gray-600 text-sm">{hospital?.howToReach || "Information not available"}</p>
              </div>
            </div>
            {(hospital?.nearbyLandmarks || []).length > 0 && (
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#04CE78] mt-0.5" />
                <div>
                  <p className="font-medium text-gray-800">Nearby Landmarks</p>
                  <div className="text-gray-600 text-sm space-y-1">
                    {hospital.nearbyLandmarks.map((l, idx) => (
                      <div key={idx}>{l?.type}{l?.direction ? ` – ${l.direction}` : ''}</div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {hospital?.mapLink && (
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#04CE78] mt-0.5" />
                <div>
                  <p className="font-medium text-gray-800">View on Map</p>
                  <button
                    onClick={openGoogleMaps}
                    className="text-[#04CE78] text-sm hover:underline flex items-center gap-1 mt-1"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Open in Google Maps
                  </button>
                </div>
              </div>
            )}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
