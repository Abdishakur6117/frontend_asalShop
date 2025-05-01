import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Puff } from "react-loader-spinner";

const Cards = () => {
  const [product,setProduct]= useState({})
  const [paymentNumber, setPaymentNumber] = useState("");
  const [Qty, setQty] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const url = "http://localhost:3001";
  const {id}=useParams()
  // console.log(id)
  // const handlePayment = (e) => {
  //   e.preventDefault();
  //   if (phone.length < 10) {
  //     alert("Please enter a valid phone number.");
  //     return;
  //   }
  //   alert("Payment Successful!");
  // };
useEffect((e)=>{

  async function getProduct(){
    try {
      const {data} = await axios.get(url+'/pr/'+id)
      // console.log(data)
      setProduct(data)
    } catch (error) {
      console.log(error)
    }
  }
  getProduct()
},[])

const handleQtyChange=(type)=>{
  const change = type === "increase" ? Qty + 1 : Math.max(1, Qty - 1);
  setQty(change);
}
const totalAmount = product.Price * Qty;

const pay=async(e)=>{
  e.preventDefault();
  const postdata = {
    accountNo: paymentNumber,
    amount: totalAmount,
    Qty,
    productId:id
  }
  setIsLoading(true);
  try{
      const { data } = await axios.post(url+'/order', postdata,
        { headers:{
          'Content-Type': 'application/json',
          'token':localStorage.getItem('token')
        },
      }
      );
      setIsLoading(false);
      console.log("called", data);
  }catch(error){
    setIsLoading(false);
  }

}
return (
  <div className="max-w-4xl mx-auto my-8 p-5 font-sans grid grid-cols-2 gap-6">
    {/* Left Section: Cart Items */}
    <div>
      <h1 className="text-2xl font-bold pb-3 p-3 bg-white">Your Cart</h1>
      <div className="flex bg-white p-4 justify-between items-center border-b pb-3">
        <div>
          <span className="text-gray-800 block">{product?.Pname}</span>
          <span className="text-gray-600">${product?.Price} Each</span>
        </div>
        <div className="flex items-center">
          <button
            onClick={() => handleQtyChange("decrease")}
            className="px-3 py-1 border rounded-l bg-gray-200 hover:bg-gray-300"
          >
            -
          </button>
          <span className="px-4 py-1 border-t border-b">{Qty}</span>
          <button
            onClick={() => handleQtyChange("increase")}
            className="px-3 py-1 border rounded-r bg-gray-200 hover:bg-gray-300"
          >
            +
          </button>
        </div>
      </div>
    </div>

    {/* Right Section: Order Summary */}
    <div className="bg-white shadow-md p-5 rounded-lg">
      <h3 className="text-xl font-semibold mb-2">Order Summary</h3>
      <div className="flex justify-between font-bold mb-4">
        <span>Total:</span>
        <span>${totalAmount}</span>
      </div>
      <form
        onSubmit={(e) => setPayment(e.target.value)}
        className="flex flex-col gap-3"
      >
        <label className="text-sm font-medium">Enter Phone</label>
        <input
          type="tel"
          id="phone"
          placeholder="Enter Phone"
          value={paymentNumber}
          onChange={(e) => setPaymentNumber(e.target.value)}
          className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition-colors"
          onClick={pay}
          // onClick={(e) => pay(e)}
        >
          {isLoading ? (
            <div className="flex justify-center">
              <Puff
                visible={true}
                height="30"
                width="30"
                color="#ffff"
                ariaLabel="puff-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
          ) : (
            <>Proceed to Pay</>
          )}
        </button>
      </form>
    </div>
  </div>
);
};

export default Cards;
