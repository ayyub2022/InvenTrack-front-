import React, { useEffect, useState } from "react";

export default function Instock() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState({});
  const [sales, setSales] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await fetch("http://localhost:5555/products");
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data);
        }
        setItems(data);
        fetchCategories();
        getSales();
      } catch (error) {
        console.log(error);
        setError("Failed to load items");
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:5555/categories");
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data);
        }
        const categoryMap = data.reduce((acc, category) => {
          acc[category.id] = category.name; // Adjust based on the actual response structure
          return acc;
        }, {});
        setCategories(categoryMap);
      } catch (error) {
        console.log(error);
        setError("Failed to load categories");
      }
    };

    const getSales = async () => {
      try {
        const res = await fetch("http://localhost:5555/product_sales");
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data);
        }
        const salesMap = data.reduce((acc, sale) => {
          acc[sale.product] = sale.total_quantity;
          return acc;
        }, {});
        setSales(salesMap);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError("Failed to load sales data");
      }
    };

    getItems();
  }, []);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="p-4">
                  <div class="flex items-center">
                    <input
                      id="checkbox-all-search"
                      type="checkbox"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label for="checkbox-all-search" class="sr-only">
                      checkbox
                    </label>
                  </div>
                </th>
                <th scope="col" class="px-6 py-3">
                  product ID
                </th>
                <th scope="col" class="px-6 py-3">
                  Product
                </th>
                <th scope="col" class="px-6 py-3">
                  Sales
                </th>
                <th scope="col" class="px-6 py-3">
                  Category
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr
                  key={index}
                  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td class="w-4 p-4">
                    <div class="flex items-center">
                      <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label for="checkbox-table-search-1" class="sr-only">
                        checkbox
                      </label>
                    </div>
                  </td>
                  <td class="px-6 py-4">{item.id}</td>
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.name}
                  </th>
                  <td class="px-6 py-4">{sales[item.name] || "No Sales"}</td>
                  <td class="px-6 py-4">
                    {categories[item.category_id] || "Loading..."}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
        </div>
      )}
    </>
  );
}