import React from "react";
import { useNavigate } from "react-router";

export default function Validate() {
  const navigate = useNavigate();
  return (
    <div>
      Validate
      <button
        onClick={() => {
          navigate("register");
        }}
      >
        hhh
      </button>
    </div>
  );
}
