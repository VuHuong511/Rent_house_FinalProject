import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Pricing from "./components/Pricing/Pricing";

import Services from "./components/Service/Service";
import About from "./components/About/About";
import Blog from "./components/Property/Property";
import Contact from "./components/Contact/Contact";
import Header from "./components/Common/Header/Header";
import Footer from "./components/Common/Footer/Footer";
import Pages from "./components/Home";
import LogIn from "./pages/Login/LogIn";
import MyListing from "./pages/MyListing/MyListing";
import Register from "./pages/Register/Register";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Profile from "./pages/Profile/Profile";

import PrivateRoute from "./components/PrivateRoute";
import Homelogin from "./pages/HomeLogin";
import CreateListing from "./pages/Create/Create";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditListing from "./pages/Edit/Edit";
import Listing from "./pages/Listing/Listing";
import HomeLogin from "./pages/HomeLogin";
import Offer from "./pages/Offer";
import Type from "./pages/Type";
import Property from "./components/Property/Property";
import AdminOnlyRoute from "./components/AdminOnlyRoute/AdminOnlyRoute";
import Admin from "./pages/Admin/Admin";

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route
            path="/admin/*"
            element={
              <AdminOnlyRoute>
                <Admin />
              </AdminOnlyRoute>
            }
          />
          <Route path="/" element={<Pages />} />
          <Route path="/homelogin" element={<Homelogin />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/property" element={<Property />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<CreateListing />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/myListing" element={<MyListing />} />
          <Route path="/offers" element={<Offer />} />
          <Route path="/category/:categoryName" element={<Type />} />
          <Route path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/create" element={<PrivateRoute />}>
            <Route path="/create" element={<CreateListing />} />
          </Route>
          <Route path="/edit" element={<PrivateRoute />}>
            <Route path="/edit/:listingId" element={<EditListing />} />
          </Route>
          <Route
            path="/category/:listingName/:listingId"
            element={<Listing />}
          />
          <Route path="/homeLogin" element={<HomeLogin />} />
        </Routes>
        <Footer />
      </Router>

      <ToastContainer
        position="bottom-center"
        autoClose={2000}
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
