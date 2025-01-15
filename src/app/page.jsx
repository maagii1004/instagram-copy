"use client";
import { redirect } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./contexts/user-context";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";
import { FaRegSquarePlus } from "react-icons/fa6";
import { GoHomeFill } from "react-icons/go";
import { CgLogOut } from "react-icons/cg";
import { PostCard } from "./components/PostCard";
import { CgProfile } from "react-icons/cg";

export default function Home() {
  const { user, setAccessToken } = useContext(UserContext);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3333/api/posts").then((res) => {
      setPosts(res.data);
    });
  }, []);

  if (!user) {
    return redirect("/login");
  }

  const handleLogOut = () => {
    if (confirm("Are you sure you want to log out?")) {
      setAccessToken("");
    }
  };

  return (
    <div className="min-h-screen flex bg-[#000000] text-gray-200">
      {/* Sidebar Navigation */}
      <nav className="w-[15%] h-full fixed bg-[#000000] border-r border-gray-900 shadow-sm flex flex-col items-start pt-5 px-6">
        <Link href="/">
          <Image
            src="/Instagram.png"
            alt="Instagram Logo"
            width={120}
            height={30}
            className="mb-10"
          />
        </Link>
        <ul className="flex flex-col gap-3 text-lg">
          <Link href={"/"}>
            <li className="flex items-center gap-4 cursor-pointer hover:bg-[#2A2A2A] p-2 rounded-lg sidebar-item">
              <GoHomeFill className="w-7 h-7 text-white" />
              <span className="sidebar-text">Home</span>
            </li>
          </Link>

          {user && (
            <Link href={`/${user.username}`}>
              <li className="flex items-center gap-4 cursor-pointer hover:bg-[#2A2A2A] p-2 rounded-lg sidebar-item">
                <CgProfile className="w-7 h-7 text-white" />
                <span className="sidebar-text">Profile</span>
              </li>
            </Link>
          )}

          <Link href="/create">
            <li className="flex items-center gap-4 cursor-pointer hover:bg-[#2A2A2A] p-2 rounded-lg sidebar-item">
              <FaRegSquarePlus className="w-7 h-7 text-white" />
              <span className="sidebar-text">Create</span>
            </li>
          </Link>
          <li className="flex items-center gap-4 cursor-pointer hover:bg-[#2A2A2A] p-2 rounded-lg sidebar-item">
            <CgLogOut className="w-7 h-7 text-white" />
            <button onClick={handleLogOut} className="sidebar-text">
              Log Out
            </button>
          </li>
        </ul>
      </nav>

      <main className="ml-[15%] w-[85%] flex flex-col items-center pt-5 overflow-y-auto">
        {posts
          .filter((post) => Boolean(post.mediaUrl))
          .map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
      </main>
    </div>
  );
}
