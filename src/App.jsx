import "./App.css";
import YouTubeNavbar from "./components/Navbar/HorizontalNav";
import YouTubeVerticalNav from "./components/Navbar/VerticalNav";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage/Home";
import VideoPage from "./components/video/videoPage";
import Explore from "./components/explore/Explore";
import GamingPage from "./components/gaming/GamingPage";
import SavedVideos from "./components/savedVideos/savePage";
import LibraryPage from "./components/Library/LibraryPage";
// import ExplorePage from "./pages/ExplorePage";
// import ShortsPage from "./pages/ShortsPage";
// import SubscriptionsPage from "./pages/SubscriptionsPage";
// import LibraryPage from "./pages/LibraryPage";
// import HistoryPage from "./pages/HistoryPage";
// import WatchLaterPage from "./pages/WatchLaterPage";
// import LikedVideosPage from "./pages/LikedVideosPage";
// import MusicPage from "./pages/MusicPage";
// import GamingPage from "./pages/GamingPage";
// import SettingsPage from "./pages/SettingsPage";
// import ChannelPage from "./pages/ChannelPage";
// import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <>
      <YouTubeVerticalNav />
      <YouTubeNavbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/video/:videoId" element={<VideoPage />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/gaming" element={<GamingPage />} />
        <Route path="/saved" element={<SavedVideos />} />
        <Route path="/history" element={<LibraryPage />} />
        {/* <Route path="/shorts" element={<ShortsPage />} />
        <Route path="/subscriptions" element={<SubscriptionsPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/watch-later" element={<WatchLaterPage />} />
        <Route path="/liked-videos" element={<LikedVideosPage />} />
        <Route path="/music" element={<MusicPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/channel/:channelId" element={<ChannelPage />} />
        <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </>
  );
}

export default App;
