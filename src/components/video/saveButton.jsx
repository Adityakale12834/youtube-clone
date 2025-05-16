// components/SaveButton.js
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addVideo, removeVideo } from "../store/slices/savedVideosSlice";
import { MdPlaylistAdd } from "react-icons/md";

const SaveButton = ({ video }) => {
  const dispatch = useDispatch();
  const savedVideos = useSelector((state) => state.savedVideos);
  const [isSaved, setIsSaved] = useState(
    savedVideos.some((v) => v.id === video.id)
  );

  const handleSave = () => {
    if (isSaved) {
      dispatch(removeVideo(video.id));
    } else {
      console.log(video);
      dispatch(addVideo(video));
    }
    setIsSaved(!isSaved);
  };

  return (
    <button
      onClick={handleSave}
      className={`flex items-center px-3 py-1 rounded-full ${
        isSaved ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 "
      }`}
    >
      <MdPlaylistAdd className="mr-2" />
      {isSaved ? "Saved" : "Save"}
    </button>
  );
};

export default SaveButton;
