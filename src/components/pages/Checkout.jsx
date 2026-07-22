import React, { useEffect, useState } from "react";
import { api } from "../../api";

function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [addresses, setAddresses] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const getCartItems = async () => {
    try {
      const response = await api.get("/cart");
      console.log(response.data.cartItems);
      setCartItems(response.data.cartItems);
    } catch (error) {
      alert("Something went wrong");
    }
  };

  useEffect(() => {
    getCartItems();
    getAddresses();
  }, []);

  const getTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    );
  };

  const getAddresses = async () => {
    try {
      const response = await api.get("/address");
      setAddresses(response.data);
    } catch (error) {
      alert("Something went wrong");
    }
  };

  const handlePayment = async () => {
    try {
      const response = await api.post(
        `/payment/create-order/${selectedAddress}`,
      );

      var options = {
        key: "rzp_test_S060WMnc2eFowe", // Enter the Key ID generated from the Dashboard
        amount: `${response.data.amount}`, // Amount is in currency subunits.
        currency: "INR",
        name: "Acme Corp",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: `${response.data.id}`, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler: function (response) {
          alert(response.razorpay_payment_id);
          alert(response.razorpay_order_id);
          alert(response.razorpay_signature);
        },
        prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "+919876543210",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      var rzp1 = new Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });
      document.getElementById("rzp-button1").onclick = function (e) {
        rzp1.open();
        e.preventDefault();
      };
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1> Checkout page</h1>
      <div className="row">
        <div className="col">
          <h3>Address</h3>
          <h5>Selected Address Id: {setSelectedAddress}</h5>
          {addresses ? (
            addresses.map((a) => {
              return (
                <div class="form-check m-4 p-3 border-dark">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value={a.id}
                    onChange={(e) => setSelectedAddress(e.target.value)}
                    id="checkDefault"
                  />
                  <label class="form-check-label" for="checkDefault">
                    <p>Name: {a.fullName}</p>
                    <p>Phone No: {a.phoneNo}</p>
                    <p>Address Line: {a.addressLine}</p>
                    <p>City: {a.city}</p> <p>State: {a.state}</p>
                    <p>Pincode: {a.pincode}</p>
                  </label>
                </div>
              );
            })
          ) : (
            <p>Loading....</p>
          )}
        </div>
        <div className="col">
          <h3>Product summary</h3>
          {/* summary table */}

          <table class="table table-bordered border-dark ">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems ? (
                cartItems.map((item) => (
                  <tr>
                    <th scope="row">{item.product.name}</th>
                    <td>{item.product.price}</td>
                    <td>{item.quantity}</td>
                    <td>{item.product.price * item.quantity}</td>
                  </tr>
                ))
              ) : (
                <p>No Products</p>
              )}
            </tbody>
            <tfoot>
              <tr>
                <h1>Total:{getTotal()}</h1>
              </tr>
            </tfoot>
          </table>

          {/* table ended */}

          <button
            id="rzp-button1"
            className="btn btn-primary"
            onClick={handlePayment}
          >
            Pay with Razorpay
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
