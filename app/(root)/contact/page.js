"use client";
import PageHeader from '@/components/layout/PageHeader';
import PageHeadrsData from "@/data/pageHeadersData.json";
import React , { useState } from 'react'

const Contact = () => {
  const { title, routes } = PageHeadrsData.contactUs;
    const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [agreed, setAgreed] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Contact' }
  ];
  return (
  // <div className="w-full">
     
  //     {/* Hero Section */}
  //     <div className="relative bg-main-1 px-2.5 mb-5">
  //       <div className="relative bg-primary-alpha rounded-2xl px-4 sm:px-14 py-14 sm:py-16">
  //         <div className="flex flex-col lg:flex-row justify-center items-end gap-8 lg:gap-0 mb-12 sm:mb-0">
  //           {/* Left decoration */}
  //           <img 
  //             src="/images/img_image_br_shape_one.png" 
  //             alt="decoration" 
  //             className="w-20 sm:w-24 lg:w-28 h-auto self-end lg:self-auto"
  //           />
            
  //           {/* Center content */}
  //           <div className="flex flex-col items-center gap-1 flex-1 px-4 sm:px-14 mt-20 sm:mt-24 mb-10 sm:mb-12">
  //             <h1 className="text-white-1 text-2xl sm:text-3xl lg:text-4xl font-semibold font-poppins text-center">
  //               Contact Us
  //             </h1>
  //             <BreadCrumb items={breadcrumbItems} className="mt-1" />
  //           </div>
            
  //           {/* Right decoration */}
  //           <img 
  //             src="/images/img_image_br_shape_two_78x74.png" 
  //             alt="decoration" 
  //             className="w-16 sm:w-18 lg:w-20 h-auto self-start lg:self-auto mr-7"
  //           />
  //         </div>
  //       </div>
  //     </div>

  //     {/* Contact Options Section */}
  //     <div className="px-4 sm:px-14 py-16 sm:py-24">
  //       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 mb-24 sm:mb-32">
  //         {/* Telephone Support */}
  //         <div className="bg-secondary-purple rounded-2xl p-12 sm:p-14 text-center">
  //           <div className="bg-secondary-1 rounded-full p-8 inline-flex mb-6 sm:mb-8">
  //             <img src="/images/img_image_gray_900.svg" alt="phone" className="w-12 sm:w-14 h-12 sm:h-14" />
  //           </div>
  //           <h3 className="text-primary-1 text-xl font-semibold font-poppins mb-3 sm:mb-4">
  //             Telephone Support
  //           </h3>
  //           <div className="text-primary-1 text-base font-inter mb-5 sm:mb-6 space-y-0.5">
  //             <p>Call us Mon. – Fri., 8 am – 5 pm and our</p>
  //             <p>representatives will help you make an</p>
  //             <p>appointment that is convenient for you.</p>
  //           </div>
  //           <Button 
  //             variant="primary"
  //             className="bg-primary-blue text-white-1 text-sm font-semibold font-poppins w-full"
  //             rightImage={{ src: "/images/img_image_transition_white_a700_16x16.svg", width: 16, height: 16 }}
  //           >
  //             Call Support: +91 9876565678
  //           </Button>
  //         </div>

  //         {/* Virtual Visits */}
  //         <div className="bg-primary-light-blue rounded-2xl p-12 sm:p-14 text-center">
  //           <div className="bg-secondary-1 rounded-full p-7 sm:p-8 inline-flex mb-5 sm:mb-6">
  //             <img src="/images/img_image_gray_900_60x60.svg" alt="video" className="w-14 sm:w-15 h-14 sm:h-15" />
  //           </div>
  //           <h3 className="text-primary-1 text-xl font-semibold font-poppins mb-5">
  //             Virtual Visits
  //           </h3>
  //           <div className="text-primary-1 text-base font-inter mb-5 sm:mb-6 space-y-0.5">
  //             <p>You can have your appointment without</p>
  //             <p>leaving your home. It is the easiest way</p>
  //             <p>to get the care you need to stay healthy.</p>
  //           </div>
  //           <Button 
  //             variant="primary"
  //             className="bg-primary-accent text-white-1 text-sm font-semibold font-poppins px-6 sm:px-11 py-4"
  //             rightImage={{ src: "/images/img_image.svg", width: 18, height: 12 }}
  //           >
  //             Read More Virtual Visits
  //           </Button>
  //         </div>

  //         {/* Book Appointment */}
  //         <div className="bg-secondary-orange rounded-2xl p-12 sm:p-14">
  //           <div className="bg-secondary-1 rounded-full p-7 sm:p-8 inline-flex mb-6">
  //             <img src="/images/img_image_black_900.svg" alt="appointment" className="w-14 sm:w-15 h-14 sm:h-15" />
  //           </div>
  //           <h3 className="text-primary-1 text-xl font-semibold font-poppins mb-3 sm:mb-4">
  //             Book An Appointment
  //           </h3>
  //           <div className="text-primary-1 text-base font-inter mb-5 sm:mb-6 space-y-0.5">
  //             <p>Make an appointment with us at</p>
  //             <p>the nearest facility help to</p>
  //             <p>directly examine your health.</p>
  //           </div>
  //           <Button 
  //             variant="primary"
  //             className="bg-primary-blue text-white-1 text-sm font-semibold font-poppins"
  //             rightImage={{ src: "/images/img_image.svg", width: 18, height: 12 }}
  //           >
  //             Book An Appointment
  //           </Button>
  //         </div>
  //       </div>

  //       {/* Contact Form Section */}
  //       <div className="mb-1.5">
  //         <div className="text-center mb-8 sm:mb-9 px-4 sm:px-14">
  //           <div className="flex items-center justify-center gap-2.5 mb-2">
  //             <div className="bg-primary-accent w-2 h-2 rounded"></div>
  //             <span className="text-primary-accent text-base font-medium font-inter">Get In Touch</span>
  //             <div className="bg-primary-accent w-2 h-2 rounded"></div>
  //           </div>
  //           <h2 className="text-primary-1 text-2xl sm:text-3xl lg:text-4xl font-semibold font-poppins">
  //             Do not Hesitate To Contact Us
  //           </h2>
  //         </div>

  //         <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-0 ml-10 sm:ml-11">
  //           {/* Contact Form */}
  //           <div className="w-full lg:w-3/5 px-2">
  //             <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
  //               {/* Name and Email Row */}
  //               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
  //                 <EditText
  //                   placeholder="Name"
  //                   value={formData.name}
  //                   onChange={(e) => handleInputChange('name', e.target.value)}
  //                 />
  //                 <EditText
  //                   placeholder="Email"
  //                   type="email"
  //                   value={formData.email}
  //                   onChange={(e) => handleInputChange('email', e.target.value)}
  //                 />
  //               </div>

  //               {/* Phone and Subject Row */}
  //               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
  //                 <EditText
  //                   placeholder="Phone"
  //                   type="tel"
  //                   value={formData.phone}
  //                   onChange={(e) => handleInputChange('phone', e.target.value)}
  //                 />
  //                 <EditText
  //                   placeholder="Subject"
  //                   value={formData.subject}
  //                   onChange={(e) => handleInputChange('subject', e.target.value)}
  //                 />
  //               </div>

  //               {/* Message */}
  //               <TextArea
  //                 placeholder="Write A Message"
  //                 rows={8}
  //                 value={formData.message}
  //                 onChange={(e) => handleInputChange('message', e.target.value)}
  //               />

  //               {/* Agreement Checkbox */}
  //               <div className="flex items-center gap-3.5">
  //                 <div 
  //                   className={`w-5 h-5 border border-primary-1/20 rounded cursor-pointer ${
  //                     agreed ? 'bg-primary-accent border-primary-accent' : 'bg-transparent'
  //                   }`}
  //                   onClick={() => setAgreed(!agreed)}
  //                 ></div>
  //                 <div className="text-primary-1 text-base font-inter">
  //                   <span>I agree to the </span>
  //                   <a href="#" className="text-primary-blue">Privacy Policy</a>
  //                   <span> and </span>
  //                   <a href="#" className="text-primary-blue">Terms & Conditions</a>
  //                 </div>
  //               </div>

  //               {/* Submit Button */}
  //               <Button 
  //                 type="submit"
  //                 variant="primary"
  //                 className="bg-primary-accent text-white-1 text-sm font-semibold font-poppins"
  //                 rightImage={{ src: "/images/img_image.svg", width: 18, height: 12 }}
  //               >
  //                 Send Message
  //               </Button>
  //             </form>
  //           </div>

  //           {/* Map Section */}
  //           <div className="w-full lg:w-2/5 lg:ml-2.5">
  //             <div className="relative bg-gray-1 rounded-2xl overflow-hidden" style={{ height: '576px' }}>
  //               {/* Map iframe */}
  //               <iframe
  //                 title="Location Map"
  //                 src="https://www.openstreetmap.org/export/embed.html?bbox=77.0266%2C28.4089%2C77.0866%2C28.4689&layer=mapnik&marker=28.4389%2C77.0566"
  //                 className="w-full h-full border-0"
  //                 allowFullScreen
  //                 loading="lazy"
  //               />
                
  //               {/* Map overlay info */}
  //               <div className="absolute top-2.5 left-2.5 right-1">
  //                 <div className="bg-secondary-1 rounded-sm p-2 shadow-lg max-w-xs">
  //                   <div className="flex justify-between items-start mb-1">
  //                     <span className="text-primary-1 text-sm font-medium font-roboto">Gurugram</span>
  //                     <img src="/images/img_div_icon.png" alt="icon" className="w-5 h-5 mr-5" />
  //                   </div>
  //                   <div className="flex items-start gap-2 mb-3">
  //                     <span className="text-primary-1 text-xs font-poppins">Innov8 Orchid Center India, 122001</span>
  //                     <span className="text-blue-1 text-xs font-roboto mt-1">Directions</span>
  //                   </div>
  //                   <span className="text-blue-1 text-xs font-roboto">View larger map</span>
  //                 </div>
  //               </div>

  //               {/* Bottom attribution */}
  //               <div className="absolute bottom-0 left-2 right-0">
  //                 <div className="flex items-center gap-2 mb-2.5">
  //                   <div className="bg-secondary-1 border-2 border-white-1 rounded p-0.5 shadow-lg">
  //                     <div className="relative w-9 h-9">
  //                       <div className="bg-secondary-beige w-full h-full"></div>
  //                       <img src="/images/img_image_256x256.png" alt="location" className="absolute -top-4 -left-4 w-64 h-64" />
  //                     </div>
  //                   </div>
  //                   <div className="flex items-center gap-2.5 text-xs font-roboto text-primary-1">
  //                     <span>Keyboard shortcuts</span>
  //                     <span>Map data ©2025 Google</span>
  //                     <span>Terms</span>
  //                     <span>Report a map error</span>
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>

  //     {/* Online Consultation Banner */}
  //     <div className="px-4 sm:px-80 mb-60 sm:mb-64">
  //       <div className="flex items-center justify-start overflow-x-auto">
  //         <div className="flex items-center gap-8 sm:gap-9 min-w-max px-11">
  //           <img src="/images/img_clip_path_group_red_400.svg" alt="heart" className="w-11 h-11 mb-10" />
  //           <span className="text-white-1 text-4xl sm:text-5xl lg:text-7xl font-semibold font-poppins">
  //             Online Consultation
  //           </span>
  //           <div className="flex items-center gap-4">
  //             <img src="/images/img_background_image.svg" alt="icon" className="w-11 h-11" />
  //             <img src="/images/img_clip_path_group_red_400.svg" alt="heart" className="w-11 h-11" />
  //             <img src="/images/img_clip_path_group_red_400.svg" alt="heart" className="w-11 h-11" />
  //             <img src="/images/img_clip_path_group_red_400.svg" alt="heart" className="w-11 h-11" />
  //           </div>
  //         </div>
  //       </div>
  //     </div>

    
  //   </div>
  <>

       <PageHeader title={title} routes={routes} />
  </>
  )
}

export default Contact