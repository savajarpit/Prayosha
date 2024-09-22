import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import "../styles/cartpage.css";
import logowb1 from "../../photos/logowb1.png"

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
    window.scrollTo(0, 0);
  }, [cart]);

  // Handle quantity increase
  const handleIncQuantity = (id) => {
    
      setQuantities({ ...quantities, [id]: quantities[id] + 1 });
    
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

  const updatedCart = cart.map((item) => ({
    ...item,
    qnty: quantities[item._id] || 1,
  }));
  

  const uname = auth?.user?.name;
  const uphone = auth?.user?.phone;
  const uemail = auth?.user?.email;

  // Payment handler
  const paymentHandler = async (event) => {
    const amounts = totalamount() * 100;
    const response = await axios.post(`https://prayosha-backend.onrender.com/api/v1/payment/order`, {
      amount: amounts,
      currency: "INR",
      receipt: "1234567890"
    });

    const order = response.data;
    const options = {
      key: "",
      amount: amounts,
      currency: "INR",
      name: "Prayosha Oil",
      description: "Test Transaction",
      image: {logowb1},
      order_id: order.id,
      handler: async function (response) {
        

        const body = { ...response, cart: updatedCart, email: auth?.user?.email, totalbill: amounts, paymentstatus: "Success" };
        const validateResponse = await axios.post(`https://prayosha-backend.onrender.com/api/v1/payment/validate`, body);
        const jsonResponse = validateResponse.data;

        if (jsonResponse.msg === "ok") {
          localStorage.removeItem("cart");
          setCart([]);
          const rolePath = auth?.user?.role == 1 ? "admin" : "user";
          toast.success("Payment Successful!");
          navigate(`/dashboard/${rolePath}/orders`);
        } else {
          toast.error("Payment Failed!");
        }
      },
      prefill: {
        name: uname,
        email: uemail,
        contact: uphone,
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
    <Layout title={"cart-prayoshaoil"}>
      <div className="container containercart">
        <div className="row">
          <div className="col-md-12">
            <h3 className="text-center  p-2 mb-1">
            <span
              className="text-center storeh1"
              style={{
                fontFamily: "sans-serif",
                fontSize: "2rem",
                fontWeight: "500",
                display: "block", // Ensures the span takes up the full width
                marginBottom: "0.5rem", // Adds space between the text and the hr
              }}
            >
              {auth?.user?.name ? `Hello! ${auth?.user?.name}`:"Shopping Cart"}
            </span>
            <div style={{ textAlign: "center" }}>
              {" "}
              {/* Ensures hr is centered */}
              <hr
                className="sline"
                style={{
                  backgroundColor: "blue",
                  border: "none",
                  borderRadius: ".5rem",
                  height: ".2rem",
                  width: "15%", // Adjust this if needed
                  margin: "0 auto", // Centers the hr element
                  marginTop: "0", // Removes any extra margin above the hr
                }}
              />
             </div>
            </h3>
            <h6 className="text-center">
              {cart?.length
                ? `You Have ${cart.length} items in your cart ${
                    auth?.token ? "" : "please login to checkout"
                  }`
                : "Your Cart Is Empty 🥺"}
            </h6>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            {cart?.map((p) => (
              <div className="row mb-2 p-3 card flex-row" key={p._id}>
                <div className="col-md-4">
                  <img
                    src={`https://prayosha-backend.onrender.com/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    width="100%"
                    height="100%"
                  />
                </div>
                <div className="col-md-8">
                  
                  <h4 className="cartproductname">{p.name}</h4>
                  <p>Description : {p.description}</p>
                  
                  <p><span>Size : {p.quantity
                  } Ltr.</span></p>
                  {/* <p>Quantity : {quantities[p._id]}</p> */}
                  <p className="cartItemPrice">Rs. {p.price}/<small>{p.quantity
                  } Ltr.</small></p>
                  <p className="cartTotalPriceDetails">Total Price : <span className="priceCalculus">Rs. {p.price}/<small>{p.quantity
                  } Ltr.</small> X {quantities[p._id]}</span>          <span className="TotalPriceText" style={{marginLeft:"2px",color:"#04446f",fontFamily:"Open Sans, sans-serif",fontStyle:"normal",fontSize:"1.3rem"}}>Rs.{p.price*quantities[p._id]}</span></p>
                  <button className="btn btn-warning" onClick={() => handleIncQuantity(p._id)}>+</button>
                  <input
                    type="number"
                    className="ms-2 yeloinput"
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
          
          {cart?.length > 0 && (
            <div className="col-md-4 text-center">
              <h2 className="cartsummaryh2">Cart Summary</h2>
              <p>Total | Checkout | Payment</p>
              <hr />
              <h4 className="cartsummaryh4">Total: {totalPrice()}</h4>
              
              {auth?.user?.address ? (
                <div className="mb-3">
                  <h5>Current Address</h5>  
                  <h6>{auth?.user?.address}</h6>
                  <button
                    className="btn paybutton1"
                    onClick={() =>
                    //  navigate(`/dashboard/${auth?.user?.role == 1 ? "admin/orders" : "user/orders"}`)
                    { console.log("User Role:", auth?.user?.role);
                      if (auth?.user?.role == 1) {
                        navigate("/dashboard/admin/profile");
                      } else if (auth?.user?.role == 0) {
                        navigate("/dashboard/user/profile");
                      } else {
                        navigate("/dashboard"); // Fallback if the role is undefined
                      }  
                    }
                      // navigate(`/dashboard/${auth?.user?.role === 1 ? "admin/profile" : "user/profile"}`)
                    }
                  >
                    Update Address
                  </button>
                  <br />
                  <button className="btn me-2 mt-2 paybutton2" onClick={()=>{navigate("/store")}}>Continue Shopping</button>
                  <button className="btn paybutton mt-2" onClick={paymentHandler}>
                    Checkout
                  </button>
                </div>
              ) : (
                <div className="mb-3">
                  {auth?.token ? (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() =>
                        navigate('/dashboard/admin/orders')
                      }
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/login", {
                        state: "/cart"
                      })}
                    >
                      Plase Login to Checkout
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
