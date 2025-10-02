import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchVideoDetails } from "../api/api";
import {
  FaThumbsUp,
  FaThumbsDown,
  FaShare,
  FaEllipsisH,
  FaReply,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { MdPlaylistAdd, MdDownload } from "react-icons/md";
import SaveButton from "./saveButton";
import { useSelector, useDispatch } from "react-redux";
import { subscribe, unsubscribe } from "../store/slices/subscriberSlice";
import { addToLibrary } from "../store/slices/librarySlice";
import {
  likeVideo,
  unlikeVideo,
  toggleLikeVideo,
} from "../store/slices/likedSlice";

function VideoPage() {
  const { videoId } = useParams();
  const dispatch = useDispatch();
  const likedVideos = useSelector((state) => state.liked);
  const subscriber = useSelector((state) => state.subscriber);
  const library = useSelector((state) => state.library);
  console.log(likedVideos);
  console.log(videoId);
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [likeStatus, setLikeStatus] = useState(
    likedVideos.some((v) => v.id !== videoId)
  );
  const [showMoreDescription, setShowMoreDescription] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState("");
  const [editingReplyId, setEditingReplyId] = useState(null);
  const [editReplyText, setEditReplyText] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchVideoDetails(videoId);
        setVideoData(data.video_details);
        dispatch(addToLibrary(data.video_details));
        // Mock comments data - in a real app, you'd fetch these from an API
        setComments([
          {
            id: 1,
            user: {
              name: "Cricket Fan",
              avatar: "https://randomuser.me/api/portraits/men/1.jpg",
            },
            text: "Great match! The Blue Blasters were phenomenal.",
            timestamp: "2023-05-15T10:30:00",
            likes: 24,
            dislikes: 2,
            liked: false,
            disliked: false,
            replies: [
              {
                id: 101,
                user: {
                  name: "Sports Lover",
                  avatar: "https://randomuser.me/api/portraits/women/2.jpg",
                },
                text: "I agree! Their bowling was exceptional.",
                timestamp: "2023-05-15T11:45:00",
                likes: 5,
                dislikes: 0,
                liked: false,
                disliked: false,
              },
            ],
          },
          {
            id: 2,
            user: {
              name: "Sports Analyst",
              avatar: "https://randomuser.me/api/portraits/men/3.jpg",
            },
            text: "The Super Over was the most exciting part of the tournament.",
            timestamp: "2023-05-16T09:15:00",
            likes: 15,
            dislikes: 1,
            liked: false,
            disliked: false,
            replies: [],
          },
        ]);
        setLoading(false);
      } catch (e) {
        setError(e.message);
        setLoading(false);
      }
    };

    getData();
  }, [videoId]);

  const getYouTubeId = (url) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 2592000)
      return `${Math.floor(diffInSeconds / 86400)} days ago`;
    if (diffInSeconds < 31536000)
      return `${Math.floor(diffInSeconds / 2592000)} months ago`;
    return `${Math.floor(diffInSeconds / 31536000)} years ago`;
  };

  const formatViewCount = (count) => {
    if (!count) return "0 views";
    return count.includes("K") || count.includes("M")
      ? `${count} views`
      : `${count} views`;
  };

  const handleAddComment = () => {
    if (commentText.trim() === "") return;

    const newComment = {
      id: Date.now(),
      user: {
        name: "Current User",
        avatar: "https://randomuser.me/api/portraits/men/5.jpg",
      },
      text: commentText,
      timestamp: new Date().toISOString(),
      likes: 0,
      dislikes: 0,
      liked: false,
      disliked: false,
      replies: [],
    };

    setComments([newComment, ...comments]);
    setCommentText("");
  };

  const handleAddReply = (commentId) => {
    if (replyText.trim() === "") return;

    setComments(
      comments.map((comment) => {
        if (comment.id === commentId) {
          const newReply = {
            id: Date.now(),
            user: {
              name: "Current User",
              avatar: "https://randomuser.me/api/portraits/men/5.jpg",
            },
            text: replyText,
            timestamp: new Date().toISOString(),
            likes: 0,
            dislikes: 0,
            liked: false,
            disliked: false,
          };

          return {
            ...comment,
            replies: [...comment.replies, newReply],
          };
        }
        return comment;
      })
    );

    setReplyingTo(null);
    setReplyText("");
  };

  const handleLikeComment = (commentId, isReply = false, parentId = null) => {
    if (isReply) {
      setComments(
        comments.map((comment) => {
          if (comment.id === parentId) {
            return {
              ...comment,
              replies: comment.replies.map((reply) => {
                if (reply.id === commentId) {
                  const alreadyLiked = reply.liked;
                  const alreadyDisliked = reply.disliked;

                  return {
                    ...reply,
                    likes: alreadyLiked ? reply.likes - 1 : reply.likes + 1,
                    dislikes: alreadyDisliked
                      ? reply.dislikes - 1
                      : reply.dislikes,
                    liked: !alreadyLiked,
                    disliked: false,
                  };
                }
                return reply;
              }),
            };
          }
          return comment;
        })
      );
    } else {
      setComments(
        comments.map((comment) => {
          if (comment.id === commentId) {
            const alreadyLiked = comment.liked;
            const alreadyDisliked = comment.disliked;

            return {
              ...comment,
              likes: alreadyLiked ? comment.likes - 1 : comment.likes + 1,
              dislikes: alreadyDisliked
                ? comment.dislikes - 1
                : comment.dislikes,
              liked: !alreadyLiked,
              disliked: false,
            };
          }
          return comment;
        })
      );
    }
  };

  const handleDislikeComment = (
    commentId,
    isReply = false,
    parentId = null
  ) => {
    if (isReply) {
      setComments(
        comments.map((comment) => {
          if (comment.id === parentId) {
            return {
              ...comment,
              replies: comment.replies.map((reply) => {
                if (reply.id === commentId) {
                  const alreadyLiked = reply.liked;
                  const alreadyDisliked = reply.disliked;

                  return {
                    ...reply,
                    likes: alreadyLiked ? reply.likes - 1 : reply.likes,
                    dislikes: alreadyDisliked
                      ? reply.dislikes - 1
                      : reply.dislikes + 1,
                    liked: false,
                    disliked: !alreadyDisliked,
                  };
                }
                return reply;
              }),
            };
          }
          return comment;
        })
      );
    } else {
      setComments(
        comments.map((comment) => {
          if (comment.id === commentId) {
            const alreadyLiked = comment.liked;
            const alreadyDisliked = comment.disliked;

            return {
              ...comment,
              likes: alreadyLiked ? comment.likes - 1 : comment.likes,
              dislikes: alreadyDisliked
                ? comment.dislikes - 1
                : comment.dislikes + 1,
              liked: false,
              disliked: !alreadyDisliked,
            };
          }
          return comment;
        })
      );
    }
  };
  // Handler functions to add
  const handleEditComment = (commentId) => {
    const comment = comments.find((c) => c.id === commentId);
    setEditCommentText(comment.text);
    setEditingCommentId(commentId);
  };

  const handleSaveEdit = (commentId) => {
    // Update the comment in your state or make API call
    const updatedComments = comments.map((comment) =>
      comment.id === commentId ? { ...comment, text: editCommentText } : comment
    );
    setComments(updatedComments);
    setEditingCommentId(null);
  };

  const handleDeleteComment = (commentId) => {
    // Confirm deletion
    if (window.confirm("Are you sure you want to delete this comment?")) {
      // Remove the comment from your state or make API call
      const updatedComments = comments.filter(
        (comment) => comment.id !== commentId
      );
      setComments(updatedComments);
    }
  };

  const handleEditReply = (commentId, replyId) => {
    const comment = comments.find((c) => c.id === commentId);
    const reply = comment.replies.find((r) => r.id === replyId);
    setEditReplyText(reply.text);
    setEditingReplyId(replyId);
  };

  const handleSaveReplyEdit = (commentId, replyId) => {
    // Update the reply in your state or make API call
    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: comment.replies.map((reply) =>
            reply.id === replyId ? { ...reply, text: editReplyText } : reply
          ),
        };
      }
      return comment;
    });
    setComments(updatedComments);
    setEditingReplyId(null);
  };

  const handleDeleteReply = (commentId, replyId) => {
    if (window.confirm("Are you sure you want to delete this reply?")) {
      // Remove the reply from your state or make API call
      const updatedComments = comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: comment.replies.filter((reply) => reply.id !== replyId),
          };
        }
        return comment;
      });
      setComments(updatedComments);
    }
  };

  const handleChangeSub = (videoInfo) => {
    if (isSubscribed) {
      dispatch(unsubscribe(videoInfo.id));
    } else {
      dispatch(
        subscribe({
          name: videoInfo.channel.name,
          id: videoInfo.id,
          image: videoInfo.channel.profile_image_url,
        })
      );
    }
    setIsSubscribed(!isSubscribed);
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;
  if (!videoData) return <div className="p-4">No video data found</div>;

  const youtubeId = getYouTubeId(videoData.video_url);

  return (
    <div className="flex min-h-screen bg-[#f9f9f9] mt-1">
      {/* Main Content */}
      {/* <div className="ml-70 w-4/5 p-8"> */}
      {/* Video Player and other existing sections... */}

      <div className="ml-70 w-4/5 p-8">
        {/* Video Player */}
        {youtubeId && (
          <div className="mb-8">
            <div className="relative w-full pb-[56.25%] bg-black rounded-xl overflow-hidden">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
                title={videoData.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}

        {/* Video Title */}
        <h1 className="text-2xl font-bold mb-4">{videoData.title}</h1>

        {/* Video Actions */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <span className="text-gray-600 mr-4">
              {formatViewCount(videoData.view_count)} •{" "}
              {formatDate(videoData.published_at)}
            </span>
            <div className="flex space-x-2">
              <button
                className={`flex items-center px-3 py-1 rounded-full ${
                  likeStatus === "like"
                    ? "bg-blue-100 text-blue-600"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                onClick={() => {
                  setLikeStatus(likeStatus === "like" ? null : "like");
                  dispatch(likeVideo(videoData));
                }}
              >
                <FaThumbsUp className="mr-2" />
                <span>Like</span>
              </button>
              <button
                className={`flex items-center px-3 py-1 rounded-full ${
                  likeStatus === "dislike"
                    ? "bg-blue-100 text-blue-600"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                onClick={() => {
                  setLikeStatus(likeStatus === "dislike" ? null : "dislike");
                  dispatch(unlikeVideo(videoData));
                }}
              >
                <FaThumbsDown className="mr-2" />
              </button>
              <button className="flex items-center px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200">
                <FaShare className="mr-2" />
                <span>Share</span>
              </button>
              <button className="flex items-center px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200">
                <MdDownload className="mr-2" />
                <span>Download</span>
              </button>
              <button className="">
                <SaveButton video={videoData} />
              </button>
              <button className="flex items-center p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                <FaEllipsisH />
              </button>
            </div>
          </div>
        </div>

        {/* Channel Info and Subscribe */}
        <div className="flex justify-between items-center mb-6 p-4 border-t border-b border-gray-200">
          <div className="flex items-center">
            <img
              src={videoData.channel.profile_image_url}
              alt={videoData.channel.name}
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <h3 className="font-medium">{videoData.channel.name}</h3>
              <p className="text-sm text-gray-600">
                {videoData.channel.subscriber_count} subscribers
              </p>
            </div>
          </div>
          <button
            className={`px-4 py-2 rounded-full font-medium ${
              isSubscribed
                ? "bg-gray-200 text-black"
                : "bg-red-600 text-white hover:bg-red-700"
            }`}
            onClick={() => {
              setIsSubscribed(!isSubscribed);
              handleChangeSub(videoData);
            }}
          >
            {isSubscribed ? "Subscribed" : "Subscribe"}
          </button>
        </div>

        {/* Video Description */}
        <div className="bg-white p-4 rounded-lg mb-8">
          <div className="flex items-center mb-2 text-sm text-gray-600">
            <span>{formatViewCount(videoData.view_count)} views</span>
            <span className="mx-2">•</span>
            <span>{formatDate(videoData.published_at)}</span>
          </div>
          <p
            className={`text-gray-800 ${
              !showMoreDescription && "line-clamp-3"
            }`}
          >
            {videoData.description}
          </p>
          {!showMoreDescription && (
            <button
              className="text-blue-600 font-medium mt-2"
              onClick={() => setShowMoreDescription(true)}
            >
              Show more
            </button>
          )}
          {showMoreDescription && (
            <button
              className="text-blue-600 font-medium mt-2"
              onClick={() => setShowMoreDescription(false)}
            >
              Show less
            </button>
          )}
        </div>

        {/* Comments Section */}
        <div className="bg-white p-4 rounded-lg mb-8">
          <h3 className="text-xl font-semibold mb-6">
            {comments.length} Comments
          </h3>

          {/* Add Comment (unchanged) */}
          <div className="flex mb-6">
            <img
              src="https://randomuser.me/api/portraits/men/5.jpg"
              alt="User"
              className="w-10 h-10 rounded-full mr-3"
            />
            <div className="flex-1">
              <input
                type="text"
                placeholder="Add a comment..."
                className="w-full border-b border-gray-300 pb-2 focus:outline-none focus:border-blue-500"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddComment()}
              />
              <div className="flex justify-end mt-2">
                <button
                  className="px-4 py-1 bg-gray-200 rounded-full mr-2 hover:bg-gray-300"
                  onClick={() => setCommentText("")}
                >
                  Cancel
                </button>
                <button
                  className={`px-4 py-1 rounded-full ${
                    commentText.trim()
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
                  onClick={handleAddComment}
                  disabled={!commentText.trim()}
                >
                  Comment
                </button>
              </div>
            </div>
          </div>

          {/* Comments List */}
          {comments.map((comment) => (
            <div key={comment.id} className="mb-6">
              {/* Main Comment */}
              <div className="flex">
                <img
                  src={comment.user.avatar}
                  alt={comment.user.name}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div className="flex-1">
                  <div className="flex items-center mb-1">
                    <span className="font-medium mr-2">
                      {comment.user.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      {formatTimeAgo(comment.timestamp)}
                    </span>
                    {/* Edit/Delete buttons (only show for current user's comments) */}
                    {comment.isCurrentUser && (
                      <div className="ml-auto flex">
                        <button
                          className="text-gray-500 hover:text-gray-700 mr-2"
                          onClick={() => handleEditComment(comment.id)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="text-gray-500 hover:text-red-500"
                          onClick={() => handleDeleteComment(comment.id)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Comment text or edit input */}
                  {editingCommentId === comment.id ? (
                    <div className="mb-2">
                      <input
                        type="text"
                        className="w-full border-b border-gray-300 pb-2 focus:outline-none focus:border-blue-500"
                        value={editCommentText}
                        onChange={(e) => setEditCommentText(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === "Enter" && handleSaveEdit(comment.id)
                        }
                      />
                      <div className="flex justify-end mt-2">
                        <button
                          className="px-4 py-1 bg-gray-200 rounded-full mr-2 hover:bg-gray-300"
                          onClick={() => setEditingCommentId(null)}
                        >
                          Cancel
                        </button>
                        <button
                          className="px-4 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700"
                          onClick={() => handleSaveEdit(comment.id)}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-800 mb-2">{comment.text}</p>
                  )}

                  <div className="flex items-center text-sm text-gray-500">
                    <button
                      className={`flex items-center mr-3 ${
                        comment.liked ? "text-blue-600" : ""
                      }`}
                      onClick={() => handleLikeComment(comment.id)}
                    >
                      <FaThumbsUp className="mr-1" />
                      <span>{comment.likes}</span>
                    </button>
                    <button
                      className={`flex items-center mr-4 ${
                        comment.disliked ? "text-blue-600" : ""
                      }`}
                      onClick={() => handleDislikeComment(comment.id)}
                    >
                      <FaThumbsDown className="mr-1" />
                      <span>{comment.dislikes}</span>
                    </button>
                    <button
                      className="flex items-center font-medium text-gray-600 hover:text-gray-800"
                      onClick={() =>
                        setReplyingTo(
                          replyingTo === comment.id ? null : comment.id
                        )
                      }
                    >
                      <FaReply className="mr-1" />
                      <span>Reply</span>
                    </button>
                  </div>

                  {/* Reply Input (unchanged) */}
                  {replyingTo === comment.id && (
                    <div className="flex mt-4">
                      <img
                        src="https://randomuser.me/api/portraits/men/5.jpg"
                        alt="User"
                        className="w-8 h-8 rounded-full mr-3"
                      />
                      <div className="flex-1">
                        <input
                          type="text"
                          placeholder="Write a reply..."
                          className="w-full border-b border-gray-300 pb-2 focus:outline-none focus:border-blue-500"
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          onKeyPress={(e) =>
                            e.key === "Enter" && handleAddReply(comment.id)
                          }
                        />
                        <div className="flex justify-end mt-2">
                          <button
                            className="px-4 py-1 bg-gray-200 rounded-full mr-2 hover:bg-gray-300"
                            onClick={() => setReplyingTo(null)}
                          >
                            Cancel
                          </button>
                          <button
                            className={`px-4 py-1 rounded-full ${
                              replyText.trim()
                                ? "bg-blue-600 text-white hover:bg-blue-700"
                                : "bg-gray-200 text-gray-500 cursor-not-allowed"
                            }`}
                            onClick={() => handleAddReply(comment.id)}
                            disabled={!replyText.trim()}
                          >
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Replies (with edit/delete functionality) */}
              {comment.replies.length > 0 && (
                <div className="ml-12 mt-4 pl-4 border-l-2 border-gray-200">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="mb-4">
                      <div className="flex">
                        <img
                          src={reply.user.avatar}
                          alt={reply.user.name}
                          className="w-8 h-8 rounded-full mr-3"
                        />
                        <div className="flex-1">
                          <div className="flex items-center mb-1">
                            <span className="font-medium mr-2">
                              {reply.user.name}
                            </span>
                            <span className="text-xs text-gray-500">
                              {formatTimeAgo(reply.timestamp)}
                            </span>
                            {/* Edit/Delete buttons for replies */}
                            {reply.isCurrentUser && (
                              <div className="ml-auto flex">
                                <button
                                  className="text-gray-500 hover:text-gray-700 mr-2 text-xs"
                                  onClick={() =>
                                    handleEditReply(comment.id, reply.id)
                                  }
                                >
                                  <FaEdit size={12} />
                                </button>
                                <button
                                  className="text-gray-500 hover:text-red-500 text-xs"
                                  onClick={() =>
                                    handleDeleteReply(comment.id, reply.id)
                                  }
                                >
                                  <FaTrash size={12} />
                                </button>
                              </div>
                            )}
                          </div>

                          {/* Reply text or edit input */}
                          {editingReplyId === reply.id ? (
                            <div className="mb-2">
                              <input
                                type="text"
                                className="w-full border-b border-gray-300 pb-2 focus:outline-none focus:border-blue-500 text-sm"
                                value={editReplyText}
                                onChange={(e) =>
                                  setEditReplyText(e.target.value)
                                }
                                onKeyPress={(e) =>
                                  e.key === "Enter" &&
                                  handleSaveReplyEdit(comment.id, reply.id)
                                }
                              />
                              <div className="flex justify-end mt-2">
                                <button
                                  className="px-3 py-1 bg-gray-200 rounded-full mr-2 hover:bg-gray-300 text-xs"
                                  onClick={() => setEditingReplyId(null)}
                                >
                                  Cancel
                                </button>
                                <button
                                  className="px-3 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700 text-xs"
                                  onClick={() =>
                                    handleSaveReplyEdit(comment.id, reply.id)
                                  }
                                >
                                  Save
                                </button>
                              </div>
                            </div>
                          ) : (
                            <p className="text-gray-800 mb-2 text-sm">
                              {reply.text}
                            </p>
                          )}

                          <div className="flex items-center text-xs text-gray-500">
                            <button
                              className={`flex items-center mr-3 ${
                                reply.liked ? "text-blue-600" : ""
                              }`}
                              onClick={() =>
                                handleLikeComment(reply.id, true, comment.id)
                              }
                            >
                              <FaThumbsUp className="mr-1" />
                              <span>{reply.likes}</span>
                            </button>
                            <button
                              className={`flex items-center mr-4 ${
                                reply.disliked ? "text-blue-600" : ""
                              }`}
                              onClick={() =>
                                handleDislikeComment(reply.id, true, comment.id)
                              }
                            >
                              <FaThumbsDown className="mr-1" />
                              <span>{reply.dislikes}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Shrwag Section */}
        {/* <div className="bg-gray-100 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-bold mb-2">SHRWAG</h2>
          <p className="text-lg">
            Shares His Experience with <br />
            <strong className="text-xl">iB CRICKET</strong>
          </p>
        </div> */}
      </div>
    </div>
  );
}

export default VideoPage;
