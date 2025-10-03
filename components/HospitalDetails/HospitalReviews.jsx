"use client";
import React, { useState } from 'react';
import {
  Star,
  ThumbsUp,
  MessageCircle,
  Filter,
  Calendar,
  User,
  CheckCircle,
  TrendingUp
} from 'lucide-react';

const HospitalReviews = ({ hospital }) => {
  const [selectedRating, setSelectedRating] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  const ratingFilters = ["All", "5 Stars", "4 Stars", "3 Stars", "2 Stars", "1 Star"];
  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "highest", label: "Highest Rating" },
    { value: "lowest", label: "Lowest Rating" }
  ];

  // Get rating from hospital data
  const hospitalRating = parseFloat(
    typeof hospital?.rating === 'object' 
      ? (hospital.rating?.userScore || hospital.rating?.googleRating || '0')
      : (hospital?.rating || '0')
  );
  const totalReviews = hospital?.reviews?.[0]?.comment?.match(/\d+/)?.[0] || '0';

  const overallRating = {
    average: hospitalRating,
    totalReviews: parseInt(totalReviews),
    distribution: {
      5: Math.floor(parseInt(totalReviews) * 0.6),
      4: Math.floor(parseInt(totalReviews) * 0.25),
      3: Math.floor(parseInt(totalReviews) * 0.1),
      2: Math.floor(parseInt(totalReviews) * 0.03),
      1: Math.floor(parseInt(totalReviews) * 0.02)
    }
  };

  // No hardcoded reviews; rely on hospital.reviews if present
  const reviews = Array.isArray(hospital?.reviews) ? hospital.reviews : [];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${index < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
          }`}
      />
    ));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Patient Reviews</h2>
        <p className="text-gray-600 text-lg">
          Read what our patients have to say about their experience at our hospital.
        </p>
      </div>

      {/* Overall Rating Summary */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Rating Overview */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
              <div className="text-5xl font-bold text-gray-800">{overallRating.average}</div>
              <div>
                <div className="flex items-center gap-1 mb-1">
                  {renderStars(Math.round(overallRating.average))}
                </div>
                <div className="text-gray-600">Based on {overallRating.totalReviews.toLocaleString()} reviews</div>
              </div>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-2 text-[#04CE78]">
              <TrendingUp className="w-5 h-5" />
              <span className="font-medium">Excellent rating</span>
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((stars) => (
              <div key={stars} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-16">
                  <span className="text-sm font-medium">{stars}</span>
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-[#04CE78] h-2 rounded-full"
                    style={{ width: `${overallRating.distribution[stars]}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 w-12">
                  {overallRating.distribution[stars]}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Rating Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={selectedRating}
              onChange={(e) => setSelectedRating(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04CE78] focus:border-transparent"
            >
              {ratingFilters.map(filter => (
                <option key={filter} value={filter}>{filter}</option>
              ))}
            </select>
          </div>

          {/* Sort Filter */}
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04CE78] focus:border-transparent"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6 mb-8">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            {/* Review Header */}
            <div className="flex items-start gap-4 mb-4">
              <img
                src={review.avatar}
                alt={review.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-bold text-gray-800">{review.name}</h4>
                  {review.verified && (
                    <CheckCircle className="w-4 h-4 text-[#04CE78]" />
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(review.date)}</span>
                  </div>
                  <span>•</span>
                  <span>{review.department}</span>
                  <span>•</span>
                  <span>{review.doctor}</span>
                </div>
                <div className="flex items-center gap-1">
                  {renderStars(review.rating)}
                </div>
              </div>
            </div>

            {/* Review Content */}
            <div className="mb-4">
              <h5 className="font-semibold text-gray-800 mb-2">{review.title}</h5>
              <p className="text-gray-600 leading-relaxed">{review.review}</p>
            </div>

            {/* Review Images */}
            {review.images.length > 0 && (
              <div className="flex gap-2 mb-4">
                {review.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt="Review image"
                    className="w-20 h-16 object-cover rounded-lg"
                  />
                ))}
              </div>
            )}

            {/* Review Actions */}
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <button className="flex items-center gap-1 hover:text-[#04CE78] transition-colors">
                <ThumbsUp className="w-4 h-4" />
                <span>Helpful ({review.helpful})</span>
              </button>
              <button className="flex items-center gap-1 hover:text-[#04CE78] transition-colors">
                <MessageCircle className="w-4 h-4" />
                <span>Reply</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Write Review CTA */}
      <div className="bg-gradient-to-r from-[#04CE78] to-green-600 rounded-2xl p-8 text-white text-center">
        <h3 className="text-2xl font-bold mb-2">Share Your Experience</h3>
        <p className="text-green-100 mb-6">Help other patients by sharing your experience with our hospital.</p>
        <button className="bg-white text-[#04CE78] px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
          Write a Review
        </button>
      </div>
    </div>
  );
};

export default HospitalReviews;
