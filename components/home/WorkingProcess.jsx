"use client";
import WelcomeBanner from "../layout/WelcomeBanner";
import workprocess from "../../data/workprocess.json";
import { FileText, CheckCircle, Plane, Heart } from "lucide-react";

const WorkingProcess = () => {
  // Icon mapping for each step
  const getStepIcon = (stepId) => {
    const iconMap = {
      "01": <FileText className="w-12 h-12 text-teal-600" />,
      "02": <CheckCircle className="w-12 h-12 text-teal-600" />,
      "03": <Plane className="w-12 h-12 text-teal-600" />,
      "04": <Heart className="w-12 h-12 text-teal-600" />
    };
    return iconMap[stepId] || <FileText className="w-12 h-12 text-teal-600" />;
  };

  return (
    <section className="flex flex-col items-center px-4 md:px-8 lg:px-18 py-12 md:py-20">
      <WelcomeBanner
        text="WORKING PROCESS"
        textColor="#04CE78"
        dotColor="#04CE78"
        alignment="center"
        className="text-lg mb-6"
      />
      <h3 className="text-center text-xl md:text-3xl font-extrabold text-[#1A0142] leading-tight mb-12">
        How it Works
      </h3>
      <div className="flex flex-col items-center px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 w-full max-w-7xl">
          {workprocess.map((step, index) => (
            <div
              key={step.id}
              className="bg-white rounded-xl border border-teal-200 p-6 text-center hover:shadow-lg transition-shadow duration-300"
            >
              {/* Icon at the top */}
              <div className="flex justify-center mb-4">
                {getStepIcon(step.id)}
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkingProcess;
