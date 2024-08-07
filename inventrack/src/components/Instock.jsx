import React, { useEffect, useState } from "react";

export default function Instock() {
  const [items, setItems] = useState([]);

  const getItems = async () => {
    try {
      const res = await fetch("http://localhost:5555/products");
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data);
      }
      setItems(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getItems();
  }, []);
  return <>{items ? "products" : <div>
    
    </div>}</>;
}
