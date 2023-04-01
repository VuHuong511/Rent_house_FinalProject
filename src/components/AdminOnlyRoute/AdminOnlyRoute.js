import React from "react";
import { useSelector } from "react-redux";
import BsArrowLeftCircleFill from "react-icons/bs";
import { selectEmail } from "../../redux/slice/authSlice";
import { Link } from "react-router-dom";

const AdminOnlyRoute = ({ children }) => {
  const userEmail = useSelector(selectEmail);
  if (userEmail === "admin@gmail.com") {
    return children;
  }
  return (
    <div className="h-[90vh]">
      <div style={{ justifyContent: "center" }}>
        <h1>Permission Denied</h1>
        <p>This page can only be view by an Admin user</p>
        <br />
        <Link to="/homeLogin">
          <button>
            <i class="fa-solid fa-arrow-left"></i>
            Back To Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export const AdminOnlyLink = ({ children }) => {
  const userEmail = useSelector(selectEmail);
  if (userEmail === "admin@gmail.com") {
    return children;
  }
  return null;
};

export default AdminOnlyRoute;
