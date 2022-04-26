import axios from "axios";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { userInfo } from "../redux/actions/actions";
import user from "../redux/reducers/rootReducers";
import "../style.css";

export default function Login2() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const infoStore = useSelector((state) => state.user);
  console.log(infoStore);

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleInput = (e) => {
    e.preventDefault();
    dispatch(userInfo({ email, password }));
    axios
      .post("/login", { email, password })
      .then((res) => {
        setMessage(res.data.message);
        if (res.data.auth) {
          navigate("/home");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className=" flex justify-center items-center  py-12 px-4  ">
      <div className="h-96 w-1/3 text-xl bg-[#6C98DC] outline  rounded-xl">
        <div className="mt-10 pl-44 font-black">
          <h2>Sign In Your Account</h2>
          {message}
        </div>
        <form>
          <div className="mt-6 pl-32 ">
            <label className="block pl-24 font-bold" id="Email">
              Email
            </label>
            <input
              className="outline focus:ring focus:ring-blue-300 hover:outline-none rounded-md"
              htmlFor="Email"
              name="email"
              placeholder="Write your email"
              onChange={handleChangeEmail}
            ></input>
            {email}
          </div>
          <div className="mt-6 pl-32">
            <label className="block pl-24 font-bold" id="Password">
              Password
            </label>

            <input
              className="outline focus:ring focus:ring-blue-300 hover:outline-none rounded-md"
              htmlFor="Password"
              name="password"
              placeholder="Write your password"
              onChange={handleChangePassword}
            ></input>
            {password}
          </div>
          <div className="pl-56">
            <button
              type="submit"
              className=" mt-6 pl-2 pr-2 rounded-xl outline"
              onClick={handleInput}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
