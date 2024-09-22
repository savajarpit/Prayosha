import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import Usermenu from "../../components/Layout/Usermenu";
import axios from "axios";
import { useAuth } from "../../context/auth";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `https://prayosha-backend.onrender.com/api/v1/auth/orders`
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
    window.scrollTo(0, 0);
  }, [auth?.token]);

  return (
    <Layout title={"UserDashboard - Orders"}>
      <div className="container-fluid mt-4 ">
        <div className="row">
          <div className="col-md-3 container">
            <Usermenu />
          </div>
          <div className="col-md-9 container ">
            <h3 className="text-center mt-3">All Orders</h3>
            {orders?.map((o, i) => (
              <div
                className="border shadow mb-4 container-fluid "
                key={o._id}
                style={{}}
              >
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Shipping Address</th>
                        <th scope="col">Items</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>{o?.status}</td>
                        <td>{o?.buyer?.name}</td>
                        <td>
                          {dayjs(o?.createdAt).format("DD MMM YYYY, h:mm A")}
                        </td>
                        <td>
                          ₹{o?.totalbill}
                          <span
                            className="badge rounded-pill bg-success"
                            style={{ marginLeft: "2px" }}
                          >
                            Success
                          </span>
                        </td>
                        <td>{o?.buyer?.address}</td>
                        <td>{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="container-fluid">
                  {o?.products?.map((p, i) => {
                    const cartItem = o.payment.cart[i];
                    return (
                      <div className="row mb-2 p-3 card flex-row " key={p._id}>
                        <div className="col-md-4 col-sm-12">
                          <img
                            src={`https://prayosha-backend.onrender.com/api/v1/product/product-photo/${p._id}`}
                            className="card-img-top"
                            alt={p.name}
                            width="100%"
                            height="100%"
                          />
                        </div>
                        <div className="col-md-8 col-sm-12 container">
                          <h4 className="cartproductname">{p.name}</h4>
                          <p>Description: {p.description}</p>
                          <p>
                            <span>Size: {p.quantity} Ltr.</span>
                          </p>
                          <p className="cartItemPrice">
                            Rs. {p.price}/<small>{p.quantity} Ltr.</small>
                          </p>
                          <p
                            className="cartTotalPriceDetails"
                            style={{
                              whiteSpace: "nowrap",
                              overflowX: "auto",
                              display: "inline-block",
                            }}
                          >
                            Total Price:
                            <span className="priceCalculus">
                              Rs. {p.price}/<small>{p.quantity} Ltr.</small> X{" "}
                              {cartItem.qnty}
                            </span>
                            <span
                              className="TotalPriceText"
                              style={{
                                marginLeft: "2px",
                                color: "#04446f",
                                fontFamily: "Open Sans, sans-serif",
                                fontStyle: "normal",
                                fontSize: "1.3rem",
                                
                              }}
                            >
                              Rs. {p.price * cartItem.qnty}
                            </span>
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
