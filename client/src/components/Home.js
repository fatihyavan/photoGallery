import React, { useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import user from "../redux/reducers/rootReducers";
import axios from "axios";

export default function Home() {
  const userInfo = useSelector((state) => state.user);
  const [a, setA] = useState();
  console.log("homeeee");
  console.log(userInfo);
  const h = "1.jpeg";
  let image = require("../assets/images/" + h);
  const photoInput = (e) => {
    axios.get("/photoadd");
    console.log("Eklemeye ");
    axios
      .get("/photoget")
      .then((res) => (a = res.data))
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <Navbar />
      <div>
        <img src={image} alt="1" />
      </div>
      ;
      <button className="bg-red-800" onClick={photoInput}>
        butt
      </button>
      <p className="font-bold">gggggg</p>
    </div>
  );
}
