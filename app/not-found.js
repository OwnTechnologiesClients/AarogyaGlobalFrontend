"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Home,
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  Heart,
  Activity,
  Stethoscope
} from "lucide-react";

const NotFound = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [pulseAnimation, setPulseAnimation] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setPulseAnimation(prev => !prev);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center px-4 py-8 font-poppins">
      <div className="max-w-4xl mx-auto text-center">
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

        {/* Main Content */}
        <div className={`relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

          {/* 404 Number with Medical Cross */}
          <div className="relative mb-8">
            <div className="text-8xl md:text-9xl font-bold text-[#000D44] opacity-20 select-none">
              404
            </div>
            <div className={`absolute inset-0 flex items-center justify-center transition-transform duration-500 ${pulseAnimation ? 'scale-110' : 'scale-100'}`}>
              <div className="w-20 h-20 md:w-24 md:h-24 bg-[#04CE78] rounded-full flex items-center justify-center shadow-lg">
                <div className="w-8 h-8 md:w-10 md:h-10">
                  <div className="w-full h-2 bg-white rounded-full"></div>
                  <div className="w-2 h-full bg-white rounded-full absolute top-0 left-1/2 transform -translate-x-1/2"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Animated Heartbeat Line */}
          <div className="mb-8 flex justify-center">
            <div className="w-64 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#04CE78] to-[#000D44] rounded-full animate-heartbeat"></div>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl md:text-5xl font-bold text-[#000D44] mb-4 animate-fade-in-up">
            Page Not Found
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-600 mb-2 animate-fade-in-up animation-delay-200">
            Oops! The page you're looking for seems to have taken a sick day.
          </p>

          <p className="text-base md:text-lg text-gray-500 mb-8 animate-fade-in-up animation-delay-400">
            Don't worry, our medical team is here to help you find what you need.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in-up animation-delay-600">
            <Link
              href="/"
              className="group bg-[#04CE78] hover:bg-[#03b86a] text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Back to Home
            </Link>

            <Link
              href="/hospitalSearch"
              className="group bg-white hover:bg-gray-50 text-[#000D44] border-2 border-[#000D44] px-8 py-4 rounded-full font-semibold transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Find Hospitals
            </Link>
          </div>

          {/* Quick Links */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl animate-fade-in-up animation-delay-800">
            <h3 className="text-xl font-semibold text-[#000D44] mb-6">
              Quick Links to Help You
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                href="/about"
                className="group p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="text-blue-600 font-semibold group-hover:text-blue-700">
                  About Us
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Learn about our mission
                </div>
              </Link>

              <Link
                href="/contact"
                className="group p-4 rounded-xl bg-green-50 hover:bg-green-100 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="text-green-600 font-semibold group-hover:text-green-700">
                  Contact Us
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Get in touch with us
                </div>
              </Link>

              <Link
                href="/doctorDetails"
                className="group p-4 rounded-xl bg-purple-50 hover:bg-purple-100 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="text-purple-600 font-semibold group-hover:text-purple-700">
                  Find Doctors
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Search for specialists
                </div>
              </Link>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-xl animate-fade-in-up animation-delay-1000">
            <div className="flex items-center justify-center gap-2 text-red-600 font-semibold mb-2">
              <Phone className="w-4 h-4" />
              Emergency? Call us immediately
            </div>
            <div className="text-red-700 font-bold text-lg">
              +1 (555) 123-4567
            </div>
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
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
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
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        
        .animation-delay-600 {
          animation-delay: 0.6s;
        }
        
        .animation-delay-800 {
          animation-delay: 0.8s;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
};

export default NotFound;
