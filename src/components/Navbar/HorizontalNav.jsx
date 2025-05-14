import { useState, useRef, useEffect } from "react";
import {
  FaSearch,
  FaMicrophone,
  FaVideo,
  FaBell,
  FaBars,
} from "react-icons/fa";
import { MdApps } from "react-icons/md";

const YouTubeNavbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const searchRef = useRef(null);

  // Handle click outside search bar on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showMobileSearch &&
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setShowMobileSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMobileSearch]);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm w-screen">
      <div className="flex items-center justify-between h-14 px-4 md:px-6">
        {/* Left section - Logo and menu */}
        <div className="flex items-center space-x-4 md:space-x-6">
          <button className="p-2 rounded-full hover:bg-gray-200">
            <FaBars className="text-lg" />
          </button>
          <div className="flex items-center">
            <img
              src="https://www.gstatic.com/youtube/img/branding/youtubelogo/svg/youtubelogo.svg"
              alt="YouTube Logo"
              className="h-6"
            />
          </div>
        </div>

        {/* Center section - Search bar (desktop) */}
        <div
          className={`hidden md:flex items-center justify-center flex-1 max-w-2xl mx-4`}
        >
          <div className="relative flex w-full">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none focus:border-blue-500"
            />
            <button className="px-5 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-full hover:bg-gray-200">
              <FaSearch className="text-gray-600" />
            </button>
          </div>
          <button className="p-2 ml-2 rounded-full bg-gray-100 hover:bg-gray-200">
            <FaMicrophone className="text-gray-600" />
          </button>
        </div>

        {/* Mobile search toggle button */}
        <button
          className="md:hidden p-2 rounded-full hover:bg-gray-200"
          onClick={() => setShowMobileSearch(true)}
        >
          <FaSearch className="text-lg" />
        </button>

        {/* Right section - Icons */}
        <div className="flex items-center space-x-3 md:space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-200 hidden md:block">
            <FaVideo className="text-lg" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-200 hidden md:block">
            <MdApps className="text-lg" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-200">
            <FaBell className="text-lg" />
          </button>
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white cursor-pointer">
            <span className="text-sm font-medium">U</span>
          </div>
        </div>
      </div>

      {/* Mobile search bar (appears when search icon is clicked) */}
      {showMobileSearch && (
        <div
          ref={searchRef}
          className="md:hidden flex items-center p-2 bg-white border-t"
        >
          <button
            className="p-2 mr-2 rounded-full hover:bg-gray-200"
            onClick={() => setShowMobileSearch(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <div className="relative flex flex-1">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none focus:border-blue-500"
            />
            <button className="px-4 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-full hover:bg-gray-200">
              <FaSearch className="text-gray-600" />
            </button>
          </div>
          <button className="p-2 ml-2 rounded-full bg-gray-100 hover:bg-gray-200">
            <FaMicrophone className="text-gray-600" />
          </button>
        </div>
      )}
    </header>
  );
};

export default YouTubeNavbar;
