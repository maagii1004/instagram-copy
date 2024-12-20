import { CiImageOn } from "react-icons/ci";
import { CgSpinner } from "react-icons/cg";
import { useState } from "react";
import { RiImageAddFill } from "react-icons/ri";
import axios from "axios";

export const ImageUploader = ({ setMediaUrl }) => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState();

  return (
    <div className="relative flex items-center justify-center max-w-[1000px] min-h-80 my-4 rounded border-2 border-gray-500">
      <RiImageAddFill size={100} />
      <input
        onChange={(e) => {
          setLoading(true);
          const formData = new FormData();
          formData.append("file", e.target.files[0]);
          axios
            .post("http://localhost:3333/api/files", formData)
            .then((res) => {
              setResponse(res.data);
              setLoading(false);
              setMediaUrl(res.data.fileUrl);
            });
        }}
        type="file"
        className="absolute top-0 left-0 w-full h-full opacity-0 hover:cursor-pointer"
        accept="image/*"
      />
      {loading && (
        <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-black/80">
          <CgSpinner className="spin" size={40} />
        </div>
      )}
      {response && (
        <img
          src={response.fileUrl}
          alt=""
          className="object-cover w-full h-full"
        />
      )}
    </div>
  );
};