import React, { useState } from "react";

export default function Register(props) {
  const [email, setEmail] = useState("email");
  const [password, setPassword] = useState("password");
  let handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  let handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  console.log(email, password);
  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-md w-full space-y-8 text-xl bg-zinc-600 outline ">
        <div className="mt-10">
          <h2>Register</h2>
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
          </div>
          <div className="mt-6">
            <label className="block" id="Password">
              Password
            </label>
            <input
              className="outline focus:ring focus:ring-pink-500 hover:outline-none rounded-md"
              name="password"
              htmlFor="Password"
              placeholder="Write your password"
              onChange={handleChangePassword}
            ></input>
          </div>
          <div className="mt-6">
            <label className="block" id="Password">
              Re-Password
            </label>
            <input
              className="outline focus:ring focus:ring-pink-500 hover:outline-none rounded-md"
              name="repassword"
              htmlFor="Password"
              placeholder="Write your password again"
            ></input>
          </div>
          <button type="submit" className="outline mt-6 rounded-xl p-1">
            Tıkla
          </button>
        </form>
      </div>
    </div>
  );
}
