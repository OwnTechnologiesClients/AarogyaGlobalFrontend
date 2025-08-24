import { Star, Clock3 } from "lucide-react";

const SpecialtyCard = ({ doctor }) => {
  if (!doctor) return null;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full flex flex-col gap-6">
      <h2 className=" text-[#000D44] text-xl font-bold">Specialty</h2>
      {/* Role + Hospital */}
      <div className="text-center">
        <p className="text-sm text-gray-700">
          {doctor.specialty}
        </p>
        <p className="text-sm text-gray-700 mt-1">
          Consults at: <span className="font-medium">{doctor.hospital}</span>
        </p>
      </div>

      {/* Rating */}
      <div className="flex justify-center items-center gap-1">
        {[...Array(Math.floor(parseFloat(doctor.rating)))].map((_, i) => (
          <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
        ))}
        <span className="text-gray-600 text-sm font-medium ml-1">{doctor.rating}</span>
      </div>




      {/* Experience */}
      <div className="bg-gray-50 rounded-md px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock3 className="w-5 h-5 text-teal-600" />
          <span className="text-sm text-gray-700 font-medium">Experience</span>
        </div>
        <span className="text-lg font-semibold text-gray-900">{doctor.experience}</span>
      </div>
    </div>
  );
};

export default SpecialtyCard;
