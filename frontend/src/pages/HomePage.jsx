import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Searchbar from "../components/Searchbar";
import Users from "../components/Users";

const HomePage = () => {
  const [searchText, setSearchText] = useState()
  return (
    <header>
      <Navbar />
      <Searchbar searchText = {searchText} setSearchText = {setSearchText} />
      <Users />
    </header>
  );
};

export default HomePage;
