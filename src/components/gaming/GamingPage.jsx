import { useState, useEffect } from "react";
import { fetchGamingVideos } from "../api/api";
import VideoCard from "../HomePage/VideoCard";

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

const GamingPage = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchGamingVideos();
        // Add default channel info if missing
        const videosWithChannel = data.videos.map((video) => ({
          ...video,
          channel: video.channel || {
            name: "Gaming Channel",
            profile_image_url:
              "https://assets.ccbp.in/frontend/react-js/nxt-watch/gaming-icon.png",
          },
        }));
        setGames(videosWithChannel);
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
        <h1 className="text-2xl font-bold mb-6">Gaming Videos</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <SkeletonVideoCard key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto px-4 py-6 ml-64">
        <h1 className="text-2xl font-bold mb-6">Gaming Videos</h1>
        <div className="text-center py-8 text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="mx-auto px-4 py-6 ml-64">
      <h1 className="text-2xl font-bold mb-6">Gaming Videos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {games.map((game) => (
          <VideoCard key={game.id} video={game} />
        ))}
      </div>
    </div>
  );
};

export default GamingPage;
