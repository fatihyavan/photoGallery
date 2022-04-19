import React, { Component } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Navbar() {
  const userInfo = useSelector((state) => state.user);

  return (
    <div>
      <nav className="bg-[#a5b4fc] border-slate-800 rounded dark:bg-gray-800 h-16 text-2xl">
        <div className="container flex flex-wrap justify-between items-center mx-auto pt-4">
          <Link to={"http://localhost:3000/home"}>Home</Link>
          <div className=" w-full md:block md:w-auto">
            <ul className="flex flex-row ">
              <li>
                <Link to="" className="pr-10">
                  Photos
                </Link>
              </li>

              <li>
                <span className=" pl-5">{userInfo.name}</span>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
