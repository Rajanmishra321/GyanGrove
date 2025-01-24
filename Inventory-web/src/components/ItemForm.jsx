import React, { useState } from "react";

const ItemForm = ({ onSubmit, initialValues, onCancel }) => {
    const [formData, setFormData] = useState(initialValues);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(formData);
    };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-8 bg-gradient-to-br  from-purple-500 via-pink-500 to-orange-500 rounded-b-lg shadow-lg text-white"
    >

      <input
        type="text"
        placeholder="Enter Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="w-full px-4 py-3 rounded-lg bg-gray-100 text-gray-800 placeholder-gray-500 shadow-md focus:ring-2 focus:ring-yellow-400 focus:outline-none"
        required
      />

      <input
        type="text"
        placeholder="Enter Category"
        value={formData.category}
        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        className="w-full px-4 py-3 rounded-lg bg-gray-100 text-gray-800 placeholder-gray-500 shadow-md focus:ring-2 focus:ring-yellow-400 focus:outline-none"
        required
      />

      <input
        type="text"
        placeholder="Enter Quantity"
        value={formData.quantity}
        onChange={(e) =>
          setFormData({ ...formData, quantity: (e.target.value) })
        }
        className="w-full px-4 py-3 rounded-lg  bg-gray-100 text-gray-800 placeholder-gray-500 shadow-md focus:ring-2 focus:ring-yellow-400 focus:outline-none"
        required
      />

      <input
        type="Number"
        placeholder="Enter Price"
        value={formData.price}
        onChange={(e) =>
          setFormData({ ...formData, price: Number(e.target.value) })
        }
        className="w-full px-4 py-3 rounded-lg bg-gray-100 text-gray-800 placeholder-gray-500 shadow-md focus:ring-2 focus:ring-yellow-400 focus:outline-none"
        required
      />

      <div className="flex justify-between space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="w-full py-3  bg-gradient-to-r from-purple-100 to-orange-100 text-gray-800 rounded-lg shadow-lg hover:bg-yellow-500 transition-all duration-200 ease-in-out"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="w-full py-3  bg-gradient-to-r from-purple-100 to-orange-100 text-gray-900 rounded-lg shadow-lg hover:bg-yellow-500 transition-all duration-200 ease-in-out"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default ItemForm;
