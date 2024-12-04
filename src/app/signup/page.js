"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function SignupPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const credential = e.target.credential.value;
          const password = e.target.password.value;
          const fullname = e.target.fullname.value;
          const username = e.target.username.value;

          axios
            .post(`${process.env.NEXT_PUBLIC_API}/signup`, { credential, password, fullname, username })
            .then((res) => {
              toast.success("Та амжилттай бүртгүүллээ!");
              router.push("/signin");
            })
            .catch((err) => {
              console.error(err);
              toast.error(err.response.data.message);
            });
        }}
        className="flex flex-col gap-4"
      >
        <label className="flex flex-col">
          Credential
          <input name="credential" type="text" className="text-black" />
        </label>
        <label className="flex flex-col">
          Password
          <input name="password" type="password" className="text-black" />
        </label>
        <label className="flex flex-col">
          Full Name
          <input name="fullname" type="text" className="text-black" />
        </label>
        <label className="flex flex-col">
          Username
          <input name="username" type="text" className="text-black" />
        </label>
        <button className="text-black bg-white">Signup</button>
      </form>
      <div className="my-4">
        Already have an account? <Link href={"/login"}>Sign in</Link>
      </div>
    </div>
  );
}
