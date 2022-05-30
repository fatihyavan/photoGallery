import React, { useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import axios from "axios";
import { useNavigate } from "react-router";

export default function Home() {
  const userInfo = useSelector((state) => state.user);
  const [photo, setPhoto] = useState("");
  const navigate = useNavigate();
  const name = userInfo.name;
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const filereader = new FileReader();
      filereader.readAsDataURL(file);
      filereader.onload = () => {
        resolve(filereader.result);
      };
      filereader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const uploadPhoto = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setPhoto(base64);
  };
  const handleSubmit = (e) => {
    axios
      .post("/uploadphoto", { name, photo })
      .then(console.log("aaaaa"))
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          navigate("/login");
        }
      });
  };
  const handleGetSubmit = (e) => {
    const imageDom = (document.getElementById("imageDisplay").innerHTML = "");
    const deneme = axios
      .post("/getphoto", { name })
      .then((response) => {
        for (const photo of response.data) {
          const imageDom = document.getElementById("imageDisplay");
          const imageCreate = document.createElement("img");
          const imageDiv = document.createElement("div");
          imageCreate.src = photo;
          imageCreate.classList.add("h-[480px]", "pt-4");
          imageDiv.appendChild(imageCreate);
          imageDiv.classList.add("hover:scale-95");
          imageDom.appendChild(imageDiv);
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          navigate("/login");
        }
      });
  };
  return (
    <div className=" bg-[#E5E4E2]">
      <Navbar />
      <div className="flex justify-center h-12 ">
        <input
          className="pt-4"
          type="file"
          name="file"
          accept=".jpeg,.png,.jpg"
          placeholder="Pick a photo"
          onChange={uploadPhoto}
        />
        <div className="pt-4">
          <button type="button" className="px-4   " onClick={handleSubmit}>
            <span>Send</span>
            <svg
              className="w-6 h-6 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              ></path>
            </svg>
          </button>
          <button type="button" className="pl-4" onClick={handleGetSubmit}>
            <span>Get all photos</span>
            <svg
              className="w-6 h-6 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      <div className="flex  mx-auto ">
        <div
          id="imageDisplay"
          className="pl-16 pt-8 flex flex-wrap space-x-4 "
        ></div>
      </div>
    </div>
  );
}
