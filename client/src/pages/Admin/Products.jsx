import React, { useState, useEffect } from "react";
import Adminmenu from "../../components/Layout/Adminmenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import "../../styles/products.css"; // Import your CSS file

const Products = () => {
  const [products, setProducts] = useState([]);

  // Get all products
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

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout title={"products"}>
      <div className="container-fluid mt-4  ">
        <div className="row">
          <div className="col-md-3">
            <Adminmenu />
          </div>
          <div className="col-md-9">
            <h3 className="text-center mb-4 mt-3">All Products List</h3>
            <div className="row">
              {products?.map((p) => (
                <div
                  key={p._id}
                  className="productItem col-6 col-sm-4 col-md-3"
                >
                  <Link
                    to={`/dashboard/admin/product/${p.slug}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div className="productimage">
                      <img
                        src={`${
                          import.meta.env.VITE_APIS
                        }/api/v1/product/product-photo/${p._id}`}
                        alt={p.name}
                        className="productImg"
                      />
                    </div>
                    <div className="productContent">
                      <span className="productText">{p.name}</span>
                      <p className="productDescription">{p.description}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
