import { Navigate } from "react-router";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Home from "./Home";
import axios from "axios";

export default function Protected() {
  const [check, setCheck] = useState("true");
  useEffect(() => {
    const checkCokkie = async () => {
      await axios
        .post("/checkcookie", { withCredentials: true })
        .then((response) => {
          setCheck(response.data);
          console.log(response.status);
        })
        .catch((err) => console.log(err));
    };
    checkCokkie();
  });

  if (check) {
    return <Home />;
  } else {
    return <Navigate replace to={"/login "} />;
  }
}
