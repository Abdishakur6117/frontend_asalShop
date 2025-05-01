import axios from 'axios';
import React, { useState } from 'react'
import { Link,  } from "react-router";
import { toast, ToastContainer } from 'react-toastify';
const Signin = () => {
    const url = "http://localhost:3001";
  const [values,setValues] = useState()
  const handleChange=(e)=>{
    setValues({...values,[e.target.id]:e.target.value})
  }
  const onSubmit=async(e)=>{
    e.preventDefault()
    const { data } = await axios.post(`${url}/user/login`,values);
    // console.log(values)
    if(data.status==true){
      localStorage.setItem('token',data.token)
      toast(data.message)
      window.location.reload();
    }else{
      toast.error(data.message)
    }
  }
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <form
          onSubmit={(e) => onSubmit(e)}
          className="bg-white p-8 rounded shadow-md w-80"
        >
          <ToastContainer />
          <h1 className="text-2xl font-bold mb-6">Sign in to your account</h1>

          <input
            type="email"
            id="email"
            placeholder="Email address"
            onChange={(e) => handleChange(e)}
            className="w-full mb-4 p-2 border rounded"
            required
          />

          <input
            type="password"
            id="password"
            placeholder="Password"
            onChange={(e) => handleChange(e)}
            className="w-full mb-6 p-2 border rounded"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Sign In
          </button>

          <p className="mt-4 text-center">
            Already have an account?{" "}
            <Link to="/SignUp" className="text-blue-500 hover:underline">
              Create account
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default Signin