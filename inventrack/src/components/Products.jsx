import React, { useEffect, useState } from "react";

export default function Products() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch("http://localhost:5555/categories");
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data);
        }
        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory !== null) {
      const getProducts = async () => {
        try {
          const res = await fetch(
            `http://localhost:5555/categories/${selectedCategory}/products`
          );
          const data = await res.json();
          if (!res.ok) {
            throw new Error(data);
          }
          setProducts(data);
        } catch (error) {
          console.log(error);
        }
      };
      getProducts();
    }
  }, [selectedCategory]);

  const handleCategoryClick = (id) => {
    setSelectedCategory(id);
  };

  // Helper function to parse image URL from the string
  const parseImageUrl = (imageString) => {
    try {
      const imageArray = JSON.parse(imageString);
      return imageArray[0] || ""; // Return the first image URL if available
    } catch (error) {
      console.error("Error parsing image URL:", error);
      return "";
    }
  };

  return (
    <div>
      {selectedCategory === null ? (
        <div className="categories-list">
          {categories.map((category) => (
            <div
              key={category.id}
              className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
              onClick={() => handleCategoryClick(category.id)}
              style={{ cursor: "pointer" }}
            >
              <img
                className="rounded-t-lg"
                src={category.image_url}
                alt={category.name}
              />
              <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {category.name}
                </h5>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <button
            onClick={() => setSelectedCategory(null)}
            className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Back to Categories
          </button>
          <div className="products-list">
            {products.map((product) => (
              <div
                key={product.id}
                class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
              >
                <img
                  class="p-8 rounded-t-lg"
                  src={parseImageUrl(product.image)}
                  alt={product.name}
                />
                <div class="px-5 pb-5">
                  <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {product.name}
                  </h5>
                  <div class="flex items-center justify-between">
                  <span class="text-3xl font-bold text-gray-900 dark:text-white">${product.sp}</span>
            <a href="#" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to Orders</a>
        
                  </div>

                  
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
