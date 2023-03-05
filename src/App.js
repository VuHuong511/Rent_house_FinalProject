import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Pricing from "./components/Pricing/Pricing";

import Services from "./components/Service/Service";
import About from "./components/About/About";
import Blog from "./components/Blog/Blog";
import Contact from "./components/Contact/Contact";
import Header from "./components/Common/Header/Header";
import Footer from "./components/Common/Footer/Footer";
import Pages from "./components/Home";
import LogIn from "./pages/Login/LogIn";
import Listing from "./pages/Listing/Listing";
import Register from "./pages/Register/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile/Profile";

import PrivateRoute from "./components/PrivateRoute";
import Homelogin from "./pages/HomeLogin";
import CreateListing from "./pages/Create/Create";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditListing from "./pages/Edit/Edit";

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Pages />} />
          <Route path="/homelogin" element={<Homelogin />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<CreateListing />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/listing" element={<Listing />} />


          <Route path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route path="/create" element={<PrivateRoute />}>
            <Route path="/create" element={<CreateListing />} />
          </Route>

          <Route path="/edit" element={<PrivateRoute />}>
            <Route path="/edit/:listingId" element={<EditListing />} />
          </Route>
        </Routes>
        <Footer />
      </Router>

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default App;
