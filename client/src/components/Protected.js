import { Navigate } from "react-router";
import React from "react";
import Cookies from "js-cookie";
import Home from "./Home";
import axios from "axios";

export default function Protected(req) {
  const a = Cookies.get("access_token");
  console.log(a);
  if (a) {
    return <Home />;
  }
  return <Navigate replace to={"/login "} />;
}
