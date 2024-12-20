"use client";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { UserContext } from "../contexts/user-context";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";

export default function SigninPage() {
  const { isSignedIn, setIsSignedIn } = useContext(UserContext);

    if (isSignedIn) {
      return redirect("/");
    }


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <div className="bg-black border border-[#ffffff36] rounded-lg p-8 w-96 shadow-sm">
        <div className="flex justify-center mb-6">
          <Image
            src="/Instagram.png"
            alt=""
            className="w-auto h-auto"
            width={150}
            height={10}
          />
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const credential = e.target.credential.value;
            const password = e.target.password.value;

            axios
              .post(`${process.env.NEXT_PUBLIC_API}/signin`, {
                credential,
                password,
              })
              .then((res) => {
                toast.success("Ta amjilttai nevterlee!!");
                setIsSignedIn(true);
                localStorage.setItem("isSignedIn", true);
              })
              .catch((err) => {
                toast.error(err.response.data.message);
              });
          }}
          className="flex flex-col gap-4"
        >
          <input
            name="credential"
            type="text"
            placeholder="Phone number, username, or email"
            className="bg-[#f7f7f713] border border-[#ffffff36] rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            className="bg-[#f7f7f713] border border-[#ffffff36] rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
          />

          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold rounded-xl py-2 hover:bg-blue-600 transition text-sm"
          >
            Log In
          </button>
        </form>
      </div>

      <div className="bg-black border border-[#ffffff36] rounded-lg mt-4 p-4 w-96 text-center text-sm">
        Don&rsquo;t have an account?{" "}
        <button>
          <Link
            href="/signup"
            className="text-blue-500 font-semibold hover:underline"
          >
            Sign up
          </Link>
        </button>
      </div>
      <p className="my-3 text-sm">Get the app.</p>
      <div className="flex justify-between gap-3">
        <a href="https://apps.apple.com/us/app/instagram/id389801252">
          <Image
            src={"/apple.png"}
            width={100}
            height={100}
            className="w-auto h-auto hover:opacity-80"
            alt=""
          />{" "}
        </a>
        <a href="https://play.google.com/store/apps/details?id=com.instagram.android&referrer=ig_mid%3DAB0DD439-7328-4348-A4EE-55A216564EC8%26utm_campaign%3DloginPage%26utm_content%3Dlo%26utm_source%3Dinstagramweb%26utm_medium%3Dbadge%26original_referrer%3Dhttps%3A%2F%2Fwww.google.com%2F">
          <Image
            src={"/playstore.png"}
            width={100}
            height={100}
            className="w-auto h-auto hover:opacity-80"
            alt=""
          />{" "}
        </a>
      </div>
    </div>
  );
}
