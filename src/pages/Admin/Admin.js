import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../../components/Admin/DashBoard/Dashboard";
import "./Admin.css";
import All_room from "../../components/Admin/All-room/All-room";
import Navbar from "../../components/Admin/Navbar/Navbar";

function Admin() {
  return (
    <div className="admin">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="all-room" element={<All_room />} />
        </Routes>
      </div>
    </div>
  );
}

export default Admin;
