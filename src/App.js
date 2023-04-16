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
import WishList from "./pages/WishList/WishList";
import DepositDetail from "./pages/Deposit/DepositDetail";
import Deposit from "./pages/Deposit/Deposit";
import DepositSuccess from "./pages/Deposit/DepositSuccess";
import ReservationHistory from "./pages/ReservationHistory/ReservationHistory";
import ReservationDetail from "./pages/ReservationDetail/ReservationDetail";
import MyReservation from "./pages/MyReservation/MyReservation";
import Review from "./components/Review/Review";
import MyReservationDetail from "./components/MyReservationDetail/MyReservationDetail";

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
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/deposit-details" element={<DepositDetail />} />
          <Route path="/deposit" element={<Deposit />} />
          <Route path="/deposit-success" element={<DepositSuccess />} />
          <Route path="/reservation-history" element={<ReservationHistory />} />
          <Route path="/reservation-history" element={<ReservationHistory />} />
          <Route path="/my-reservation" element={<MyReservation />} />
          <Route path="/review-room/:id" element={<Review />} />
          <Route
            path="/my-reservation-details/:id"
            element={<MyReservationDetail />}
          />

          <Route
            path="/reservation-details/:id"
            element={<ReservationDetail />}
          />
          {/* <Route
            path="/review-room/:id"
            element={<ReviewRoom />}
          /> */}
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
