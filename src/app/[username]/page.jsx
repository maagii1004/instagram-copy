"use client";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/user-context";
import axios from "axios";
import { useParams } from "next/navigation";

const Page = () => {
  const { username } = useParams();
  const { user: currentUser } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3333/api/users/" + username).then((res) => {
      setUser(res.data);
    });
  }, [username]);

  useEffect(() => {
    if (user !== null) {
      axios
        .get("http://localhost:3333/api/posts/user/" + user._id)
        .then((res) => {
          setPosts(res.data);
        })
        .catch(() => {
          setPosts([]);
        });
    }
  }, [user]);

  if (!user) return null;

  const isOwner = currentUser._id === user._id;

  return (
    <main className="px-4">
      <div className="flex gap-4">
        <div>
          <Image
            alt=""
            src={user.profileUrl}
            width={100}
            height={100}
            className="border w-[100px] h-[100px] rounded-full object-cover"
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{user.username}</h1>
          {isOwner && (
            <div>
              <button>Edit profile</button>
            </div>
          )}
          <div>
            {user.fullname} <br />
            {user.bio}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3">
        {posts.map((post) => (
          <div key={post._id}>
            <Image
              src={post.mediaUrl}
              alt={post.description}
              width={300}
              height={300}
              objectFit="cover"
            />
          </div>
        ))}
      </div>
    </main>
  );
};

export default Page;
