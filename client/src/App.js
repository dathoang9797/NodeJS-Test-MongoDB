import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Pages/Footer/Footer";
import Profiles from "./components/Pages/Profiles/Profiles";
import SignIn from "./components/Pages/Form/SignIn/SignIn";
import Update from "./components/Pages/Form/Update/Update";
import SignUp from "./components/Pages/Form/SignUp/SignUp";
import NotFound from "./components/NotFound/NotFound";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/profiles" element={<Profiles />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/update" element={<Update />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
