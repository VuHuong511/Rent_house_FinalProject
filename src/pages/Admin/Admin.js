import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../../components/Admin/DashBoard/Dashboard";
import Home from "../HomeLogin";

function Admin() {
  return (
    <div>
      <div>
        <div>abc</div>
      </div>
      <div>
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          {/* <Route path="dashboard" element={<Dashboard />} /> */}
        </Routes>
      </div>
    </div>
  );
}

export default Admin;
