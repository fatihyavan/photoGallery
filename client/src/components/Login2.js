import axios from "axios";
import React from "react";
import { useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { userInfo } from "../redux/actions/actions";
import user from "../redux/reducers/rootReducers";

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
    <div className="h-entire flex items-center justify-center py-12 px-4  bg-zinc-600 ">
      <div className=" w-16 text-xl bg-zinc-200 outline ">
        <div className="mt-10 ">
          <h2>Sign In Your Account</h2>
          {message}
        </div>
        <form>
          <div className="mt-6 ">
            <label className="block" id="Email">
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
          <div className="mt-6">
            <label className="block" id="Password">
              Password
            </label>

            <input
              className="outline focus:ring focus:ring-pink-500 hover:outline-none rounded-md"
              htmlFor="Password"
              name="password"
              placeholder="Write your password"
              onChange={handleChangePassword}
            ></input>
            {password}
          </div>
          <button
            type="submit"
            className="outline mt-6 rounded-xl"
            onClick={handleInput}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
