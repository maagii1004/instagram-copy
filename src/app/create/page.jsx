"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { ImageUploader } from "./ImageUploader";
import { UserContext } from "../contexts/user-context";
import Link from "next/link";
import { GoHomeFill } from "react-icons/go";
import { CgLogOut, CgProfile } from "react-icons/cg";
import { FaRegSquarePlus } from "react-icons/fa6";
import { redirect } from "next/navigation";
import Image from "next/image";

const CreatePage = () => {
  const { accessToken } = useContext(UserContext);
  const [description, setDescription] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const { user, setAccessToken } = useContext(UserContext);
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      await axios.post(
        "http://localhost:3333/api/posts",
        { description, mediaUrl },
        {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      );
      toast.success("Amjilttai post hiilee");
      router.push("/");
    } catch (error) {
      console.error(error);
      toast.error("Nemehed aldaa garlaa");
    }
  };

  if (!user) {
    return redirect("/login");
  }

  const handleLogOut = () => {
    if (confirm("Are you sure you want to log out?")) {
      setAccessToken("");
    }
  };

  return (
    <div className="min-h-screen flex bg-black">
      {/* Sidebar */}
      <nav className="w-[15%] h-screen fixed bg-[#000000] border-r border-gray-900 shadow-sm flex flex-col items-start pt-5 px-6">
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
          <li className="flex items-center gap-4 cursor-pointer hover:bg-[#2A2A2A] p-2 rounded-lg sidebar-item">
            <CgProfile className="w-7 h-7 text-white" />
            <span className="sidebar-text">Profile</span>
          </li>
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

      {/* Main Content */}
      <div className="w-[30%] p-6 mx-auto">
        <div className="flex justify-between mb-4 w-[88%]">
          <button
            className="hover:cursor-pointer hover:underline hover:font-semibold"
            onClick={() => router.back()}
          >
            Cancel
          </button>
          <p className="font-semibold text-lg">Create New Post</p>
          <button
            className="hover:cursor-pointer hover:underline hover:font-semibold hover:text-[#467ce9]"
            onClick={handleSubmit}
          >
            Share
          </button>
        </div>
        <main className="p-4 bg-black rounded-lg shadow-md align-middle">
          <label htmlFor="imageUploader" className="block mb-2 font-semibold">
            Image
          </label>
          <ImageUploader
            setMediaUrl={setMediaUrl}
            className="hover:cursor-pointer mb-4 "
          />
          <div className="flex flex-col">
            <label htmlFor="description" className="pb-2 font-semibold">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              className="w-full max-w-lg border rounded resize-none p-3 bg-[#00000070]"
              rows="4"
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default CreatePage;
