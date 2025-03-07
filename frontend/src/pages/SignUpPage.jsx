import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate()
   
  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setFormData({...formData, [name]:value})
  }

  const handleSubmit = async(e) => {
    e.preventDefault(); 

    try {
      console.log(formData)

      const response = await axios.post('http://localhost:3000/signup', formData);
      navigate('/')

    } catch (error) {
      console.log(error)
      alert(error.response.data.error || "something went wrong")
    }
   
  }
  return (
    <div className="h-screen flex justify-center items-center text-center">
      <div className="flex flex-col justify-center items-center text-center p-4">
        <h1 className="text-3xl font-bold py-6 text-blue-500">Sign Up Page</h1>
        <div>
          <form action="" onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div className="flex flex-col items-start">
              <label htmlFor="name" className="font-semibold ml-2 py-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                className="border-2 border-blue-200 hover:border-blue-400 w-[300px] h-10 rounded-lg p-2"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex flex-col items-start">
              <label htmlFor="username" className="font-semibold ml-2 py-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="UserName"
                className="border-2 border-blue-200 hover:border-blue-400 w-[300px] h-10 rounded-lg p-2"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex flex-col items-start">
              <label htmlFor="email" className="font-semibold ml-2 py-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                className="border-2 border-blue-200 hover:border-blue-400 w-[300px] h-10 rounded-lg p-2"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex flex-col items-start">
              <label htmlFor="password" className="font-semibold ml-2 py-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                className="border-2 border-blue-200 hover:border-blue-400 w-[300px] h-10 rounded-lg p-2"
                value={formData.password}
                onChange={(e)=>handleChange(e)}
                required
              />
            </div>

            <button
              type="submit"
              className=" flex justify-center border-2 h-10 mt-10 rounded-lg bg-blue-500 text-white items-center"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
