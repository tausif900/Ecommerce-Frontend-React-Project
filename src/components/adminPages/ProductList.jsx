import React, { useEffect, useState } from "react";
import { api } from "../../api";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const ProductList = () => {
  const [products, setProducts] = useState(null);
  const [categories, setCategories] = useState(null);
  const [productId, setProductId] = useState(null);
  const { register, handleSubmit, reset } = useForm(); //reset helps to set the fields of the form.

  // To fetch products
  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");
      setProducts(response.data);
    } catch (error) {
      toast.error("Oops! Something went wrong..");
    }
  };

  // To Delete products
  const deleteProduct = async (id) => {
    const response = await api.delete(`/products/${id}`);
    // waps se fetchProduct ko call kro and product ko render kro...
    fetchProducts();
  };

  // To update products
  const updateProduct = async (data) => {
    try {
      const response = await api.put(`/products/${productId}`, data);
      fetchProducts();
      toast.success("Product updates successfully!");
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const assignCategory = async (productId, categoryId) => {
    try {
      const response = await api.put(
        `/categories/${categoryId}/products/${productId}`,
        toast.success("category updated"),
      );
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  // To fetch Categories
  const fetchCategories = async () => {
    try {
      const response = await api.get("/categories");
      setCategories(response.data._embedded.categories);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  return (
    <div>
      <h2>Total Products: {products && products.length}</h2>

      {/* update product */}
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5 text-center" id="exampleModalLabel">
                Update Product
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form action="" onSubmit={handleSubmit(updateProduct)}>
                <div class="input-group mb-3">
                  <span class="input-group-text" id="inputGroup-sizing-default">
                    Name
                  </span>
                  <input
                    type="text"
                    class="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                    {...register("name", {})}
                  />
                </div>

                <div class="input-group mb-3">
                  <span class="input-group-text" id="inputGroup-sizing-default">
                    Description
                  </span>
                  <input
                    type="text"
                    class="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                    {...register("description")}
                  />
                </div>

                <div class="input-group mb-3">
                  <span class="input-group-text" id="inputGroup-sizing-default">
                    Price
                  </span>
                  <input
                    type="text"
                    class="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                    {...register("price")}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

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
                  <th scope="col">Category</th>
                  <th scope="col">Action</th>
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
                      <td>
                        <div class="input-group mb-3">
                          <select
                            class="form-select"
                            id="inputGroupSelect01"
                            onChange={(e) =>
                              assignCategory(p.id, e.target.value)
                            }
                          >
                            <option selected>Select Category...</option>
                            {categories &&
                              categories.map((category) => {
                                return (
                                  <option
                                    value={category.id}
                                    selected={
                                      p.category &&
                                      p.category.id == category.id
                                    }
                                  >
                                    {category.id}
                                    {category.name}
                                  </option>
                                );
                              })}
                          </select>
                        </div>
                      </td>
                      <td>
                        <button
                          className="btn btn-success m-2"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          onClick={() => {
                            setProductId(p.id);
                            reset({
                              name: p.name,
                              description: p.description,
                              price: p.price,
                            });
                          }}
                        >
                          Update
                        </button>
                        <button
                          className="btn btn-danger m-2"
                          onClick={() => deleteProduct(p.id)}
                        >
                          Delete
                        </button>
                      </td>
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
