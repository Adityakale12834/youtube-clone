import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaSearch,
  FaMicrophone,
  FaVideo,
  FaBell,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { MdApps } from "react-icons/md";
import { searchVideos } from "../store/slices/videoSlice";
import { Link, useNavigate } from "react-router-dom";

const YouTubeNavbar = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.videos);
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

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

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    dispatch(searchVideos(searchQuery));
    navigate(`/search/${searchQuery}`);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm w-screen">
      <div className="flex items-center justify-between h-14 px-4 md:px-6">
        {/* Left section - Logo and menu */}
        <div className="flex items-center space-x-4 md:space-x-6">
          <button className="p-2 rounded-full hover:bg-gray-200">
            <FaBars className="text-lg" />
          </button>
          <Link to="/">
            <div className="flex items-center">
              <img
                src="https://www.gstatic.com/youtube/img/branding/youtubelogo/svg/youtubelogo.svg"
                alt="YouTube Logo"
                className="h-6"
              />
            </div>
          </Link>
        </div>

        {/* Center section - Search bar (desktop) */}
        <form
          onSubmit={handleSearch}
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
            {searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-12 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-200 mr-4"
              >
                <FaTimes className="text-gray-500" />
              </button>
            )}
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-full hover:bg-gray-200 disabled:opacity-50"
            >
              <FaSearch className="text-gray-600" />
            </button>
          </div>
          <button
            type="button"
            className="p-2 ml-2 rounded-full bg-gray-100 hover:bg-gray-200"
          >
            <FaMicrophone className="text-gray-600" />
          </button>
        </form>

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
        <form
          onSubmit={handleSearch}
          ref={searchRef}
          className="md:hidden flex items-center p-2 bg-white border-t"
        >
          <button
            type="button"
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
            {searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-12 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-200"
              >
                <FaTimes className="text-gray-500" />
              </button>
            )}
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-full hover:bg-gray-200 disabled:opacity-50"
            >
              <FaSearch className="text-gray-600" />
            </button>
          </div>
          <button
            type="button"
            className="p-2 ml-2 rounded-full bg-gray-100 hover:bg-gray-200"
          >
            <FaMicrophone className="text-gray-600" />
          </button>
        </form>
      )}
    </header>
  );
};

export default YouTubeNavbar;
