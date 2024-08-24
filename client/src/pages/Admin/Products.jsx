import React, { useState, useEffect } from "react";
import Adminmenu from "../../components/Layout/Adminmenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
const Products = () => {
  const [products, setProducts] = useState([]);

  //getall products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APIS}/api/v1/product/get-product`
      );
      setProducts(data.products);
      
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout>
    <div className="row">
  <div className="col-md-3">
    <Adminmenu />
  </div>
  <div className="col-md-9">
    <h1 className="text-center mb-4">All Products List</h1>
    <div className="row">
      {products?.map((p) => (
        <div
          key={p._id}
          className="productItem m-2"
          style={{
            width: "200px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)"
          }}
        >
          <Link to={`/dashboard/admin/product/${p.slug}`} style={{ textDecoration: "none" }}>
            <div
              className="productimage"
              style={{ width: "100%", height: "180px", overflow: "hidden" }}
            >
              <img
                src={`${import.meta.env.VITE_APIS}/api/v1/product/product-photo/${p._id}`}
                alt={p.name}
                className="productImg"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </Link>
          <div className="productContent" style={{ padding: "15px" }}>
            <span
              className="productText"
              style={{
                display: "block",
                fontSize: "16px",
                color: "#333",
                marginBottom: "8px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap"
              }}
            >
              {p.name}
            </span>
            <p
              className="productDescription"
              style={{
                fontSize: "14px",
                color: "#777",
                marginBottom: "10px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap"
              }}
            >
              {p.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
    </Layout>
  );
};

export default Products;
