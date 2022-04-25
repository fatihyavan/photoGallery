import { Navigate } from "react-router";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Home from "./Home";
import axios from "axios";

export default function Protected() {
  const [check, setCheck] = useState("true");
  useEffect(() => {
    console.log("ilk");
    const checkCokkie = async () => {
      await axios
        .post("/checkcookie", { withCredentials: true })
        .then((response) => {
          console.log("girer mi");
          setCheck(response.data);
          console.log(check);
        })
        .catch((err) => console.log(err));
    };
    checkCokkie();
  }, []);

  if (check) {
    console.log("girdi");
    return <Home />;
  } else {
    console.log("burda mıyım");
    return <Navigate replace to={"/login "} />;
  }
}
