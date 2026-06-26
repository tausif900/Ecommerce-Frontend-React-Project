import React from "react";

const AddProduct = () => {
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

            <form>
              <div className="mb-3">
                <label htmlFor="productName" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="productName"
                  placeholder="Enter product name"
                />
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
                ></textarea>
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
                />
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
