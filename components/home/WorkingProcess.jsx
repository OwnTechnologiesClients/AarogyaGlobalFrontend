"use client";
import WelcomeBanner from "../layout/WelcomeBanner";
import workprocess from "../../data/workprocess.json";
const WorkingProcess = () => {
  return (
    <section className="flex flex-col items-center md:mb-16 md:mt-16 mb-8 mt-8">
      <WelcomeBanner
        text="WORKING PROCESS"
        textColor="#04CE78"
        dotColor="#04CE78"
        alignment="center"
        className="text-xl font-semibold mt-20 mb-5"
      />
       <h3 className=" text-center text-3xl md:text-5xl font-extrabold text-[#1A0142] leading-tight">
        How it Works
      </h3>
      <div className="flex flex-col items-center text-center px-4 py-10 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16  w-full">
          {workprocess.map((step, index) => (
            <div
              key={step.id}
              className="flex flex-col items-center text-gray-800 relative group"
            >
              <div className="relative w-56 h-56 rounded-full overflow-hidden border-2 border-[#1F5FFF] transition-transform duration-300 hover:scale-105">
                <img
                  src={step.image}
                  alt={step.title}
                  className="object-cover w-full h-full"
                />

                {/* Step ID inside the image */}
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-[#04CE78] text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg shadow-lg z-10">
                  {step.id}
                </div>
              </div>

              <h3 className="text-3xl font-semibold text-[#1A0142] mt-8">
                {step.title}
              </h3>
              <p className="text-xl  text-[#555555] mt-4 max-w-4xl leading-relaxed ">
                {step.description}
              </p>

              {index < workprocess.length - 1 && (
                <div className="absolute right-[-60px] top-24 hidden xl:block">
                  <img
                    src={`/workprocess/${
                      index % 2 === 0 ? "arrow2.png" : "arrow1.png"
                    }`}
                    alt="Arrow"
                    className="w-24"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkingProcess;
