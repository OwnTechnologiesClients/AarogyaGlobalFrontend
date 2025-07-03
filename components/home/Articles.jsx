import React from "react";

const articles = [
  { title: "Tips For Orthopedic Surgery Recovery", img: "/article1.png", author: "Dr. A. Kumar", date: "June 2025" },
  { title: "Transplantation Strategy & Heart Surgery", img: "/article2.png", author: "Dr. S. Mehta", date: "June 2025" },
  { title: "Old Yet Essential: The Stethoscope", img: "/article3.png", author: "Dr. R. Singh", date: "June 2025" },
];

const Articles = () => (

    <section className="w-full flex flex-col items-center">
      <h3 className="text-xl font-bold mb-6">Read Our Latest Insights & Articles</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
        {articles.map((a, idx) => (
          <div key={idx} className="flex flex-col bg-white rounded-xl p-6 shadow">
            <img src={a.img} alt={a.title} className="w-full h-40 rounded-xl object-cover mb-4" />
            <span className="font-semibold text-lg mb-1">{a.title}</span>
            <span className="text-gray-500 text-sm mb-2">By {a.author} | {a.date}</span>
            <button className="bg-[#04CE78] text-white px-4 py-2 rounded-lg font-semibold mt-2">Read More</button>
          </div>
        ))}
      </div>
    </section>

);

export default Articles;
