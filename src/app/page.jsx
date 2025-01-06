"use client";
import { redirect } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./contexts/user-context";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";
import { FaRegSquarePlus } from "react-icons/fa6";
import { GoHomeFill } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
import { CgLogOut } from "react-icons/cg";

export default function Home() {
  const { user, setAccessToken} = useContext(UserContext);

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
  }

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
          <li className="flex items-center gap-4 cursor-pointer hover:bg-[#2A2A2A] p-2 rounded-lg sidebar-item">
            <GoHomeFill className="w-7 h-7 text-white" />
            <span className="sidebar-text">Home</span>
          </li>
          <li className="flex items-center gap-4 cursor-pointer hover:bg-[#2A2A2A] p-2 rounded-lg sidebar-item">
            <IoIosSearch className="w-7 h-7 text-white" />
            <span className="sidebar-text">Search</span>
          </li>
          <Link href="/create">
            <li className="flex items-center gap-4 cursor-pointer hover:bg-[#2A2A2A] p-2 rounded-lg sidebar-item">
              <FaRegSquarePlus className="w-7 h-7 text-white" />
              <span className="sidebar-text">Create</span>
            </li>
          </Link>
          <li className="flex items-center gap-4 cursor-pointer hover:bg-[#2A2A2A] p-2 rounded-lg sidebar-item">
            <CgLogOut className="w-7 h-7 text-white" />
            <button onClick={handleLogOut} className="sidebar-text">Log Out</button>
          </li>
        </ul>
      </nav>

      <main className="ml-[10%] w-[80%] flex flex-col items-center pt-10">
        <div className="w-full max-w-[600px]">
          {posts.map((post) => (
            <div
              key={post.id}
              className="mb-10 border-[0.3px] border-[#3c3c3c87] bg-[#000000] rounded-lg shadow-sm p-4"
            >
              {/* User Info */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full"><img src="../pfp.jpg" alt="" className="rounded-full"/></div>
                <span className="font-semibold text-gray-200">
                  <Link
                    className="text-white"
                    href={`/${post.user.username}`}
                  >
                    @{post.user.username}
                  </Link>
                </span>
              </div>
              {/* Media */}
              <div className="w-full bg-[#000000] rounded-lg overflow-hidden">
                {post.mediaUrl ? (
                  <img
                    src={post.mediaUrl}
                    alt="Post"
                    className="w-full object-cover"
                  />
                ) : (
                  <div className=""></div>
                )}
              </div>
              {/* Post Description */}
              <p className="mt-4 text-gray-300">{post.description}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
