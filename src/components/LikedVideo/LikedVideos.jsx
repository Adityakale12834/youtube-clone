// src/pages/LikedVideos.js
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import VideoCard from "../HomePage/VideoCard";

const SkeletonVideoCard = () => (
  <div className="animate-pulse">
    <div className="bg-gray-300 rounded-lg h-40 w-full mb-2"></div>{" "}
    {/* Thumbnail */}
    <div className="flex space-x-2">
      <div className="bg-gray-300 rounded-full h-8 w-8"></div>{" "}
      {/* Channel icon */}
      <div className="flex-1">
        <div className="bg-gray-300 h-4 w-3/4 mb-2 rounded"></div> {/* Title */}
        <div className="bg-gray-300 h-3 w-1/2 rounded"></div>{" "}
        {/* Channel name */}
      </div>
    </div>
  </div>
);

const LikedVideos = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const likedVideos = useSelector((state) => state.liked);
  console.log("Liked Videos:", likedVideos);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="mx-auto px-4 py-6 ml-64">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Render skeleton cards */}
          {Array.from({ length: 8 }).map((_, index) => (
            <SkeletonVideoCard key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="mx-auto px-4 py-6 ml-64">
      <h1 className="text-2xl font-bold mb-6">Liked Videos</h1>

      {likedVideos.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 text-gray-400 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900">
            No liked videos yet
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Videos you like will appear here
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {likedVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LikedVideos;
