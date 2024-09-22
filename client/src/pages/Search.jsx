import React,{useState,useEffect} from "react";
import Layout from "./../components/Layout/Layout";
import { useSearch } from "../context/search";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import "../styles/search.css"
const Search = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const addToCart = (product) => {
    // Check if the product is already in the cart
    const existingProduct = cart.find((item) => item._id === product._id);
    if (!existingProduct) {
      const updatedCart = [...cart, product];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      navigate("/cart");
    } else {
      navigate("/cart");
    }
  };




  return (
    <Layout title={"Search results"}>
      <div className="container-fluid mt-4">
        <div className="text-center">
          {/* <h3 className="mt-3">Search Results</h3> */}
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
              Search Results
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
          <h6 className="mt-3">
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length}`}
          </h6>
          <div className="d-flex flex-wrap mt-4"style={{justifyContent:"center"}} >
            {values?.results.map((p) => (
              <div
                key={p._id}
                className="col-6 col-sm-4 col-md-3  mb-4  "
                style={{ maxWidth: "250px" }} 
                 
              >
                <div className="productItem productItems" style={{ border: "1px solid #ddd", borderRadius: "8px", overflow: "hidden", boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)" ,width:"150px" }}>
                  <Link to={`/product/${p.slug}`} style={{ textDecoration: "none" }}>
                    <div className="productimage" style={{ width: "100%", height: "180px", overflow: "hidden" }}>
                      <img
                        src={`https://prayosha-backend.onrender.com/api/v1/product/product-photo/${p._id}`}
                        alt={p.name}
                        className="productImg"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </div>
                  </Link>
                  <div className="productContent" style={{ padding: "15px" }}>
                    <span className="productText" style={{ display: "block", fontSize: "16px", color: "#333", marginBottom: "8px" }}>
                      {p.name.substring(0, 30)}...
                    </span>
                    <span className="productPrice" style={{ display: "block", fontSize: "18px", color: "#e91e63", marginBottom: "8px" }}>
                      ₹ {p.price.toLocaleString("en-IN")} / <small style={{ fontSize: "12px", color: "#777" }}>{`${p.quantity} Ltr.`}</small>
                    </span>
                    <div className="productSize" style={{ fontSize: "14px", color: "#555", marginBottom: "10px" }}>
                      <i>Pack of </i>{`${p.quantity} Ltr.`}
                    </div>
                    <div style={{ display: "flex", gap: "5px", flexDirection: "column" }}>
                      <button className="btn btn-primary" style={{ width: "100%", padding: "8px", fontSize: "14px", whiteSpace: "nowrap",backgroundColor:"#548fe7" }} onClick={() => { navigate(`/product/${p.slug}`); }}>
                        More Details
                      </button>
                      <button
                        className="btn btn-secondary"
                        style={{ width: "100%", padding: "8px", fontSize: "14px", whiteSpace: "nowrap",backgroundColor:"#022760" }}
                        onClick={() => {
                          // setCart([...cart, p]);
                          // localStorage.setItem("cart", JSON.stringify([...cart, p]));
                          // toast.success("Item Added to cart");
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
      </div>
    </Layout>
  );
};

export default Search;
