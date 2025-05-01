import React from "react";
import Header from "../Components/Header";
import TrandingProducts from "../Components/TrandingProducts";
const Home = () => {
  return (
    <>
      {/* <div>
        <div className="flex justify-end">
          <div className="container mx-auto py-5 px-5 ">
            <h2 className="text-white font-bold text-5xl ml-3 pt-4 ">
              We have more than
              <span className="block text-[#FCBED9] font-thin pt-4 ml-3">your expectations</span>
            </h2>
            <h3 className="text-5xl text-white font-bold my-5 ml-5 ">75% Off</h3>
            <button className=" bg-[#FCBED9] rounded-full px-4 py-2 font-thin text-lg ml-5">
              Shop Now
            </button>
          </div>
          <img className="w-[700px]" src="" alt="Logo" />
        </div>
      </div> */}
      <Header />
      <TrandingProducts/>
    </>
  );
};
export default Home;
