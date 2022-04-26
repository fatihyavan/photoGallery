import "./index.css";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register2 from "./components/Register2";
import Navbar from "./components/Navbar";
import Login2 from "./components/Login2";
import { useState } from "react";
import React from "react";
import Protected from "./components/Protected";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register2 />} />
        <Route path="/login" element={<Login2 />} />
        <Route path="/home" element={<Protected></Protected>} />
      </Routes>
    </Router>
  );
}

export default App;
