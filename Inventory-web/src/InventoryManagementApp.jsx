import React, { useState, useMemo, useEffect } from "react";
import ItemForm from "./components/ItemForm";
import "remixicon/fonts/remixicon.css";

const initialInventory = [
  { id: 1, name: "Laptop", category: "Electronics", quantity: 15, price: 1200 },
  { id: 2, name: "Keyboard", category: "Electronics", quantity: 8, price: 100 },
  { id: 3, name: "Desk Chair", category: "Furniture", quantity: 5, price: 250 },
  { id: 4, name: "Monitor", category: "Electronics", quantity: 12, price: 300 },
];

const InventoryManagementApp = () => {
  const [inventory, setInventory] = useState(() => {
    const savedInventory = localStorage.getItem("inventory");
    return savedInventory ? JSON.parse(savedInventory) : initialInventory;
  });
  //   const [inventory, setInventory] = useState(initialInventory);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "quantity",
    direction: "ascending",
  });

  useEffect(() => {
    localStorage.setItem("inventory", JSON.stringify(inventory));
  }, [inventory]);

  const categories = useMemo(
    () => ["All", ...new Set(inventory.map((item) => item.category))],
    [inventory]
  );

  const handleAddItem = (newItem) => {
    const existingItem = inventory.find((item) => item.name === newItem.name);
    if(existingItem){
      alert("Item already exists");
      return;
    }
    const itemWithId = { ...newItem, id: Date.now() };
    setInventory([...inventory, itemWithId]);
    setOpenAddDialog(false);
  };

  const handleEditItem = (editedItem) => {
    setInventory(
      inventory.map((item) => (item.id === editedItem.id ? editedItem : item))
    );
    setOpenEditDialog(false);
  };

  const handleDeleteItem = (id) => {
    setInventory(inventory.filter((item) => item.id !== id));
  };

  const handleSort = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "ascending"
        ? "descending"
        : "ascending";
    setSortConfig({ key, direction });
  };

  const sortedInventory = useMemo(() => {
    const sortedItems = [...inventory].sort((a, b) => {
      const parseValue = (value) => {
        if (typeof value !== "string") {
          value = value != null ? String(value) : "";
        }
        const match = value.match(/(\d+(\.\d+)?)/);
        return match ? parseFloat(match[0]) : 0;
      };

      const aValue = parseValue(a[sortConfig.key]);
      const bValue = parseValue(b[sortConfig.key]);

      if (aValue < bValue) return sortConfig.direction === "ascending" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "ascending" ? 1 : -1;
      return 0;
    });

    return sortedItems;
  }, [inventory, sortConfig]);
  

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };


  // const filteredInventory = useMemo(
  //   () =>
  //     sortedInventory.filter(
  //       (item) => categoryFilter === "All" || item.category === categoryFilter
  //     ),
  //   [sortedInventory, categoryFilter]
  // );

  const filteredInventory = useMemo(
    () =>
      sortedInventory.filter(
        (item) =>
          (categoryFilter === "All" || item.category === categoryFilter) &&
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [sortedInventory, categoryFilter, searchTerm]
  );


  return (
    <div className=" w-screen h-screen  bg-gradient-to-r from-purple-100 to-orange-100">
      <div className="container mx-auto p-6">
      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 animate-gradient-x mb-8 text-center tracking-widest animate-bounce">
        Manage Your Inventory
      </h1>

      <div className="flex justify-between items-center mb-6">
        <div className=" w-full flex justify-between items-center gap-5">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 justify-end py-4 border rounded-lg bg-gray-100 shadow focus:ring-2 focus:ring-purple-400 hover:ring-4 hover:ring-purple-300 transition-transform transform hover:scale-110 active:scale-95 overflow-hidden"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <input
        type="text"
        placeholder="Search Items"
        value={searchTerm}
        onChange={handleSearch}
        className="w-full px-4 py-5 rounded-lg transition-transform transform hover:scale-109 bg-gray-100 text-gray-800 placeholder-gray-500 shadow-md focus:ring-2 focus:ring-yellow-400 focus:outline-none"
        required
      />

        <button
          onClick={() => setOpenAddDialog(true)}
          className="relative px-10 py-3  bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-md transition-transform transform hover:scale-110"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-400 opacity-0 hover:opacity-20 transition-opacity"></span>
          <span className="relative">+ Add New Item</span>
        </button>
      </div>
        </div>

      <div className="overflow-x-auto rounded-lg shadow-xl border border-gray-300">
        <table className="w-full border-collapse  bg-gray-100 text-sm text-gray-800">
          <thead>
            <tr className="bg-gradient-to-r  from-purple-500 via-pink-500 to-orange-500 text-white">
              {["Name", "Category", "Quantity", "Price"].map((key) => (
                <th
                  key={key}
                  onClick={() => handleSort(key.toLowerCase())}
                  className="p-4 text-left cursor-pointer hover:bg-yellow-400 transition-all  "
                >
                  {key}
                  {sortConfig.key === key.toLowerCase() &&
                    (sortConfig.direction === "ascending" ? " ▲" : " ▼")}
                </th>
              ))}
              <th className="p-4 rounded-tr-lg">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInventory.map((item) => (
              <tr key={item.id} className={"border-b transition-transform transform hover:scale-102 hover:border-b-red-400 "}>
                <td className="p-4 ">{item.name}</td>
                <td className="p-4">{item.category}</td>
                <td
                  className={`p-4 ${
                    parseInt(item.quantity.match(/\d+/)[0]) < 10 
                      ? "text-red-600 font-bold" 
                      : ""
                   }`}
                >
                  {item.quantity}
                </td>
                <td className="p-4 font-semibold text-green-700">
                  ${item.price}
                </td>
                <td className="p-4 flex space-x-3">
                  <button
                    onClick={() => {
                      setCurrentItem(item);
                      setOpenEditDialog(true);
                    }}
                    className=" transition-transform transform hover:scale-150"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="transition-transform transform hover:scale-140"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {openAddDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70">
          <div className="rounded-xl shadow-xl w-96 bg-gradient-to-br from-purple-200 via-pink-100 to-white p-6 border border-purple-300 backdrop-blur-md">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
              Add New Item
            </h2>
            <ItemForm
              onSubmit={handleAddItem}
              onCancel={() => setOpenAddDialog(false)}
              initialValues={{
                name: "",
                category: "",
                quantity: "",
                price: "",
              }}
            />
          </div>
        </div>
      )}

      {openEditDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70">
          <div className="rounded-xl shadow-xl w-96 bg-gradient-to-br from-blue-200 via-teal-100 to-white p-6 border border-blue-300 backdrop-blur-md">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
              Edit Item
            </h2>
            <ItemForm
              onSubmit={handleEditItem}
              onCancel={() => setOpenEditDialog(false)}
              initialValues={currentItem}
            />
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default InventoryManagementApp;
