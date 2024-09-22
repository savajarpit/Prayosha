import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import Adminmenu from "../../components/Layout/Adminmenu";
import { useAuth } from "../../context/auth";
import "../../styles/Admindash.css";
import axios from "axios";
const Admindashboard = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [auth] = useAuth();
  const [userc, setuserc] = useState(0);

  // get user count
  const getusercount = async () => {
    try {
      const { data } = await axios.get(
        `https://prayosha-backend.onrender.com/api/v1/category/user-counts`
      );
      setuserc(data.total);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  //getall products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `https://prayosha-backend.onrender.com/api/v1/product/get-product`
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `https://prayosha-backend.onrender.com/api/v1/auth/all-orders`
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      getOrders();
      getAllProducts();
      getusercount();
    }
  }, [auth?.token]);

  return (
    <Layout title={"Admin-Dashboard"}>
      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col-md-3">
            <Adminmenu />
          </div>
          <div className="col-md-9 container">
            {/* <div className="card w-75 p-3">
                   <h3>Admin Name :  {auth?.user?.name}</h3>  
                   <h3>Admin Email :  {auth?.user?.email}</h3>  
                   <h3>Admin Contact :  {auth?.user?.phone}</h3>  
                </div> */}
            <div className="container mt-2">
              <div className="row">
                <div className="col-md-12 text-center">
                  <h3>Admin Name : {auth?.user?.name}</h3>
                  <h6>Admin Email : {auth?.user?.email}</h6>
                  <h6>Admin Contact : {auth?.user?.phone}</h6>
                </div>
              </div>
            </div>
            <div className="container divbox mt-5">
              <div className="row justify-content-center text-center">
                <div className="col-12 col-sm-4 col-md-3 col-lg-4 subdivbox mb-3">
                  <h4 className="h4title">Orders</h4>
                  <h2>{orders.length}+</h2>
                </div>
                <div className="col-12 col-sm-4 col-md-3 col-lg-4 subdivbox mb-3">
                  <h4 className="h4title">Products</h4>
                  <h2>{products.length}+</h2>
                </div>
                <div className="col-12 col-sm-4 col-md-3 col-lg-4 subdivbox mb-3">
                  <h4 className="h4title">Users</h4>
                  <h2>{userc}+</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Admindashboard;
