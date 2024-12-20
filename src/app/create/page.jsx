"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { CiImageOn } from "react-icons/ci";
import { ImageUploader } from "./ImageUploader";

const CreatePage = () => {
  const [description, setDescription] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    const response = await axios.post("http://localhost:3333/api/posts", {
      description,
      mediaUrl,
    });
    if (response.status !== 200) {
      toast.error("Post nemehed aldaa garlaa!");
    } else {
      toast.success("Amjilttai post hiilee");
      router.push("/");
    }
  };

  return (
    <>
      <header className="flex justify-between p-4">
        <button onClick={() => router.back()}> &lt; </button>
        <p>New post</p>
        <button onClick={handleSubmit}>Share</button>
      </header>
      <main className="p-4">
        <label htmlFor="">Image</label>
        <ImageUploader setMediaUrl={setMediaUrl} />
        <div className="flex flex-col">
          <>Description</>
        <textarea
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          className="max-w-[1000px] border rounded resize-none bg-background text-foreground"
        />
        </div>
        
      </main>
    </>
  );
};

export default CreatePage;
