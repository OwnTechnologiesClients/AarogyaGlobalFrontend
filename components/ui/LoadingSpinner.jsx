"use client";

import React from "react";
import { Heart, Activity, Loader2 } from "lucide-react";

const LoadingSpinner = ({ 
  size = "medium", 
  message = "Loading...", 
  type = "medical",
  fullScreen = false 
}) => {
  const sizeClasses = {
    small: "w-6 h-6",
    medium: "w-12 h-12",
    large: "w-20 h-20"
  };

  const containerClasses = fullScreen 
    ? "fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center"
    : "flex items-center justify-center p-8";

  const renderMedicalLoader = () => (
    <div className="text-center">
      {/* Medical Cross Loader */}
      <div className="mb-4 flex justify-center">
        <div className={`relative ${sizeClasses[size]}`}>
          <div className="absolute inset-0 bg-[#04CE78] rounded-full animate-ping opacity-75"></div>
          <div className={`relative ${sizeClasses[size]} bg-[#04CE78] rounded-full flex items-center justify-center animate-pulse`}>
            <div className={`${size === 'small' ? 'w-3 h-3' : size === 'medium' ? 'w-5 h-5' : 'w-8 h-8'}`}>
              <div className="w-full h-0.5 bg-white rounded-full"></div>
              <div className="w-0.5 h-full bg-white rounded-full absolute top-0 left-1/2 transform -translate-x-1/2"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Heartbeat Line */}
      <div className="mb-4 flex justify-center">
        <div className={`${size === 'small' ? 'w-32' : size === 'medium' ? 'w-48' : 'w-64'} h-0.5 bg-gray-200 rounded-full overflow-hidden`}>
          <div className="h-full bg-gradient-to-r from-[#04CE78] to-[#000D44] rounded-full animate-heartbeat"></div>
        </div>
      </div>

      {message && (
        <p className={`text-gray-600 ${size === 'small' ? 'text-sm' : size === 'medium' ? 'text-base' : 'text-lg'}`}>
          {message}
        </p>
      )}
    </div>
  );

  const renderHeartLoader = () => (
    <div className="text-center">
      <div className="mb-4 flex justify-center">
        <Heart className={`${sizeClasses[size]} text-red-500 animate-pulse`} />
      </div>
      {message && (
        <p className={`text-gray-600 ${size === 'small' ? 'text-sm' : size === 'medium' ? 'text-base' : 'text-lg'}`}>
          {message}
        </p>
      )}
    </div>
  );

  const renderActivityLoader = () => (
    <div className="text-center">
      <div className="mb-4 flex justify-center">
        <Activity className={`${sizeClasses[size]} text-blue-500 animate-pulse`} />
      </div>
      {message && (
        <p className={`text-gray-600 ${size === 'small' ? 'text-sm' : size === 'medium' ? 'text-base' : 'text-lg'}`}>
          {message}
        </p>
      )}
    </div>
  );

  const renderSpinnerLoader = () => (
    <div className="text-center">
      <div className="mb-4 flex justify-center">
        <Loader2 className={`${sizeClasses[size]} text-[#04CE78] animate-spin`} />
      </div>
      {message && (
        <p className={`text-gray-600 ${size === 'small' ? 'text-sm' : size === 'medium' ? 'text-base' : 'text-lg'}`}>
          {message}
        </p>
      )}
    </div>
  );

  const renderDotsLoader = () => (
    <div className="text-center">
      <div className="flex justify-center gap-2 mb-4">
        <div className={`${size === 'small' ? 'w-2 h-2' : size === 'medium' ? 'w-3 h-3' : 'w-4 h-4'} bg-[#04CE78] rounded-full animate-bounce`}></div>
        <div className={`${size === 'small' ? 'w-2 h-2' : size === 'medium' ? 'w-3 h-3' : 'w-4 h-4'} bg-[#04CE78] rounded-full animate-bounce animation-delay-200`}></div>
        <div className={`${size === 'small' ? 'w-2 h-2' : size === 'medium' ? 'w-3 h-3' : 'w-4 h-4'} bg-[#04CE78] rounded-full animate-bounce animation-delay-400`}></div>
      </div>
      {message && (
        <p className={`text-gray-600 ${size === 'small' ? 'text-sm' : size === 'medium' ? 'text-base' : 'text-lg'}`}>
          {message}
        </p>
      )}
    </div>
  );

  const renderLoader = () => {
    switch (type) {
      case "medical":
        return renderMedicalLoader();
      case "heart":
        return renderHeartLoader();
      case "activity":
        return renderActivityLoader();
      case "spinner":
        return renderSpinnerLoader();
      case "dots":
        return renderDotsLoader();
      default:
        return renderMedicalLoader();
    }
  };

  return (
    <div className={containerClasses}>
      {renderLoader()}

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes heartbeat {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-heartbeat {
          animation: heartbeat 2s ease-in-out infinite;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;

// Usage Examples:
/*
// Basic usage
<LoadingSpinner />

// Different sizes
<LoadingSpinner size="small" />
<LoadingSpinner size="large" />

// Different types
<LoadingSpinner type="heart" message="Loading patient data..." />
<LoadingSpinner type="activity" message="Analyzing results..." />
<LoadingSpinner type="spinner" message="Connecting to server..." />
<LoadingSpinner type="dots" message="Processing..." />

// Full screen overlay
<LoadingSpinner fullScreen message="Please wait..." />

// Custom message
<LoadingSpinner message="Fetching hospital information..." />
*/
