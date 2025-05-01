import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";

const Purchase = () => {
  const [myPurchase, setMyPurchase] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false); // For loading state
  const [error, setError] = useState(null); // For error state
  const url = "http://localhost:3001";

  useEffect(() => {
    async function getMyPurchase() {
      setLoading(true);
      try {
        const { data } = await axios.get(`${url}/order/ByLoggedInUser`, {
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
        });
        setMyPurchase(data);
      } catch (error) {
        setError("Failed to fetch purchases");
      } finally {
        setLoading(false);
      }
    }
    getMyPurchase();
  }, []); // Empty dependency array to run only once after component mount

  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  // If loading, show a loading spinner/message
  if (loading) {
    return <div>Loading...</div>;
  }

  // If there is an error fetching data
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Your Purchase Summary
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300 shadow-lg">
          <thead>
            <tr>
              <th className="border-b px-4 py-2 text-left">Item</th>
              <th className="border-b px-4 py-2 text-left">Quantity</th>
              <th className="border-b px-4 py-2 text-left">Price </th>
              <th className="border-b px-4 py-2 text-left">Total </th>
              <th className="border-b px-4 py-2 text-left">createdAt</th>
              <th className="border-b px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {myPurchase?.map((item) => (
              <tr key={item._id} className="border-b">
                <td className="px-4 py-2">{item?.productId?.Pname}</td>
                <td className="px-4 py-2">{item?.Qty}</td>
                <td className="px-4 py-2">{item?.productId?.Price}</td>
                <td className="px-4 py-2">{item?.TotalAmount}</td>
                <td className="px-4 py-2">
                  {moment(item?.createdAt).format("L")}
                </td>
                <td className="px-4 py-2">
                  <button
                    className="cursor-pointer"
                    onClick={() => openModal(item)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
              <h2 className="text-2xl font-semibold mb-4">Item Details</h2>
              <form>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Item Name
                  </label>
                  <input
                    type="text"
                    value={selectedItem?.productId?.Pname}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    disabled
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Quantity
                  </label>
                  <input
                    type="number"
                    value={selectedItem?.Qty}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    disabled
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Price
                  </label>
                  <input
                    type="text"
                    value={selectedItem?.productId?.Price}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    disabled
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Total Amount
                  </label>
                  <input
                    type="text"
                    value={selectedItem?.TotalAmount}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    disabled
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Created At
                  </label>
                  <input
                    type="text"
                    value={moment(selectedItem?.createdAt).format("L")}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    disabled
                  />
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    
                  >
                    Print
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Purchase;
