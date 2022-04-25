import React, { useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import axios from "axios";

export default function Home() {
  const userInfo = useSelector((state) => state.user);
  const [photo, setPhoto] = useState("");
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
          imageCreate.src = photo;
          imageDom.appendChild(imageCreate);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <Navbar />
      <div></div>
      <p className="font-bold">gggggg</p>
      <div>
        <input
          type="file"
          name="file"
          accept=".jpeg,.png,.jpg"
          placeholder="Pick a photo"
          onChange={uploadPhoto}
        />
        <div id="imageDisplay"></div>
        <button onClick={handleSubmit}>Send</button>
        <button onClick={handleGetSubmit}>Get all photos</button>
      </div>
    </div>
  );
}
