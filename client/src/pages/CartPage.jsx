import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  
  // State to manage quantities, initialized to 1 for each item
  const [quantities, setQuantities] = useState({});

  // Initialize quantities when cart changes
  useEffect(() => {
    const initialQuantities = cart.reduce((acc, item) => {
      acc[item._id] = 1;
      return acc;
    }, {});
    setQuantities(initialQuantities);
  }, [cart]);

  // Handle quantity increase
  const handleIncQuantity = (id) => {
    if (quantities[id] < 5) {
      setQuantities({ ...quantities, [id]: quantities[id] + 1 });
    }
  };

  // Handle quantity decrease
  const handleDecQuantity = (id) => {
    if (quantities[id] > 1) {
      setQuantities({ ...quantities, [id]: quantities[id] - 1 });
    }
  };

  // Handle quantity input change
  const handleInputChange = (id, event) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value >= 1 && value <= 5) {
      setQuantities({ ...quantities, [id]: value });
    }
  };

  // Total price calculation
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        total += item.price * (quantities[item._id] || 1);
      });
      return total.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
      return "₹0.00";
    }
  };

  const totalamount = () => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        total += item.price * (quantities[item._id] || 1);
      });
      return total;
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  // Delete item
  const removeCartItem = (pid) => {
    try {
      const myCart = cart.filter((item) => item._id !== pid);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
      const newQuantities = { ...quantities };
      delete newQuantities[pid];
      setQuantities(newQuantities);
    } catch (error) {
      console.log(error);
    }
  };

  // Payment handler
  const paymentHandler = async (event) => {
    const amounts = totalamount() * 100;
    const response = await axios.post(`${import.meta.env.VITE_APIS}/api/v1/payment/order`, {
      amount: amounts,
      currency: "INR",
      receipt: "1234567890"
    });

    const order = response.data;
    const options = {
      key: "",
      amount: amounts,
      currency: "INR",
      name: "arpit savaj",
      description: "Test Transaction",
      image: "https://i.ibb.co/5Y3m33n/test.png",
      order_id: order.id,
      handler: async function (response) {
       
          const updatedCart = cart.map((item) => ({
            ...item, 
            qnty: quantities[item._id] || 1, 
          }))
          setCart(updatedCart); // Update the cart with the new array
     localStorage.setItem("cart", JSON.stringify(updatedCart));


        const body = { ...response, cart: updatedCart, email: auth?.user?.email,totalbill:amounts,paymentstatus:"Success" };
        const validateResponse = await axios.post(`${import.meta.env.VITE_APIS}/api/v1/payment/validate`, body);
        const jsonResponse = validateResponse.data;

        if (jsonResponse.msg === "ok") {
          localStorage.removeItem("cart");
          setCart([]);
          const rolePath = auth?.user?.role === 1 ? "admin" : "user";
          toast.success("Payment Successful!");
          navigate(`/dashboard/${rolePath}/orders`);
        } else {
          toast.error("Payment Failed!");
        }
      },
      prefill: {
        name: "arpit savaj",
        email: "aj@example.com",
        contact: "9000000000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      toast.error("Payment Failed");
    });

    rzp1.open();
    event.preventDefault();
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length
                ? `You Have ${cart.length} items in your cart ${
                    auth?.token ? "" : "please login to checkout"
                  }`
                : "Your Cart Is Empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            {cart?.map((p) => (
              <div className="row mb-2 p-3 card flex-row" key={p._id}>
                <div className="col-md-4">
                  <img
                    src={`${import.meta.env.VITE_APIS}/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    width="100px"
                    height="100px"
                  />
                </div>
                <div className="col-md-8">
                  <p>{p.name}</p>
                  <p>{p.description.substring(0, 30)}</p>
                  <p>Price: {p.price}</p>
                  <p>Quantity: {quantities[p._id]}</p>
                  <button className="btn btn-warning" onClick={() => handleIncQuantity(p._id)}>+</button>
                  <input
                    type="number"
                    className="ms-2"
                    value={quantities[p._id]}
                    onChange={(e) => handleInputChange(p._id, e)}
                    style={{ width: "50px", textAlign: "center" }}
                  />
                  <button className="btn btn-warning ms-2 me-2" onClick={() => handleDecQuantity(p._id)}>-</button>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeCartItem(p._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 text-center">
            <h2>Cart Summary</h2>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4>Total: {totalPrice()}</h4>
            {auth?.user?.address ? (
              <div className="mb-3">
                <h4>Current Address</h4>
                <h5>{auth?.user?.address}</h5>
                <button
                  className="btn btn-outline-warning"
                  onClick={() =>
                    navigate(`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}/orders`)
                  }
                >
                  Update Address
                </button>
                <br />
                <button className="btn btn-outline-warning mt-2" onClick={paymentHandler}>
                  Pay
                </button>
              </div>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() =>
                      navigate(`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}/profile`)
                    }
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Please Login to Checkout
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
