import React, { Component } from "react";
import { button, Navigate, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../style.css";
import Home from "./Home";
import Login2 from "./Login2";

export default function Navbar() {
  const userInfo = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <div>
      <nav className="bg-[#1B355D] h-16 text-2xl">
        <div className="container flex flex-wrap justify-between items-center mx-auto pt-4">
          <button
            className="text-white"
            onClick={() => {
              navigate("/home");
            }}
          >
            Home
          </button>
          <div className=" w-full md:block md:w-auto">
            <ul className="flex flex-row ">
              <li>
                <Link to="/login" className="pr-10 text-white">
                  Log Out
                </Link>
              </li>

              <li>
                <span className=" pl-5 text-white">{userInfo.name}</span>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
