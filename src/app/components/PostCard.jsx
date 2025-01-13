import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/user-context";
import axios from "axios";
import { LikedIcon } from "../icons/LikedIcon";
import { LikeIcon } from "../icons/LikeIcon";

export const PostCard = ({ post }) => {
  const { user, accessToken } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [comments, setComments] = useState(post.comments);
  const [liked, setLiked] = useState(false);
  const [commentsShown, setCommentsShown] = useState(false);

  useEffect(() => {
    console.log(likes);
    if (user) {
      const myLike = likes.some((like) => {
        if (like.user._id) {
          return like.user._id === user._id;
        }
        return like.user === user._id;
      });
      setLiked(myLike);
    }
  }, [user, likes]);

  const handleLike = async () => {
    if (!user) return;
    setLoading(true);
    try {
      if (!liked) {
        const res = await axios.post(
          `http://localhost:3333/api/posts/${post._id}/likes`,
          null,
          {
            headers: { Authorization: "Bearer " + accessToken },
          }
        );
        setLikes([...likes, res.data]);
      } else {
        await axios.delete(
          `http://localhost:3333/api/posts/${post._id}/likes`,
          {
            headers: { Authorization: "Bearer " + accessToken },
          }
        );
        setLikes(
          likes.filter((like) => {
            if (like.user._id) {
              return like.user._id !== user._id;
            }
            return like.user !== user._id;
          })
        );
      }
      setLiked(!liked);
    } finally {
      setLoading(false);
    }
  };

  const handleComment = async (comment) => {
    if (comment.length > 0) {
      setLoading(true);
      try {
        const res = await axios.post(
          `http://localhost:3333/api/posts/${post._id}/comments`,
          { comment },
          {
            headers: { Authorization: "Bearer " + accessToken },
          }
        );
        setComments([
          ...comments,
          { ...res.data, user: { username: user.username } },
        ]);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="bg-[#1a1a1a6f] text-white border border-gray-800 rounded-lg shadow-lg mb-6 max-w-[500px] mx-auto">
      <div className="flex items-center gap-3 p-4 border-b border-gray-700">
        <img src="../pfp.jpg" alt="" className="w-8 h-8 rounded-full" />
        <Link href={`/${post.user.username}`} className="text-sm font-semibold">
          @{post.user.username}
        </Link>
      </div>

      {/* Image */}
      <div className="relative w-full h-[400px]">
        <img
          src={post.mediaUrl}
          alt="Post media"
          className="object-contain w-full h-full"
        />
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <button
            onClick={handleLike}
            disabled={loading}
            className="disabled:opacity-50"
          >
            {liked ? <LikedIcon /> : <LikeIcon />}
          </button>
          <span className="text-sm">{likes.length} likes</span>
        </div>

        <p className="text-sm mb-2">{post.description}</p>

        {/* Comments */}
        {commentsShown ? (
          <>
            <ul className="text-sm mb-2">
              {comments.map((comment) => (
                <li key={comment._id}>
                  <span className="font-semibold">
                    {comment.user.username}:{" "}
                  </span>
                  {comment.comment}
                </li>
              ))}
            </ul>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const comment = e.target.comment.value;
                await handleComment(comment);
                e.target.comment.value = "";
              }}
            >
              <input
                type="text"
                name="comment"
                placeholder="Add a comment..."
                className="w-full bg-transparent border-b border-gray-600 p-2 text-sm"
                disabled={loading}
              />
            </form>
          </>
        ) : (
          <p
            className="text-sm text-gray-400 cursor-pointer"
            onClick={() => setCommentsShown(true)}
          >
            View all {comments.length} comments
          </p>
        )}
      </div>
    </div>
  );
};
