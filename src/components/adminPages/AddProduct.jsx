import React from "react";
import { useForm } from "react-hook-form";
import { api } from "../../api";

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await api.post("/products", data);
      alert(response.data.name + " added successfully.");
    } catch (error) {
      console.log(error);
      alert("Oops! something went wrong..");
    }
  };

  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-7 col-md-9">
          <div className="border rounded p-4 shadow-lg bg-white">
            <div className="mb-4 text-center">
              <h2 className="fw-bold mb-2">Add Product</h2>
              <p className="text-muted mb-0">
                Enter the product details below.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label htmlFor="productName" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="productName"
                  placeholder="Enter product name"
                  {...register("name", {
                    required: "product name is required",
                  })}
                />
                <p className="text-danger">
                  {errors.name && errors.name.message}
                </p>
              </div>

              <div className="mb-3">
                <label htmlFor="productDescription" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="productDescription"
                  rows="4"
                  placeholder="Enter product description"
                  {...register("description", {
                    required: "please fill the description",
                  })}
                ></textarea>
                <p className="text-danger">
                  {errors.description && errors.description.message}
                </p>
              </div>

              <div className="mb-4">
                <label htmlFor="productPrice" className="form-label">
                  Price
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="productPrice"
                  placeholder="Enter product price"
                  {...register("price", {
                    required: "fill the price",
                  })}
                />
                <p className="text-danger">
                  {errors.price && errors.price.message}
                </p>
              </div>

              {/* Product Image */}

              <div class="mb-3">
                <label for="formFile" class="form-label">
                  image
                </label>
                <input class="form-control" type="file" id="formFile" />
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Add Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AddProduct;
