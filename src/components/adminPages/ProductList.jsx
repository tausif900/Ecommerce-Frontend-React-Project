import React, { useEffect, useState } from "react";
import { api } from "../../api";

const ProductList = () => {
  const [products, setProducts] = useState(null);

  // To fetch products
  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");
      setProducts(response.data);
    } catch (error) {
      alert("Oops! Something went wrong..");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      {products ? (
        <div>
          {
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Price</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => {
                  return (
                    <tr>
                      <th scope="row">{p.id}</th>
                      <td>{p.name}</td>
                      <td>{p.description}</td>
                      <td>{p.price}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          }
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductList;
