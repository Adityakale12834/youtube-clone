// src/pages/LibraryPage.js
import { useEffect } from "react";
import { useSelector } from "react-redux";
import VideoCard from "../HomePage/VideoCard"; // Fixed import path

const SkeletonVideoCard = () => (
  <div className="animate-pulse">
    <div className="bg-gray-300 rounded-lg h-40 w-full mb-2"></div>
    <div className="flex space-x-2">
      <div className="bg-gray-300 rounded-full h-8 w-8"></div>
      <div className="flex-1">
        <div className="bg-gray-300 h-4 w-3/4 mb-2 rounded"></div>
        <div className="bg-gray-300 h-3 w-1/2 rounded"></div>
      </div>
    </div>
  </div>
);

const LibraryPage = () => {
  const libraryVideos = useSelector((state) => state.library || []);
  const loading = false; // Set based on your actual loading state
  const error = null; // Set based on your actual error state

  // No need for useEffect if you're just using Redux state
  // Library data should be managed completely by Redux

  if (loading) {
    return (
      <div className="mx-auto px-4 py-6 ml-64">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 12 }).map((_, index) => (
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
      {/* <h1 className="text-2xl font-bold mb-6">Your Library</h1> */}
      {libraryVideos.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Your library is empty</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {libraryVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LibraryPage;
