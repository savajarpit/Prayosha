
import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useCart } from "../context/cart";
import axios from "axios";
import"../styles/categoryf.css"
const CategoryProduct = () => {
  const[cart,setCart]=useCart()
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);
  const getPrductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APIS}/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"Category"}>
    <div className="container-fluid mt-3">
      {/* <h4 className="text-center">Category - {category?.name}</h4> */}
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
             Category - {category?.name}
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
                  width: "10%", // Adjust this if needed
                  margin: "0 auto", // Centers the hr element
                  marginTop: "0", // Removes any extra margin above the hr
                }}
              />
             </div>

      <h6 className="text-center mt-3">{products?.length} results found</h6>
      <div className="row" style={{justifyContent:"center"}}>
            {products?.map((p) => (
              <div
                key={p._id}
                className="col-6 col-sm-4 col-md-3 mb-4"
                style={{ maxWidth: "250px" }} // Adjust the card width
              >
                <div
                  className="productItemd"
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    overflow: "hidden",
                    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Link
                    to={`/product/${p.slug}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div
                      className="productimage"
                      style={{
                        width: "100%",
                        height: "180px",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={`${
                          import.meta.env.VITE_APIS
                        }/api/v1/product/product-photo/${p._id}`}
                        alt={p.name}
                        className="productImg"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
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
                      }}
                    >
                      {p.name.substring(0, 30)}...
                    </span>
                    <span
                      className="productPrice"
                      style={{
                        display: "block",
                        fontSize: "18px",
                        color: "#e91e63",
                        marginBottom: "8px",
                      }}
                    >
                      ₹ {p.price.toLocaleString("en-IN")} /{" "}
                      <small
                        style={{ fontSize: "12px", color: "#777" }}
                      >{`${p.quantity} Ltr.`}</small>
                    </span>
                    <div
                      className="productSize"
                      style={{
                        fontSize: "14px",
                        color: "#555",
                        marginBottom: "10px",
                      }}
                    >
                      <i>Pack of </i>
                      {`${p.quantity} Ltr.`}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "5px",
                        flexDirection: "column",
                      }}
                    >
                      <button
                        className="btn btn-primary"
                        style={{
                          width: "100%",
                          padding: "8px",
                          fontSize: "14px",
                          whiteSpace: "nowrap",
                          backgroundColor: "#548fe7",
                        }}
                        onClick={() => {
                          navigate(`/product/${p.slug}`);
                        }}
                      >
                        More Details
                      </button>
                      <button
                        className="btn btn-secondary"
                        style={{
                          width: "100%",
                          padding: "8px",
                          fontSize: "14px",
                          whiteSpace: "nowrap",
                          backgroundColor: "#022760",
                        }}
                        onClick={() => {
                          //   setCart([...cart, p]);
                          //   localStorage.setItem("cart", JSON.stringify([...cart, p]));
                          //  navigate("/cart")
                          addToCart(p);
                        }}
                      >
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
    </div>
    </Layout>
  );
};

export default CategoryProduct;
