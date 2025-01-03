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

export default function Home() {
  const { user } = useContext(UserContext);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3333/api/posts").then((res) => {
      setPosts(res.data);
    });
  }, []);

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="min-h-screen flex bg-[#12121208] text-gray-200">
      {/* Sidebar Navigation */}
      <nav className="w-[20%] h-full fixed bg-[#1e1e1e75] border-r border-gray-900 shadow-sm flex flex-col items-start pt-5 px-6">
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
        </ul>
      </nav>

      <main className="ml-[20%] w-[80%] flex flex-col items-center pt-10">
        <div className="w-full max-w-[600px]">
          {posts.map((post) => (
            <div
              key={post.id}
              className="mb-10 border border-gray-700 bg-[#1E1E1E] rounded-lg shadow-sm p-4"
            >
              {/* User Info */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gray-900 rounded-full"></div>
                <span className="font-semibold text-gray-200">
                  <Link
                    className="text-blue-500"
                    href={`/${post.user.username}`}
                  >
                    @{post.user.username}
                  </Link>
                </span>
              </div>
              {/* Media */}
              <div className="w-full bg-gray-700 rounded-lg overflow-hidden">
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
