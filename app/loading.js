"use client";

import React from "react";
import { Heart, Activity, Stethoscope } from "lucide-react";

const Loading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center px-4 py-8 font-poppins">
      <div className="text-center">
        {/* Animated Medical Icons Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 animate-float">
            <Heart className="w-8 h-8 text-red-200" />
          </div>
          <div className="absolute top-40 right-20 animate-float-delayed">
            <Activity className="w-6 h-6 text-blue-200" />
          </div>
          <div className="absolute bottom-40 left-20 animate-float">
            <Stethoscope className="w-10 h-10 text-green-200" />
          </div>
          <div className="absolute bottom-20 right-10 animate-float-delayed">
            <Heart className="w-6 h-6 text-pink-200" />
          </div>
        </div>

        {/* Main Loading Content */}
        <div className="relative z-10">
          {/* Medical Cross Loader */}
          <div className="mb-8 flex justify-center">
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 bg-[#04CE78] rounded-full animate-ping opacity-75"></div>
              <div className="relative w-20 h-20 bg-[#04CE78] rounded-full flex items-center justify-center animate-pulse">
                <div className="w-8 h-8">
                  <div className="w-full h-2 bg-white rounded-full"></div>
                  <div className="w-2 h-full bg-white rounded-full absolute top-0 left-1/2 transform -translate-x-1/2"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Heartbeat Line */}
          <div className="mb-8 flex justify-center">
            <div className="w-64 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#04CE78] to-[#000D44] rounded-full animate-heartbeat"></div>
            </div>
          </div>

          {/* Loading Text */}
          <h2 className="text-2xl md:text-3xl font-semibold text-[#000D44] mb-4 animate-fade-in-out">
            Loading...
          </h2>
          
          <p className="text-lg text-gray-600 animate-fade-in-out animation-delay-500">
            Preparing your healthcare experience
          </p>

          {/* Animated Dots */}
          <div className="flex justify-center gap-2 mt-6">
            <div className="w-3 h-3 bg-[#04CE78] rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-[#04CE78] rounded-full animate-bounce animation-delay-200"></div>
            <div className="w-3 h-3 bg-[#04CE78] rounded-full animate-bounce animation-delay-400"></div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes heartbeat {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes fade-in-out {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 3s ease-in-out infinite;
          animation-delay: 1.5s;
        }
        
        .animate-heartbeat {
          animation: heartbeat 2s ease-in-out infinite;
        }
        
        .animate-fade-in-out {
          animation: fade-in-out 2s ease-in-out infinite;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
      `}</style>
    </div>
  );
};

export default Loading;
