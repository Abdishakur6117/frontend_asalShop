import axios from 'axios';
import React, { useState } from 'react'
import { Link } from "react-router";
import { toast, ToastContainer } from 'react-toastify';

const SignUp = () => {
  const url = "http://localhost:3001";
  const [values, setValues] = useState({});
  const handleChange = (event) => {
    setValues({ ...values, [event.target.id]: event.target.value });
    // console.log(event.target.id, event.target.value);
  }
  // console.log(values)
  const onSubmit= async(e)=>{
    e.preventDefault();
    const {data} = await axios.post(`${url}/user`,values)
    // console.log(data);
    if(data.status== true){

      toast(data.message)
    }else{
      toast.error(data.message)
    }
  }
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <ToastContainer />
        <form
          onSubmit={(event) => onSubmit(event)}
          className="bg-white p-8 rounded shadow-md w-80"
        >
          <h1 className="text-2xl font-bold mb-6">Create an account</h1>

          <input
            type="text"
            id="name"
            placeholder="fullname"
            onChange={(event) => handleChange(event)}
            className="w-full mb-4 p-2 border rounded"
            required
          />
          <input
            type="text"
            id="username"
            placeholder="username"
            onChange={(event) => handleChange(event)}
            className="w-full mb-4 p-2 border rounded"
            required
          />

          <input
            type="email"
            id="email"
            placeholder="Email address"
            onChange={(event) => handleChange(event)}
            className="w-full mb-4 p-2 border rounded"
            required
          />

          <input
            type="password"
            id="password"
            placeholder="Password"
            onChange={(event) => handleChange(event)}
            className="w-full mb-6 p-2 border rounded"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Sign Up
          </button>

          <p className="mt-4 text-center">
            Already have an account?{" "}
            <Link to="/Signin" className="text-blue-500 hover:underline">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default SignUp