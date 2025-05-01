import React, { useEffect, useState } from "react";
import { assets,productData } from "../assets/assets";
import { Link } from "react-router";
import axios from "axios";
import { useNavigate } from "react-router";

const TrandingProducts = () => {
  const [products, setProducts] = useState([]);
  const url = "http://localhost:3001"; // Backend URL

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data } = await axios.get(`${url}/pr/trending`);
        setProducts(data.data);
        // console.log( data);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchProducts();
  }, []);
 const navigate = useNavigate()
  const handleBuy =  (e, item) => {
  // console.log(item)
  const checkToken = localStorage.getItem('token')
  if(!checkToken) return navigate(`/Signin`);
  navigate(`/Cards/${item._id}`)
  }
  return (
    <>
      <div className="bg-white w-full my-5 py-2">
        <h2 className="text-3xl text-center font-bold text-[#F6BE8F] mb-6">
          Tranding <span className="font-thin">Products</span>
        </h2>

        {/* Products grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full px-4">
          {products?.map((product) => (
            <div
              key={product._id}
              className="shadow-lg bg-gray-100 p-5 rounded-lg"
            >
              <img
                src={
                  product.Image ||
                  "https://cdn.globalso.com/rdsgarment/fitness3.jpg"
                }
                alt=""
                // className="w-full h-48 object-cover"
              />
              <h2 className="text-lg font-semibold mt-3">
                --{product.Category?.name}--
              </h2>
              <h2 className="text-lg font-semibold mt-3">{product?.Pname}</h2>
              <h3 className="text-gray-600">${product?.Price}</h3>
              {/* <Link to="/Cards" className="w-full md:w-auto"> */}
                <button className="bg-[#FCBED9] rounded-full px-6 py-2 mt-3 w-full hover:bg-[#fca5c9] transition" onClick={(e) => handleBuy(e, product)}>
                  Buy Now
                </button>
              {/* </Link> */}
            </div>
          ))}
        </div>

        {/* Button-ga hoose */}
        <div className="w-full flex justify-center p-8">
          <Link to="/Products" className="w-full md:w-auto">
            <button className="bg-[#FCBED9] text-white px-8 py-3 rounded-full w-full md:w-auto hover:bg-[#fca5c9] transition">
              All View Products
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default TrandingProducts;
