import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const Products = () => {
  const [products, setProducts] = useState([]);
  const url = "http://localhost:3001"; // Backend URL

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data } = await axios.get(`${url}/pr`);
        setProducts(data);
        // console.log( data);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchProducts();
  }, []); // Empty dependency array
  const navigate = useNavigate()
  const handleBuy =  (e, item) => {
  // console.log(item)
  const checkToken = localStorage.getItem('token')
  if(!checkToken) return navigate(`/Signin`);
  navigate(`/Cards/${item._id}`)
  }
  return (
    <div className="bg-white w-full my-5 py-2">
      <h2 className="text-3xl text-center font-bold text-[#F6BE8F] mb-6">
        All <span className="font-thin">Products</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full px-4">
        {products?.map((product, index) => (
          <div key={index} className="shadow-lg bg-gray-100 p-5 rounded-lg">
            <img
              src={
                product.Image ||
                "https://cdn.globalso.com/rdsgarment/fitness3.jpg"
              }
              alt=""
              // className="w-full h-48 object-cover"
            />
            <h2 className="text-lg font-semibold mt-3">
              --{product?.Category?.name}--
            </h2>
            <h2 className="text-lg font-semibold mt-3">{product?.Pname}</h2>
            <h3 className="text-gray-600">${product?.Price}</h3>
            <button
              className="bg-[#FCBED9] rounded-full px-6 py-2 mt-3 w-full hover:bg-[#fca5c9] transition"
              onClick={(e) => handleBuy(e, product)}
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
