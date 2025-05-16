import { useState } from "react";
import {
  FaHome,
  FaCompass,
  FaYoutube,
  FaHistory,
  FaThumbsUp,
  FaBars,
} from "react-icons/fa";
import { MdSubscriptions, MdVideoLibrary, MdWatchLater } from "react-icons/md";
import { SiYoutubemusic, SiYoutubegaming } from "react-icons/si";
import { IoMdSettings } from "react-icons/io";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const YouTubeVerticalNav = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const subscriber = useSelector((state) => state.subscriber);

  const toggleNavbar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      <div
        className={`h-screen bg-white fixed left-0 top-0 pt-13 overflow-y-scroll transition-all duration-300 ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Header with toggle button */}
        {/* <div className="flex items-center p-4 sticky top-0 bg-white w-full">
          <button
            onClick={toggleNavbar}
            className="p-2 rounded-full hover:bg-gray-200"
          >
            <FaBars className="text-xl" />
          </button>
          {!isCollapsed && (
            <img
              className="w-30 ml-6"
              src="https://www.gstatic.com/youtube/img/branding/youtubelogo/svg/youtubelogo.svg"
              alt="YouTube Logo"
            />
          )}
        </div> */}
        {/* Main Navigation */}
        <div className="py-2">
          <NavItem
            icon={<FaHome className="text-xl" />}
            text="Home"
            active
            isCollapsed={isCollapsed}
            route="/"
          />
          <NavItem
            icon={<FaCompass className="text-xl" />}
            text="Explore"
            isCollapsed={isCollapsed}
            route="/explore"
          />
          <NavItem
            icon={<FaYoutube className="text-xl text-red-600" />}
            text="Shorts"
            isCollapsed={isCollapsed}
          />
          <NavItem
            icon={<MdSubscriptions className="text-xl" />}
            text="Subscriptions"
            isCollapsed={isCollapsed}
          />
          <NavItem
            icon={<SiYoutubegaming className="text-xl" />}
            text="Gaming"
            isCollapsed={isCollapsed}
            route="/gaming"
          />
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-2"></div>

        {/* You Section */}
        <div className="py-2">
          {!isCollapsed && (
            <h3 className="px-6 py-1 text-sm font-medium text-gray-500">You</h3>
          )}
          <NavItem
            icon={<MdVideoLibrary className="text-xl" />}
            text="Library"
            isCollapsed={isCollapsed}
          />
          <NavItem
            icon={<FaHistory className="text-xl" />}
            text="History"
            isCollapsed={isCollapsed}
            route="/history"
          />
          <NavItem
            icon={<MdWatchLater className="text-xl" />}
            text="Watch later"
            isCollapsed={isCollapsed}
            route="/saved"
          />
          <NavItem
            icon={<FaThumbsUp className="text-xl" />}
            text="Liked videos"
            isCollapsed={isCollapsed}
          />
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-2"></div>

        {/* Subscriptions Section */}
        <div className="py-2">
          {!isCollapsed && (
            <h3 className="px-6 py-1 text-sm font-medium text-gray-500">
              Subscriptions
            </h3>
          )}
          {subscriber.map((channel) => {
            return (
              <NavItem
                key={channel.id}
                image={channel.image}
                text={channel.name}
                isCollapsed={isCollapsed}
              />
            );
          })}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-2"></div>

        {/* Explore Section */}
        <div className="py-2">
          {!isCollapsed && (
            <h3 className="px-6 py-1 text-sm font-medium text-gray-500">
              Explore
            </h3>
          )}
          <NavItem
            icon={<SiYoutubemusic className="text-xl" />}
            text="Music"
            isCollapsed={isCollapsed}
          />
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-2"></div>

        {/* Settings */}
        <div className="py-2">
          <NavItem
            icon={<IoMdSettings className="text-xl" />}
            text="Settings"
            isCollapsed={isCollapsed}
          />
        </div>
      </div>
    </>
  );
};

const NavItem = ({ icon, text, active = false, image, isCollapsed, route }) => {
  return (
    <Link to={route}>
      <div
        className={`flex items-center px-6 py-3 cursor-pointer hover:bg-gray-100 ${
          active ? "bg-gray-100 font-medium" : ""
        } ${isCollapsed ? "justify-center" : ""}`}
        title={isCollapsed ? text : ""} // Show tooltip when collapsed
      >
        {image ? (
          <img
            src={image}
            alt={text}
            className={`rounded-full ${
              isCollapsed ? "w-6 h-6" : "w-6 h-6 mr-6"
            }`}
          />
        ) : (
          <span className={isCollapsed ? "" : "mr-6"}>{icon}</span>
        )}
        {!isCollapsed && <span>{text}</span>}
      </div>
    </Link>
  );
};

export default YouTubeVerticalNav;
