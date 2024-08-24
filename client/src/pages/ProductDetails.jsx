import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  //initalp details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APIS}/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APIS}/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="row container mt-2">
        <div className="col-md-6">
          <img
            src={`${import.meta.env.VITE_APIS}/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            height="300"
            width={"350px"}
          />
        </div>
        <div className="col-md-6 ">
          <h1 className="text-center">Product Details</h1>
          <h6>Name : {product.name}</h6>
          <h6>Description : {product.description}</h6>
          <h6>Price : {product.price}</h6>
          <h6>Category : {product?.category?.name}</h6>
          <button class="btn btn-secondary ms-1">ADD TO CART</button>
        </div>
      </div>
      <hr />
      <div className="row container">
        <h6>Similar Products</h6>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="d-flex flex-wrap">
        {relatedProducts?.map((p) => (
  <div className="productItem m-2" style={{ width: "200px", border: "1px solid #ddd", borderRadius: "8px", overflow: "hidden", boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)" }}>
    <a href={`/product/${p.slug}`} style={{ textDecoration: "none" }}>
      <div className="productimage" style={{ width: "100%", height: "180px", overflow: "hidden" }}>
        <img
          src={`${import.meta.env.VITE_APIS}/api/v1/product/product-photo/${p?._id}`}
          alt={p.name}
          className="productImg"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    </a>
    <div className="productContent" style={{ padding: "15px" }}>
      <span className="productText" style={{ display: "block", fontSize: "16px", color: "#333", marginBottom: "8px" }}>
      {p.name.length > 25 ? `${p.name.substring(0, 25)}...` : p.name}
      </span>
      <p className="productDescription" style={{ fontSize: "14px", color: "#555", marginBottom: "8px" }}>
        {p.description.length > 30 ? `${p.description.substring(0, 30)}...` : p.description}
      </p>
      <span className="productPrice" style={{ display: "block", fontSize: "18px", color: "#e91e63", marginBottom: "8px" }}>
        ₹ {p.price.toLocaleString("en-IN")} / <small style={{ fontSize: "12px", color: "#777" }}>850gm</small>
      </span>
      <div className="productSize" style={{ fontSize: "14px", color: "#555", marginBottom: "10px" }}>
        <i>Pack of </i>850gm
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <button
          className="btn btn-primary"
          style={{ width: "100%", padding: "8px", fontSize: "14px", whiteSpace: "nowrap" }}
          onClick={() => navigate(`/product/${p.slug}`)}
        >
          More Details
        </button>
        <button
          className="btn btn-secondary"
          style={{ width: "100%", padding: "8px", fontSize: "14px", whiteSpace: "nowrap" }}
          onClick={() => {
            setCart([...cart, p]);
            localStorage.setItem("cart", JSON.stringify([...cart, p]));
            toast.success("Item Added to cart");
          }}
        >
          ADD TO CART
        </button>
      </div>
    </div>
  </div>
))}

        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;