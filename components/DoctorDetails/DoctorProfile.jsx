// components/DoctorProfile.tsx

"use client";
import Image from "next/image";
import { CheckCircle, Star, MapPin, Clock, Phone, Mail } from "lucide-react";
import SpecialtyCard from "./SpecialtyCard";

const DoctorProfile = ({ doctor }) => {
  if (!doctor) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Doctor not found</div>
      </div>
    );
  }

  // Helper function to generate introduction if not provided
  const getIntroduction = (doctor) => {
    if (doctor.about) return doctor.about;

    const specialtyDescriptions = {
      "Interventional Cardiologist": "specializes in catheter-based treatment of structural heart diseases and coronary artery disease. With extensive experience in minimally invasive cardiac procedures, they provide advanced care for complex cardiovascular conditions.",
      "Cardiologist": "is dedicated to diagnosing and treating diseases of the heart and blood vessels. They provide comprehensive cardiac care including preventive cardiology, heart disease management, and advanced cardiac interventions.",
      "Neurologist": "specializes in diagnosing and treating disorders of the nervous system, including the brain, spinal cord, and nerves. They provide expert care for conditions such as stroke, epilepsy, Parkinson's disease, and other neurological disorders.",
      "Orthopedic Surgeon": "specializes in the diagnosis, treatment, and prevention of disorders of the bones, joints, ligaments, tendons, and muscles. They provide both surgical and non-surgical treatments for musculoskeletal conditions.",
      "Oncologist": "is dedicated to the diagnosis and treatment of cancer. They provide comprehensive cancer care including chemotherapy, immunotherapy, and personalized treatment plans for various types of cancer.",
      "Gynecologist": "specializes in women's reproductive health, providing comprehensive care for gynecological conditions, pregnancy, and childbirth. They offer both preventive care and treatment for complex reproductive health issues.",
      "Urologist": "specializes in diseases of the urinary tract and male reproductive system. They provide both medical and surgical treatments for conditions affecting the kidneys, bladder, prostate, and reproductive organs.",
      "Pediatric Cardiologist": "specializes in diagnosing and treating heart conditions in children, from newborns to teenagers. They provide expert care for congenital heart defects and acquired heart diseases in pediatric patients.",
      "Cardiac Surgeon": "specializes in surgical treatment of heart diseases. They perform complex cardiac procedures including bypass surgery, valve repair, and heart transplantation with exceptional surgical expertise.",
      "Movement Disorder Neurologist": "specializes in the diagnosis and treatment of movement disorders such as Parkinson's disease, dystonia, and tremor disorders. They provide advanced treatments including deep brain stimulation.",
      "Robotic Urologist": "specializes in minimally invasive robotic surgery for urological conditions. They utilize advanced robotic technology to perform precise surgical procedures with reduced recovery time and improved outcomes."
    };

    const description = specialtyDescriptions[doctor.specialty] || "is a highly skilled medical professional dedicated to providing exceptional patient care. With years of experience and advanced training, they are committed to delivering the highest quality medical services.";

    return `Dr. ${doctor.name.split(' ').pop()} ${description} Located in ${doctor.location}, they bring ${doctor.experience || 'extensive experience'} to their practice, ensuring patients receive the most advanced and compassionate care available.`;
  };

  // Helper function to generate specializations if not provided
  const getSpecializations = (doctor) => {
    if (doctor.specializations && doctor.specializations.length > 0) return doctor.specializations;
    if (doctor.expertise && doctor.expertise.length > 0) return doctor.expertise;

    const defaultSpecializations = {
      "Interventional Cardiologist": [
        "Coronary Angioplasty", "Cardiac Catheterization", "Stent Placement",
        "Balloon Valvuloplasty", "Peripheral Vascular Interventions", "Structural Heart Disease"
      ],
      "Cardiologist": [
        "Preventive Cardiology", "Heart Disease Management", "Echocardiography",
        "Stress Testing", "Hypertension Management", "Cholesterol Management"
      ],
      "Neurologist": [
        "Stroke Management", "Epilepsy Treatment", "Headache Disorders",
        "Movement Disorders", "Memory Disorders", "Neuromuscular Diseases"
      ],
      "Orthopedic Surgeon": [
        "Joint Replacement", "Sports Medicine", "Trauma Surgery",
        "Spine Surgery", "Arthroscopic Surgery", "Fracture Treatment"
      ],
      "Oncologist": [
        "Chemotherapy", "Immunotherapy", "Radiation Therapy",
        "Clinical Trials", "Palliative Care", "Cancer Screening"
      ],
      "Gynecologist": [
        "Women's Health", "Reproductive Medicine", "Minimally Invasive Surgery",
        "Prenatal Care", "Menopause Management", "Fertility Treatment"
      ],
      "Urologist": [
        "Prostate Surgery", "Kidney Stone Treatment", "Bladder Disorders",
        "Male Infertility", "Urologic Oncology", "Minimally Invasive Surgery"
      ],
      "Pediatric Cardiologist": [
        "Congenital Heart Disease", "Pediatric Echocardiography", "Heart Murmur Evaluation",
        "Cardiac Catheterization", "Fetal Cardiology", "Heart Rhythm Disorders"
      ],
      "Cardiac Surgeon": [
        "Coronary Bypass Surgery", "Heart Valve Surgery", "Aortic Surgery",
        "Heart Transplantation", "Minimally Invasive Cardiac Surgery", "Congenital Heart Surgery"
      ],
      "Movement Disorder Neurologist": [
        "Parkinson's Disease", "Deep Brain Stimulation", "Dystonia Treatment",
        "Essential Tremor", "Huntington's Disease", "Botulinum Toxin Therapy"
      ],
      "Robotic Urologist": [
        "Robotic Prostatectomy", "Robotic Kidney Surgery", "Minimally Invasive Surgery",
        "Laparoscopic Surgery", "Robotic Bladder Surgery", "Advanced Urologic Procedures"
      ]
    };

    return defaultSpecializations[doctor.specialty] || [
      "General Medical Care", "Patient Consultation", "Diagnostic Services",
      "Treatment Planning", "Preventive Medicine", "Follow-up Care"
    ];
  };

  // Helper function to handle education data (can be string or array)
  const getEducationData = (education) => {
    if (!education) {
      return [
        { degree: "Doctor of Medicine (MD)", institution: "Prestigious Medical School", year: "Medical Degree" },
        { degree: "Residency Training", institution: "Leading Medical Center", year: "Specialized Training" },
        { degree: "Board Certification", institution: "Medical Board", year: "Certified Specialist" }
      ];
    }

    // If it's already an array, validate each item has required properties
    if (Array.isArray(education)) {
      return education.map(edu => {
        // Ensure each education item has the required properties
        if (typeof edu === 'object' && edu !== null) {
          return {
            degree: edu.degree || "Medical Degree",
            institution: edu.institution || "Medical Institution",
            year: edu.year || "Graduate"
          };
        }
        // If it's not an object, convert to proper format
        return {
          degree: "Medical Degree",
          institution: String(edu) || "Medical Institution",
          year: "Graduate"
        };
      });
    }

    // If it's a string, convert to array format
    if (typeof education === 'string') {
      return [{ degree: "Medical Degree", institution: education, year: "Graduate" }];
    }

    // Fallback for any other type
    return [
      { degree: "Medical Degree", institution: "Medical Institution", year: "Graduate" }
    ];
  };

  // Helper function to handle work experience data (can be array or undefined)
  const getWorkExperienceData = (workExperience) => {
    if (!workExperience) {
      const hospital = doctor.hospital || "Leading Medical Center";
      const experience = doctor.experience || "10+ years";
      return [
        { position: "Senior Consultant", hospital: hospital, duration: experience },
        { position: "Attending Physician", hospital: "Medical Center", duration: "5+ years" },
        { position: "Chief Resident", hospital: "Teaching Hospital", duration: "2 years" }
      ];
    }

    // If it's already an array, validate each item has required properties
    if (Array.isArray(workExperience)) {
      return workExperience.map(exp => {
        // Ensure each work experience item has the required properties
        if (typeof exp === 'object' && exp !== null) {
          return {
            position: exp.position || "Medical Position",
            hospital: exp.hospital || "Medical Institution",
            duration: exp.duration || "Experience"
          };
        }
        // If it's not an object, convert to proper format
        return {
          position: "Medical Position",
          hospital: String(exp) || "Medical Institution",
          duration: "Experience"
        };
      });
    }

    return [];
  };

  // Helper function to generate treatments
  const getTreatments = (doctor) => {
    if (doctor.treatments && doctor.treatments.length > 0) {
      // If treatments are treatment IDs (like "ORT0001"), convert them to readable names
      const treatmentNames = {
        // Orthopaedics treatments
        "ORT0001": "Total Knee Replacement (TKR)",
        "ORT0002": "Total Hip Replacement (THR)",
        "ORT0003": "ACL/MCL Ligament Reconstruction",
        "ORT0004": "Shoulder Replacement (Anatomic/Reverse)",
        // Cardiology treatments
        "CARD0001": "Coronary Artery Bypass Graft (CABG)",
        "CAR0002": "Angioplasty & Stenting (PCI)",
        "CAR0003": "Valve Repair & Replacement (SAVR/TAVR)",
        "CAR0004": "Pacemaker & ICD Implantation",
        "CAR0005": "Catheter Ablation (for Arrhythmias)",
        // Neurology treatments
        "NEUR0001": "IV Thrombolysis/Mechanical Thrombectomy for Acute Ischemic Stroke",
        // Oncology treatments
        "ONC0001": "Immune Checkpoint Inhibitors (PD-1/PD-L1, CTLA-4)",
        "ONC0002": "Mastectomy",
        "ONC0003": "Radical Prostatectomy",
        "ONC0004": "Colectomy",
        "ONC0005": "Debulking Surgery"
      };

      return doctor.treatments.map(treatment => {
        if (typeof treatment === 'string' && treatmentNames[treatment]) {
          return treatmentNames[treatment];
        }
        return typeof treatment === 'string' ? treatment : String(treatment);
      });
    }

    const defaultTreatments = {
      "Interventional Cardiologist": [
        "Coronary Angioplasty", "Stent Placement", "Balloon Valvuloplasty",
        "Atherectomy", "Peripheral Interventions", "Structural Heart Procedures"
      ],
      "Cardiologist": [
        "Cardiac Consultation", "Echocardiography", "Stress Testing",
        "Holter Monitoring", "Blood Pressure Management", "Lipid Management"
      ],
      "Neurologist": [
        "Neurological Examination", "EEG", "EMG", "Stroke Treatment",
        "Seizure Management", "Headache Treatment"
      ],
      "Orthopedic Surgeon": [
        "Joint Replacement Surgery", "Arthroscopic Surgery", "Fracture Repair",
        "Sports Injury Treatment", "Spine Surgery", "Trauma Surgery"
      ],
      "Oncologist": [
        "Cancer Diagnosis", "Chemotherapy", "Immunotherapy",
        "Targeted Therapy", "Clinical Trial Management", "Supportive Care"
      ],
      "Gynecologist": [
        "Gynecological Examination", "Pap Smear", "Colposcopy",
        "Laparoscopic Surgery", "Hysterectomy", "Fertility Consultation"
      ],
      "Urologist": [
        "Urological Consultation", "Cystoscopy", "Prostate Biopsy",
        "Kidney Stone Treatment", "Urologic Surgery", "Male Health Services"
      ]
    };

    return defaultTreatments[doctor.specialty] || [
      "Medical Consultation", "Diagnostic Services", "Treatment Planning",
      "Preventive Care", "Follow-up Care", "Patient Education"
    ];
  };

  // Helper function to generate awards
  const getAwards = (doctor) => {
    if (doctor.awards && doctor.awards.length > 0) return doctor.awards;

    return [
      "Excellence in Patient Care Award",
      "Outstanding Physician Recognition",
      "Medical Excellence Award",
      "Best Doctor in Specialty",
      "Patient Choice Award"
    ];
  };

  // Helper function to generate languages
  const getLanguages = (doctor) => {
    if (doctor.languages && doctor.languages.length > 0) return doctor.languages;

    // Generate based on location
    const locationLanguages = {
      "India": ["English", "Hindi"],
      "USA": ["English"],
      "Canada": ["English", "French"],
      "Germany": ["German", "English"],
      "UK": ["English"],
      "Australia": ["English"]
    };

    const location = doctor.location || "";
    for (const [country, langs] of Object.entries(locationLanguages)) {
      if (location.includes(country)) return langs;
    }

    return ["English"];
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full px-4 lg:px-20 py-12 font-poppins">
      {/* Left Section */}
      <div className="lg:w-1/3 w-full flex flex-col items-center gap-6">
        <div className="bg-white rounded-xl shadow-md overflow-hidden w-full">
          <div className="w-full h-72 relative">
            <Image
              src={doctor.image}
              alt={doctor.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="p-4 text-center">
            <h2 className="text-xl font-semibold text-[#000D44]">
              {doctor.name}
            </h2>
            <p className="text-base text-gray-600 mt-1">{doctor.specialty}</p>

            {/* Rating */}
            <div className="flex items-center justify-center gap-1 mt-2">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-medium">{doctor.rating}</span>
            </div>

            {/* Location */}
            <div className="flex items-center justify-center gap-1 mt-1 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{doctor.location}</span>
            </div>

            {/* Experience */}
            <div className="flex items-center justify-center gap-1 mt-1 text-gray-600">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{doctor.experience} experience</span>
            </div>

            {/* Contact Info */}
            {/* <div className="mt-4 space-y-2">
              <div className="flex items-center justify-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-gray-500" />
                <span>{doctor.contact?.phone}</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-gray-500" />
                <span>{doctor.contact?.email}</span>
              </div>
            </div> */}
          </div>
        </div>

        <SpecialtyCard doctor={doctor} />
      </div>

      {/* Right Section */}
      <div className="lg:w-2/3 w-full flex flex-col gap-10">
        {/* Introduction */}
        <section>
          <h3 className="text-3xl font-bold text-[#000D44] mb-4">
            Introduction
          </h3>
          <p className="text-gray-700 leading-relaxed">
            {getIntroduction(doctor)}
          </p>
        </section>

        {/* Specialization */}
        <section>
          <h3 className="text-3xl font-bold text-[#000D44] mb-4">
            Specializations
          </h3>
          <p className="text-gray-700 mb-4">
            Dr. {doctor.name.split(' ').pop()} specializes in the following areas:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[#000D44]">
            {getSpecializations(doctor).map((specialization, index) => (
              <div key={index} className="flex items-start gap-2">
                <CheckCircle className="text-blue-600 w-5 h-5 mt-1" />
                <p className="font-semibold">{typeof specialization === 'string' ? specialization : String(specialization)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Educational Info */}
        <section>
          <h3 className="text-3xl font-bold text-[#000D44] mb-4">
            Educational Background
          </h3>
          <p className="text-gray-700 mb-4">
            Dr. {doctor.name.split(' ').pop()} has received comprehensive medical education and training:
          </p>
          <div className="flex flex-col gap-3 text-[#000D44]">
            {getEducationData(doctor.education).map((edu, index) => (
              <div key={index} className="flex items-start gap-2">
                <CheckCircle className="text-blue-600 w-5 h-5 mt-1" />
                <p>
                  <span className="font-semibold">{edu.institution}</span>{" "}
                  <span className="font-semibold">{edu.degree}</span>{" "}
                  <span className="text-sm">({edu.year})</span>
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section>
          <h3 className="text-3xl font-bold text-[#000D44] mb-4">
            Professional Experience
          </h3>
          <p className="text-gray-700 mb-4">
            Dr. {doctor.name.split(' ').pop()} has extensive experience in various healthcare institutions:
          </p>
          <div className="flex flex-col gap-3 text-[#000D44]">
            {getWorkExperienceData(doctor.workExperience).map((exp, index) => (
              <div key={index} className="flex items-start gap-2">
                <CheckCircle className="text-blue-600 w-5 h-5 mt-1" />
                <p>
                  <span className="font-semibold">{exp.position}</span>{" "}
                  <span className="text-sm">at {exp.hospital} ({exp.duration})</span>
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Treatments */}
        <section>
          <h3 className="text-3xl font-bold text-[#000D44] mb-4">
            Treatments & Procedures
          </h3>
          <p className="text-gray-700 mb-4">
            Dr. {doctor.name.split(' ').pop()} offers the following treatments and procedures:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[#000D44]">
            {getTreatments(doctor).map((treatment, index) => (
              <div key={index} className="flex items-start gap-2">
                <CheckCircle className="text-blue-600 w-5 h-5 mt-1" />
                <p className="font-semibold">{typeof treatment === 'string' ? treatment : String(treatment)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Awards */}
        <section>
          <h3 className="text-3xl font-bold text-[#000D44] mb-4">
            Awards & Recognition
          </h3>
          <p className="text-gray-700 mb-4">
            Dr. {doctor.name.split(' ').pop()} has been recognized for excellence in medical practice:
          </p>
          <div className="flex flex-col gap-3 text-gray-800">
            {doctor.awards?.map((award, index) => (
              <div key={index} className="flex items-start gap-2">
                <CheckCircle className="text-blue-600 w-5 h-5 mt-1" />
                <p>{typeof award === 'string' ? award : String(award)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Research Work */}
        {doctor.researchWork && (
          <section>
            <h3 className="text-3xl font-bold text-[#000D44] mb-4">
              Research Work
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              {doctor.researchWork}
            </p>
          </section>
        )}

        {/* Publications */}
        {doctor.publications && doctor.publications.length > 0 && (
          <section>
            <h3 className="text-3xl font-bold text-[#000D44] mb-4">
              Publications & Research
            </h3>
            <p className="text-gray-700 mb-4">
              Dr. {doctor.name.split(' ').pop()} has contributed to medical literature through:
            </p>
            <div className="flex flex-col gap-3 text-gray-800">
              {doctor.publications.map((publication, index) => (
                <div key={index} className="flex items-start gap-2">
                  <CheckCircle className="text-blue-600 w-5 h-5 mt-1" />
                  <p>{typeof publication === 'string' ? publication : String(publication)}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Languages */}
        <section>
          <h3 className="text-3xl font-bold text-[#000D44] mb-4">
            Languages Spoken
          </h3>
          <div className="flex flex-wrap gap-2">
            {getLanguages(doctor).map((language, index) => (
              <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {typeof language === 'string' ? language : String(language)}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DoctorProfile;
