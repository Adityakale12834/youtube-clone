import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { searchVideos } from "../api/api";

const SearchPage = () => {
  const { searchQuery: urlQuery } = useParams();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      if (!urlQuery) return;

      try {
        setLoading(true);
        setError(null);
        const response = await searchVideos(urlQuery);
        setVideos(response.videos);
      } catch (err) {
        setError("Failed to fetch videos");
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [urlQuery]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-3">Searching videos...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-red-500 text-lg mb-4">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Retry Search
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ml-64">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Search Results for:{" "}
            <span className="text-blue-600">"{urlQuery}"</span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {videos.length} {videos.length === 1 ? "result" : "results"} found
          </p>
        </div>

        {videos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {videos.map((video) => (
              <div
                key={video.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
              >
                <div className="relative pt-[56.25%] overflow-hidden">
                  <img
                    src={video.thumbnail_url}
                    alt={video.title}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://via.placeholder.com/320x180";
                    }}
                  />
                </div>

                <div className="p-4 flex-grow flex flex-col">
                  <h3 className="text-md font-semibold text-gray-900 line-clamp-2 mb-2">
                    {video.title}
                  </h3>

                  <div className="flex items-center mt-auto">
                    <img
                      src={video.channel.profile_image_url}
                      alt={video.channel.name}
                      className="w-8 h-8 rounded-full mr-2"
                      onError={(e) => {
                        e.currentTarget.src = "https://via.placeholder.com/40";
                      }}
                    />
                    <div className="text-sm text-gray-600">
                      <p className="font-medium">{video.channel.name}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <span>{video.view_count} views</span>
                        <span className="mx-1">•</span>
                        <span>
                          {formatDistanceToNow(new Date(video.published_at), {
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
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
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900">
              No videos found
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Try different keywords or check your spelling
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
