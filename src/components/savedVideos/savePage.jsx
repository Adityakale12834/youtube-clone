// src/pages/HomePage.js
import { useState, useEffect } from "react";
import { fetchHomeVideos } from "../api/api";
import VideoCard from "../HomePage/VideoCard";
import { useSelector } from "react-redux";

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

const SavedVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const savedVideos = useSelector((state) => state.savedVideos);
  console.log("Full Redux state:", savedVideos);

  useEffect(() => {
    const getData = async () => {
      try {
        // const data = await fetchHomeVideos("");
        setVideos(savedVideos);
        console.log(savedVideos);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  if (loading) {
    return (
      <div className="mx-auto px-4 py-6 ml-64">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Render 12 skeleton cards to mimic a typical YouTube grid */}
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default SavedVideos;
