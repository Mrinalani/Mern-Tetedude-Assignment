import React from "react";
import Navbar from "../components/Navbar";
import Searchbar from "../components/Searchbar";
import Users from "../components/Users";

const HomePage = () => {
  return (
    <header>
      <Navbar />
      <Searchbar />
      <Users />
    </header>
  );
};

export default HomePage;
