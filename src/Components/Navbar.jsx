import React, { useEffect, useState } from "react";
import needed3_removebg_preview from "../assets/needed3_removebg_preview.png";
import white_icon from "../assets/white_icon.svg";
import icons8_close from "../assets/icons8_close.svg";
import { Link, Links } from "react-router";
import  {jwtDecode}  from "jwt-decode";
import { FiLogOut, FiUser } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
    setIsOpen(false); // Close the dropdown after logging out
  };
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (showMobileMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showMobileMenu])
  const [loggedInUser, setLoggedInUser] = useState({});
  useEffect (()=>{
    function CheckToken(){
      const token = localStorage.getItem('token')
      if(token){
        setIsLoggedIn(true);
        const decoded = jwtDecode(token);
        setLoggedInUser(decoded);
      }else{

      }
      // console.log("token",token)
      
    }
    CheckToken()
  },[])
  return (
    <>
      {/* Computer Menu */}
      <div className="flex justify-between items-center px-5 bg-[#0A6E68] py-3">
        <img className="w-50" src={needed3_removebg_preview} alt="Logo" />
        <ul className="hidden md:flex space-x-5">
          <Link className="py-2 rounded-full text-white" to="/Home">
            Home
          </Link>
          <Link className="py-2 rounded-full text-white" to="/Products">
            Products
          </Link>
          <Link className="py-2 rounded-full text-white" to="/Projects">
            Projects
          </Link>
          {isLoggedIn && (
            <Link className="py-2 rounded-full text-white" to="/Purchase">
              My Purchase Order
            </Link>
          )}

          <Link className="py-2 rounded-full text-white" to="/Testimonials">
            Testimonials
          </Link>
        </ul>

        <div className="relative inline-block text-left ">
          {isLoggedIn ? (
            <>
              <button
                onClick={toggleDropdown}
                className="flex items-center focus:outline-none cursor-pointer text-2xl"
              >
                <FiUser className="text-5xl w-10 h-10 rounded-full p-2 border-2 border-gray-300 hover:border-gray-500" />
              </button>

              {isOpen && (
                <div className="absolute right-0 p-2 mt-2 w-48 bg-white shadow-lg justify-center rounded-lg text-xl">
                  <p className="text-sm text-gray-700 p-2">
                    {loggedInUser.email}
                  </p>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center cursor-pointer text-xl pl-2  mt-2 bg-red-500 text-white py-2 rounded hover:bg-red-600"
                  >
                    <FiLogOut className="mr-2 text-2xl " />
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <Link to="/Signin">
              <button className="hidden md:block bg-white px-8 py-2 rounded-full">
                Sign In
              </button>
            </Link>
          )}
        </div>

        <img
          className="md:hidden w-8 h-8 cursor-pointer"
          src={white_icon}
          alt="menu"
          onClick={() => setShowMobileMenu(true)}
        />
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-white transition-all transform ${
          showMobileMenu ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <div className="flex justify-end px-6 py-5">
          <img
            className="w-9 cursor-pointer"
            src={icons8_close}
            alt="close icon"
            onClick={() => setShowMobileMenu(false)}
          />
        </div>
        <ul className="flex flex-col justify-center items-center space-y-4">
          <Link
            className="py-2 text-black"
            to="/Home"
            onClick={() => setShowMobileMenu(false)}
          >
            Home
          </Link>

          <Link
            className="py-2 text-black"
            to="/Products"
            onClick={() => setShowMobileMenu(false)}
          >
            Products
          </Link>
          <Link
            className="py-2 text-black"
            to="/Projects"
            onClick={() => setShowMobileMenu(false)}
          >
            Projects
          </Link>
          {isLoggedIn && (
            <Link
              className="py-2 text-black"
              to="/Purchase"
              onClick={() => setShowMobileMenu(false)}
            >
              My Purchase Order
            </Link>
          )}
          <Link
            className="py-2 text-black"
            to="/Testimonials"
            onClick={() => setShowMobileMenu(false)}
          >
            Testimonials
          </Link>
          {isLoggedIn ? (
            <>
              <button
                onClick={toggleDropdown}
                className="flex items-center focus:outline-none cursor-pointer text-2xl"
              >
                <FiUser className="text-5xl w-10 h-10 rounded-full p-2 border-2 border-gray-300 hover:border-gray-500" />
              </button>

              {isOpen && (
                <div className="absolute right-0 p-2 mt-2 w-48 bg-white shadow-lg justify-center rounded-lg text-xl">
                  <p className="text-sm text-gray-700 p-2">
                    {loggedInUser.email}
                  </p>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center cursor-pointer text-xl pl-2  mt-2 bg-red-500 text-white py-2 rounded hover:bg-red-600"
                  >
                    <FiLogOut className="mr-2 text-2xl " />
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <Link to="/Signin">
              <button className="hidden md:block bg-white px-8 py-2 rounded-full">
                Sign In
              </button>
            </Link>
          )}
        </ul>
      </div>
    </>
  );
};
export default Navbar;
