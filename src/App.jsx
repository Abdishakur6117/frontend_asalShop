import React from "react";
import Navbar from "./Components/Navbar";
import { Route, Routes } from "react-router";
import Home from "./Pages/Home";
import Products from "./Pages/Products";
import Projects from "./Pages/Projects";
import Testimonials from "./Pages/Testimonials";
import Signin from "./Pages/Signin";
import SignUp from "./Pages/SignUp";
import Cards from "./Components/Cards";
import Purchase from "./Pages/Purchase";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/Projects" element={<Projects />} />
        <Route path="/Testimonials" element={<Testimonials />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Cards" element={<Cards />} />
        <Route path="/Cards" element={<Cards />} />
        <Route path="/cards/:id" element={<Cards />} />
        <Route path="/Purchase" element={<Purchase />} />
      </Routes>
    </>
  );
};
export default App;
