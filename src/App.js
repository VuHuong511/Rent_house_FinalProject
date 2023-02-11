import React from "react";

//import Routes and route
import { Route, Routes } from "react-router-dom";

//import Component
import Footer from "./components/Footer";
import Header from "./components/Header";

//import pages
import Home from "./pages/Home";

const App = () => {
  return (
    <div class="max-w-[1440px] mx-auto bg-white">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/property/:id" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
