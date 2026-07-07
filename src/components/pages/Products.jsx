import React, { useEffect, useState } from "react";
import { api } from "../../api";

const Products = () => {
  const [products, setProducts] = useState(null);
  const [categories, setCategories] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");
      setProducts(response.data);
    } catch (error) {}
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get("/categories");
      setCategories(response.data._embedded.categories);
    } catch (error) {}
  };

  const fetchProductsBasedOnCategory = async (categoryId) => {
    const response = await api.get(`/categories/${categoryId}/products`);
    setProducts(response.data);
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchProductsBasedOnCategory();
  }, []);

  return (
    <div>
      {/* categories */}
      {categories ? (
        categories.map((c) => {
          return (
            <button
              className="btn btn-danger m-2"
              onClick={() => fetchProductsBasedOnCategory(c.id)}
            >
              {c.name}
            </button>
          );
        })
      ) : (
        <p>Loading...</p>
      )}
      <button className="btn btn-danger m-2" onClick={() => fetchProducts()}>
        All Products
      </button>
      {/* products */}
      {products ? (
        <div className="row row-cols-1 row-cols-md-4 g-4 p-3">
          {products.map((p) => {
            return (
              <div
                className="card h-100 shadow "
                style={{
                  border: "none",
                  borderRadius: "15px",
                  overflow: "hidden",
                }}
              >
                <img
                  src={`http://localhost:8080/products/get-image/${p.id}`}
                  alt="Product"
                  className="card-img-top"
                  style={{
                    height: "220px",
                    objectFit: "cover",
                  }}
                />

                <div className="card-body d-flex flex-column">
                  <h5
                    className="card-title fw-bold"
                    style={{ color: "#212529" }}
                  >
                    {p.name}
                  </h5>

                  <p
                    className="card-text text-muted"
                    style={{ fontSize: "14px" }}
                  >
                    {p.description}
                  </p>

                  <h4
                    className="text-success fw-bold"
                    style={{ marginBottom: "15px" }}
                  >
                    {p.price}
                  </h4>

                  <button
                    className="btn btn-primary mt-auto"
                    style={{
                      borderRadius: "25px",
                      fontWeight: "600",
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p>Loading........</p>
      )}
    </div>
  );
};

export default Products;
