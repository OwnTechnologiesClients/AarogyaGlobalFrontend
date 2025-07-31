"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { 
  Home, 
  RefreshCw, 
  Phone, 
  AlertTriangle,
  Heart,
  Activity
} from "lucide-react";

const ErrorPage = ({ error, reset }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    console.error('Error occurred:', error);
  }, [error]);

  const handleRetry = () => {
    setIsRetrying(true);
    setTimeout(() => {
      setIsRetrying(false);
      reset();
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center px-4 py-8 font-poppins">
      <div className="max-w-4xl mx-auto text-center">
        {/* Animated Medical Icons Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 animate-float">
            <Heart className="w-8 h-8 text-red-200" />
          </div>
          <div className="absolute top-40 right-20 animate-float-delayed">
            <Activity className="w-6 h-6 text-orange-200" />
          </div>
          <div className="absolute bottom-40 left-20 animate-float">
            <AlertTriangle className="w-10 h-10 text-yellow-200" />
          </div>
          <div className="absolute bottom-20 right-10 animate-float-delayed">
            <Heart className="w-6 h-6 text-pink-200" />
          </div>
        </div>

        {/* Main Content */}
        <div className={`relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* 500 Number with Warning Icon */}
          <div className="relative mb-8">
            <div className="text-8xl md:text-9xl font-bold text-[#000D44] opacity-20 select-none">
              500
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-red-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                <AlertTriangle className="w-10 h-10 md:w-12 md:h-12 text-white" />
              </div>
            </div>
          </div>

          {/* Animated Error Line */}
          <div className="mb-8 flex justify-center">
            <div className="w-64 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full animate-error-pulse"></div>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl md:text-5xl font-bold text-[#000D44] mb-4 animate-fade-in-up">
            Server Error
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-600 mb-2 animate-fade-in-up animation-delay-200">
            Our medical systems are experiencing some technical difficulties.
          </p>
          
          <p className="text-base md:text-lg text-gray-500 mb-8 animate-fade-in-up animation-delay-400">
            Our technical team has been notified and is working on a solution.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in-up animation-delay-600">
            <button 
              onClick={handleRetry}
              disabled={isRetrying}
              className="group bg-[#04CE78] hover:bg-[#03b86a] disabled:bg-gray-400 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:transform-none"
            >
              <RefreshCw className={`w-5 h-5 transition-transform ${isRetrying ? 'animate-spin' : 'group-hover:rotate-180'}`} />
              {isRetrying ? 'Retrying...' : 'Try Again'}
            </button>
            
            <Link 
              href="/"
              className="group bg-white hover:bg-gray-50 text-[#000D44] border-2 border-[#000D44] px-8 py-4 rounded-full font-semibold transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Back to Home
            </Link>
          </div>

          {/* Error Details (for development) */}
          {process.env.NODE_ENV === 'development' && error && (
            <div className="bg-gray-100 rounded-xl p-6 mb-8 text-left animate-fade-in-up animation-delay-800">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Error Details (Development Mode)
              </h3>
              <pre className="text-sm text-gray-600 overflow-auto max-h-40">
                {error.message || 'Unknown error occurred'}
              </pre>
            </div>
          )}

          {/* Quick Actions */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl animate-fade-in-up animation-delay-800">
            <h3 className="text-xl font-semibold text-[#000D44] mb-6">
              What You Can Do
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-blue-50">
                <div className="text-blue-600 font-semibold mb-2">
                  Wait a Few Minutes
                </div>
                <div className="text-sm text-gray-600">
                  The issue might resolve itself automatically
                </div>
              </div>
              
              <div className="p-4 rounded-xl bg-green-50">
                <div className="text-green-600 font-semibold mb-2">
                  Contact Support
                </div>
                <div className="text-sm text-gray-600">
                  If the problem persists, reach out to us
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-xl animate-fade-in-up animation-delay-1000">
            <div className="flex items-center justify-center gap-2 text-red-600 font-semibold mb-2">
              <Phone className="w-4 h-4" />
              Need Immediate Medical Assistance?
            </div>
            <div className="text-red-700 font-bold text-lg">
              Call Emergency: +1 (555) 123-4567
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
        
        @keyframes error-pulse {
          0%, 100% { transform: scaleX(1); opacity: 1; }
          50% { transform: scaleX(1.1); opacity: 0.8; }
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
        
        .animate-error-pulse {
          animation: error-pulse 2s ease-in-out infinite;
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

export default ErrorPage;
