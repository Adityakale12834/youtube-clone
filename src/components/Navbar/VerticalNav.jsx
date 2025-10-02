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
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const YouTubeVerticalNav = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const subscriber = useSelector((state) => state.subscriber);
  const location = useLocation();

  const toggleNavbar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const isActive = (route) => {
    return location.pathname === route;
  };

  return (
    <>
      <div
        className={`h-screen bg-white fixed left-0 top-0 pt-13 overflow-y-scroll transition-all duration-300 ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Main Navigation */}
        <div className="py-2">
          <NavItem
            icon={<FaHome className="text-xl" />}
            text="Home"
            active={isActive("/")}
            isCollapsed={isCollapsed}
            route="/"
          />
          <NavItem
            icon={<FaCompass className="text-xl" />}
            text="Explore"
            active={isActive("/explore")}
            isCollapsed={isCollapsed}
            route="/explore"
          />
          {/* <NavItem
            icon={<FaYoutube className="text-xl text-red-600" />}
            text="Shorts"
            active={isActive("/shorts")}
            isCollapsed={isCollapsed}
            route="/shorts"
          />
          <NavItem
            icon={<MdSubscriptions className="text-xl" />}
            text="Subscriptions"
            active={isActive("/subscriptions")}
            isCollapsed={isCollapsed}
            route="/subscriptions"
          /> */}
          <NavItem
            icon={<SiYoutubegaming className="text-xl" />}
            text="Gaming"
            active={isActive("/gaming")}
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
          {/* <NavItem
            icon={<MdVideoLibrary className="text-xl" />}
            text="Library"
            active={isActive("/library")}
            isCollapsed={isCollapsed}
            route="/library"
          /> */}
          <NavItem
            icon={<FaHistory className="text-xl" />}
            text="History"
            active={isActive("/history")}
            isCollapsed={isCollapsed}
            route="/history"
          />
          <NavItem
            icon={<MdWatchLater className="text-xl" />}
            text="Saved Video"
            active={isActive("/saved")}
            isCollapsed={isCollapsed}
            route="/saved"
          />
          <NavItem
            icon={<FaThumbsUp className="text-xl" />}
            text="Liked videos"
            active={isActive("/liked-videos")}
            isCollapsed={isCollapsed}
            route="/liked-videos"
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
                active={isActive(`/channel/${channel.id}`)}
                isCollapsed={isCollapsed}
                route={`/channel/${channel.id}`}
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
            active={isActive("/music")}
            isCollapsed={isCollapsed}
            route="/music"
          />
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-2"></div>

        {/* Settings */}
        <div className="py-2">
          <NavItem
            icon={<IoMdSettings className="text-xl" />}
            text="Settings"
            active={isActive("/settings")}
            isCollapsed={isCollapsed}
            route="/settings"
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
        title={isCollapsed ? text : ""}
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
