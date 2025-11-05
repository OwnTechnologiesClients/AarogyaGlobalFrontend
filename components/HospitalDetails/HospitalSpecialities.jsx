"use client";
import React from 'react';
import {
  Heart,
  Brain,
  Bone,
  Eye,
  Baby,
  Stethoscope,
  Users,
  Star
} from 'lucide-react';
import apiService from '../../lib/apiService';

const HospitalSpecialities = ({ hospital }) => {
  // Map specialties to icons
  const getSpecialtyIcon = (specialty) => {
    const iconMap = {
      // General Specialties
      "Cardiology": <Heart className="w-8 h-8 text-red-500" />,
      "Neurology": <Brain className="w-8 h-8 text-purple-500" />,
      "Orthopedics": <Bone className="w-8 h-8 text-blue-500" />,
      "Oncology": <Stethoscope className="w-8 h-8 text-orange-600" />,
      "Gynaecology": <Heart className="w-8 h-8 text-pink-500" />,
      "Urology": <Stethoscope className="w-8 h-8 text-blue-600" />,

      // Cardiology Subspecialties
      "Interventional Cardiology": <Heart className="w-8 h-8 text-red-600" />,
      "Heart Transplant": <Heart className="w-8 h-8 text-red-700" />,
      "Cardiac Surgery": <Heart className="w-8 h-8 text-red-800" />,
      "Electrophysiology": <Heart className="w-8 h-8 text-red-400" />,
      "Heart Failure": <Heart className="w-8 h-8 text-red-300" />,
      "Preventive Cardiology": <Heart className="w-8 h-8 text-green-500" />,
      "Pediatric Cardiology": <Baby className="w-8 h-8 text-red-500" />,
      "Adult Congenital Heart Disease": <Heart className="w-8 h-8 text-purple-600" />,
      "Cardiac Rehabilitation": <Heart className="w-8 h-8 text-blue-500" />,
      "Cardiac Imaging": <Heart className="w-8 h-8 text-teal-500" />,
      "Structural Heart Disease": <Heart className="w-8 h-8 text-indigo-500" />,

      // Neurology Subspecialties
      "Stroke Treatment": <Brain className="w-8 h-8 text-red-600" />,
      "Epilepsy": <Brain className="w-8 h-8 text-purple-600" />,
      "Movement Disorders": <Brain className="w-8 h-8 text-blue-600" />,
      "Neuro-oncology": <Brain className="w-8 h-8 text-orange-600" />,
      "Neuromuscular Disorders": <Brain className="w-8 h-8 text-green-600" />,
      "Brain Tumors": <Brain className="w-8 h-8 text-red-700" />,
      "Multiple Sclerosis": <Brain className="w-8 h-8 text-purple-700" />,
      "Headache Medicine": <Brain className="w-8 h-8 text-yellow-600" />,
      "Sleep Disorders": <Brain className="w-8 h-8 text-indigo-600" />,

      // Oncology Subspecialties
      "Breast Cancer": <Heart className="w-8 h-8 text-pink-600" />,
      "Lung Cancer": <Stethoscope className="w-8 h-8 text-gray-600" />,
      "Leukemia": <Stethoscope className="w-8 h-8 text-red-600" />,
      "Prostate Cancer": <Stethoscope className="w-8 h-8 text-blue-700" />,
      "Colorectal Cancer": <Stethoscope className="w-8 h-8 text-brown-600" />,
      "Lymphoma": <Stethoscope className="w-8 h-8 text-purple-600" />,
      "Melanoma": <Stethoscope className="w-8 h-8 text-black" />,
      "Pediatric Oncology": <Baby className="w-8 h-8 text-orange-600" />,
      "Sarcoma": <Stethoscope className="w-8 h-8 text-yellow-700" />,

      // Orthopedics Subspecialties
      "Joint Replacement": <Bone className="w-8 h-8 text-blue-600" />,
      "Sports Medicine": <Bone className="w-8 h-8 text-green-600" />,
      "Spine Surgery": <Bone className="w-8 h-8 text-purple-600" />,
      "Hand Surgery": <Bone className="w-8 h-8 text-orange-600" />,
      "Foot and Ankle": <Bone className="w-8 h-8 text-teal-600" />,
      "Trauma Surgery": <Bone className="w-8 h-8 text-red-600" />,
      "Pediatric Orthopedics": <Baby className="w-8 h-8 text-blue-600" />,
      "Shoulder Surgery": <Bone className="w-8 h-8 text-indigo-600" />,
      "Knee Surgery": <Bone className="w-8 h-8 text-cyan-600" />,

      // Gynaecology Subspecialties
      "Fertility Treatment": <Heart className="w-8 h-8 text-pink-600" />,
      "Gynecological Surgery": <Heart className="w-8 h-8 text-pink-700" />,
      "Women's Health": <Heart className="w-8 h-8 text-pink-500" />,
      "Gynecological Oncology": <Heart className="w-8 h-8 text-pink-800" />,
      "Urogynecology": <Heart className="w-8 h-8 text-pink-400" />,
      "Reproductive Medicine": <Heart className="w-8 h-8 text-pink-300" />,
      "High-Risk Pregnancy": <Baby className="w-8 h-8 text-pink-600" />,
      "Pediatric Gynecology": <Baby className="w-8 h-8 text-pink-500" />,

      // Urology Subspecialties
      "Robotic Urology": <Stethoscope className="w-8 h-8 text-blue-700" />,
      "Kidney Transplant": <Stethoscope className="w-8 h-8 text-blue-800" />,
      "Prostate Surgery": <Stethoscope className="w-8 h-8 text-blue-600" />,
      "Urological Oncology": <Stethoscope className="w-8 h-8 text-blue-900" />,
      "Reconstructive Urology": <Stethoscope className="w-8 h-8 text-blue-500" />,
      "Pediatric Urology": <Baby className="w-8 h-8 text-blue-600" />,
      "Kidney Stone Treatment": <Stethoscope className="w-8 h-8 text-yellow-600" />,
      "Male Infertility": <Stethoscope className="w-8 h-8 text-green-700" />,
      "Bladder Surgery": <Stethoscope className="w-8 h-8 text-teal-700" />,
      "Female Urology": <Heart className="w-8 h-8 text-blue-600" />,
      "Urological Trauma": <Stethoscope className="w-8 h-8 text-red-700" />,
      "Urological Research": <Stethoscope className="w-8 h-8 text-purple-700" />,
      "Clinical Trials": <Stethoscope className="w-8 h-8 text-indigo-700" />
    };
    return iconMap[specialty] || <Stethoscope className="w-8 h-8 text-gray-500" />;
  };

  const getSpecialtyDescription = (specialty) => {
    const descriptionMap = {
      // General Specialties
      "Cardiology": "Comprehensive heart and cardiovascular care with advanced diagnostic and treatment options",
      "Neurology": "Expert diagnosis and treatment of brain, spine, and nervous system disorders",
      "Orthopedics": "Specialized care for bones, joints, muscles, and skeletal system conditions",
      "Oncology": "Comprehensive cancer care with advanced treatment options and personalized medicine",
      "Gynaecology": "Women's health and reproductive care with advanced surgical and medical treatments",
      "Urology": "Expert care for urinary tract and male reproductive system conditions",

      // Cardiology Subspecialties
      "Interventional Cardiology": "Minimally invasive heart procedures using catheter-based techniques",
      "Heart Transplant": "Advanced heart transplantation and cardiac replacement therapy",
      "Cardiac Surgery": "Comprehensive surgical treatments for heart and cardiovascular conditions",
      "Electrophysiology": "Specialized treatment for heart rhythm disorders and arrhythmias",
      "Heart Failure": "Expert management and treatment of heart failure conditions",
      "Preventive Cardiology": "Preventive care and risk assessment for cardiovascular health",
      "Pediatric Cardiology": "Specialized heart care for infants, children, and adolescents",
      "Adult Congenital Heart Disease": "Treatment of heart defects present from birth in adults",
      "Cardiac Rehabilitation": "Comprehensive recovery programs for heart patients",
      "Cardiac Imaging": "Advanced imaging techniques for heart diagnosis and monitoring",
      "Structural Heart Disease": "Treatment of heart valve and structural abnormalities",

      // Neurology Subspecialties
      "Stroke Treatment": "Emergency and long-term care for stroke patients",
      "Epilepsy": "Comprehensive treatment for seizure disorders and epilepsy",
      "Movement Disorders": "Treatment of Parkinson's disease and other movement disorders",
      "Neuro-oncology": "Specialized care for brain and nervous system tumors",
      "Neuromuscular Disorders": "Treatment of muscle and nerve disorders",
      "Brain Tumors": "Advanced treatment for brain and central nervous system tumors",
      "Multiple Sclerosis": "Comprehensive care for multiple sclerosis and related conditions",
      "Headache Medicine": "Specialized treatment for chronic headaches and migraines",
      "Sleep Disorders": "Diagnosis and treatment of sleep-related disorders",

      // Oncology Subspecialties
      "Breast Cancer": "Comprehensive breast cancer treatment with multidisciplinary care",
      "Lung Cancer": "Advanced lung cancer treatment including surgery and targeted therapy",
      "Leukemia": "Specialized treatment for blood cancers and leukemia",
      "Prostate Cancer": "Comprehensive prostate cancer care with advanced treatment options",
      "Colorectal Cancer": "Expert treatment for colon and rectal cancers",
      "Lymphoma": "Specialized care for lymphatic system cancers",
      "Melanoma": "Advanced treatment for skin cancer and melanoma",
      "Pediatric Oncology": "Specialized cancer care for children and adolescents",
      "Sarcoma": "Expert treatment for rare bone and soft tissue cancers",

      // Orthopedics Subspecialties
      "Joint Replacement": "Advanced joint replacement surgery for hips, knees, and other joints",
      "Sports Medicine": "Specialized care for sports injuries and athletic performance",
      "Spine Surgery": "Advanced surgical treatment for spine and back conditions",
      "Hand Surgery": "Specialized surgery for hand, wrist, and upper extremity conditions",
      "Foot and Ankle": "Expert care for foot and ankle injuries and conditions",
      "Trauma Surgery": "Emergency surgical care for bone and joint injuries",
      "Pediatric Orthopedics": "Specialized bone and joint care for children",
      "Shoulder Surgery": "Advanced surgical treatment for shoulder conditions",
      "Knee Surgery": "Specialized knee surgery including arthroscopy and reconstruction",

      // Gynaecology Subspecialties
      "Fertility Treatment": "Comprehensive fertility care and assisted reproductive technologies",
      "Gynecological Surgery": "Advanced surgical treatments for women's health conditions",
      "Women's Health": "Comprehensive healthcare services for women of all ages",
      "Gynecological Oncology": "Specialized treatment for gynecological cancers",
      "Urogynecology": "Treatment of pelvic floor disorders and urinary incontinence",
      "Reproductive Medicine": "Advanced reproductive health and fertility treatments",
      "High-Risk Pregnancy": "Specialized care for high-risk pregnancies and complications",
      "Pediatric Gynecology": "Specialized gynecological care for children and adolescents",

      // Urology Subspecialties
      "Robotic Urology": "Minimally invasive robotic surgery for urological conditions",
      "Kidney Transplant": "Advanced kidney transplantation and renal replacement therapy",
      "Prostate Surgery": "Specialized surgical treatment for prostate conditions",
      "Urological Oncology": "Expert treatment for urological cancers",
      "Reconstructive Urology": "Surgical reconstruction of urinary tract abnormalities",
      "Pediatric Urology": "Specialized urological care for children",
      "Kidney Stone Treatment": "Advanced treatment for kidney stones and urinary stones",
      "Male Infertility": "Comprehensive treatment for male fertility issues",
      "Bladder Surgery": "Specialized surgical treatment for bladder conditions",
      "Female Urology": "Specialized urological care for women",
      "Urological Trauma": "Emergency care for urological injuries and trauma",
      "Urological Research": "Cutting-edge research in urological treatments",
      "Clinical Trials": "Access to latest experimental treatments and therapies"
    };
    return descriptionMap[specialty] || "Specialized medical care and treatment services";
  };

  // Create specialties from backend schema: Array<{ name, rating, doctorsCount, description, keyServices }>
  const specialities = (hospital?.specialties || []).map((spec) => {
    const name = typeof spec === 'string' ? spec : spec?.name;
    const rating = typeof spec === 'object' ? spec?.rating : undefined;
    const doctorsCount = typeof spec === 'object' ? spec?.doctorsCount : undefined;
    const description = typeof spec === 'object' ? (spec?.description || getSpecialtyDescription(name)) : getSpecialtyDescription(name);
    const keyServices = typeof spec === 'object' ? (spec?.keyServices || []) : [];
    return {
      icon: getSpecialtyIcon(name),
      name: name,
      description,
      doctors: doctorsCount,
      rating: rating,
      services: keyServices
    };
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Medical Specialities</h2>
        <p className="text-gray-600 text-lg">
          {hospital?.name || "Our hospital"} offers comprehensive medical care across multiple specialties with experienced doctors and state-of-the-art facilities.
        </p>
      </div>

      {specialities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {specialities.map((specialty, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-300">
              {/* Header */}
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-gray-50 rounded-xl">
                  {specialty.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{specialty.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{specialty.doctors ?? 'N/A'} Doctors</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-4 leading-relaxed">
                {specialty.description}
              </p>

              {/* Services */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-2">Key Services:</h4>
                <div className="flex flex-wrap gap-2">
                  {(specialty.services || []).map((service, serviceIndex) => (
                    <span
                      key={serviceIndex}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                    >
                      {typeof service === 'object' ? service.name || service : service}
                    </span>
                  ))}
                </div>
              </div>


            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No specialties information available for this hospital.</p>
        </div>
      )}

      {/* Statistics Section */}
      <div className="mt-12 bg-gradient-to-r from-[#04CE78] to-green-600 rounded-2xl p-8 text-white">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-2">Our Medical Excellence</h3>
          <p className="text-green-100">Trusted by thousands of patients across all specialties</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold mb-1">{hospital?.doctorsCount || hospital?.overview?.doctors || "45"}</div>
            <div className="text-green-100 text-sm">Specialist Doctors</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-1">{specialities.length || "5"}+</div>
            <div className="text-green-100 text-sm">Medical Specialties</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-1">50,000+</div>
            <div className="text-green-100 text-sm">Patients Treated</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-1">4.8</div>
            <div className="text-green-100 text-sm">Average Rating</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalSpecialities;
