import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";

const VideoCard = ({ video }) => {
  const navigate = useNavigate();

  // Format view count (e.g., 1.4K -> 1.4K views)
  const formatViews = (views) => {
    if (views.includes("K")) return `${views} views`;
    if (views.includes("M")) return `${views} views`;
    return `${views} views`;
  };

  // Format published date (e.g., "Apr 19, 2019" -> "4 years ago")
  const formatDate = (dateString) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch {
      return dateString;
    }
  };

  const handleClick = () => {
    // Navigate to the video page with the video ID
    navigate(`/video/${video.id}`);
  };

  return (
    <div className="w-full cursor-pointer" onClick={handleClick}>
      {/* Thumbnail */}
      <div className="relative w-full pb-[56.25%] rounded-xl overflow-hidden bg-gray-200">
        <img
          src={video.thumbnail_url}
          alt={video.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Duration badge would go here if available */}
      </div>

      {/* Video info */}
      <div className="flex mt-3">
        {/* Channel icon */}
        <div className="flex-shrink-0 mr-3">
          <img
            src={video.channel.profile_image_url}
            alt={video.channel.name}
            className="w-9 h-9 rounded-full"
          />
        </div>

        {/* Video details */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
            {video.title}
          </h3>
          <p className="text-xs text-gray-600 mt-1">{video.channel.name}</p>
          <div className="flex text-xs text-gray-600">
            <span>{formatViews(video.view_count)}</span>
            <span className="mx-1">•</span>
            <span>{formatDate(video.published_at)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
