import React, { useEffect, useState } from "react";
import { api } from "../../api";

const ProductList = () => {
  const [products, setProducts] = useState(null);

  // To fetch products
  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");
      console.log(response.data);
    } catch (error) {
      alert("Oops! Something went wrong..");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return <div>Product List</div>;
};

export default ProductList;
