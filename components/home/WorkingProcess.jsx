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
        className="mb-5 text-lg"
      />
      <h1 className="md:text-5xl text-2xl text-blue-950 font-semibold text-center mb-12">
        How it Works
      </h1>
      <div className="flex flex-col items-center text-center px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16  w-full">
          {workprocess.map((step, index) => (
            <div
              key={step.id}
              className="flex flex-col items-center text-gray-800 relative group"
            >
              <div className="relative w-55 h-55 rounded-full overflow-hidden border-2 border-[#1F5FFF] transition-transform duration-300 hover:scale-105">
                <img
                  src={step.image}
                  alt={step.title}
                  className="object-cover w-full h-full"
                />
                <div className="absolute bottom-[-15px] left-1/2 transform -translate-x-1/2 bg-[#04CE78] text-white rounded-full w-14 h-14 flex items-center justify-center font-bold text-lg shadow-xl z-50">
                  {step.id}
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-blue-950 mt-8">
                {step.title}
              </h3>
              <p className="text-lg text-gray-700 mt-4 px-8 leading-relaxed ">
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
