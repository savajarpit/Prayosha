import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import "../styles/homepage.css"; // Include a CSS file for custom styles

import { useAuth } from "../context/auth";
import pb1 from "../../photos/pb1.png";
import t2 from "../../photos/t2.jpg";
import t4 from "../../photos/t4.jpg";
import t5 from "../../photos/t5.jpg";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/cart";

function Homepage() {
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `https://prayosha-backend.onrender.com/api/v1/product/product-list/1`
      );
      setProducts(data.products);
      setLoading(false); // Set loading to false when products are fetched
    } catch (error) {
      console.log(error);
      setLoading(false); // Ensure to stop the loader even if there's an error
    }
  };

  const addToCart = (product) => {
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

  useEffect(() => {
    getAllProducts();
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout title={"Prayoshaoil Home"}>
      <section className="home-banner d-flex justify-content-center align-items-center">
        <div className="container-fluid p-0">
          <img src={pb1} alt="Banner" className="banner-image img-fluid w-100" />
        </div>
      </section>
      
      <div className="mt-3" style={{ alignItems: "center", display: "flex", flexDirection: "column" }}>
        <span className="text-center storeh1" style={{ fontFamily: "sans-serif", fontSize: "2rem", fontWeight: "500" }}>
          Top Products
        </span>
        <hr className="sline" style={{ backgroundColor: "blue", border: "none", borderRadius: ".5rem", height: ".2rem", width: "12%", marginTop: "-2px" }} />
      </div>

      {/* Loader: Will show when loading is true */}
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "200px" }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="row custom-gap justify-content-center">
            {products?.map((p) => (
              <div key={p._id} className="col-6 col-sm-4 col-md-3 mb-4 d-flex justify-content-center" style={{ maxWidth: "250px" }}>
                <div className="productItem" style={{ border: "1px solid #ddd", borderRadius: "8px", overflow: "hidden", boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)" }}>
                  <Link to={`/product/${p.slug}`} style={{ textDecoration: "none" }}>
                    <div className="productimage" style={{ width: "100%", height: "180px", overflow: "hidden" }}>
                      <img src={`https://prayosha-backend.onrender.com/api/v1/product/product-photo/${p._id}`} alt={p.name} className="productImg" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                  </Link>
                  <div className="productContent" style={{ padding: "15px" }}>
                    <span className="productText" style={{ display: "block", fontSize: "16px", color: "#333", marginBottom: "8px" }}>{p.name.substring(0, 30)}...</span>
                    <span className="productPrice" style={{ display: "block", fontSize: "18px", color: "#e91e63", marginBottom: "8px" }}>
                      ₹ {p.price.toLocaleString("en-IN")} / <small style={{ fontSize: "12px", color: "#777" }}>{`${p.quantity} Ltr.`}</small>
                    </span>
                    <div className="productSize" style={{ fontSize: "14px", color: "#555", marginBottom: "10px" }}>
                      <i>Pack of </i>{`${p.quantity} Ltr.`}
                    </div>
                    <div style={{ display: "flex", gap: "5px", flexDirection: "column" }}>
                      <button className="btn btn-primary" style={{ width: "100%", padding: "8px", fontSize: "14px", whiteSpace: "nowrap", backgroundColor: "#548fe7" }} onClick={() => navigate(`/product/${p.slug}`)}>
                        More Details
                      </button>
                      <button className="btn btn-secondary" style={{ width: "100%", padding: "8px", fontSize: "14px", whiteSpace: "nowrap", backgroundColor: "#022760" }} onClick={() => addToCart(p)}>
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="container-fluid mb-2">
        <div className="d-flex justify-content-center">
          <button className="btn expobtn" onClick={() => navigate("/Store")}>Explore Store</button>
        </div>
      </div>

      {/* Testimonials section */}
      <div className="container my-5">
        <div className="mt-3" style={{ alignItems: "center", display: "flex", flexDirection: "column" }}>
          <span className="text-center storeh1" style={{ fontFamily: "sans-serif", fontSize: "2rem", fontWeight: "500" }}>
            Testimonials
          </span>
          <hr className="sline" style={{ backgroundColor: "blue", border: "none", borderRadius: ".5rem", height: ".2rem", width: "12%", marginTop: "-2px" }} />
        </div>
        
        
        <div
        id="testimonialsCarousel"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#testimonialsCarousel"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#testimonialsCarousel"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#testimonialsCarousel"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>

        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="testimonial-card d-flex justify-content-center">
              <div className="card shadow-sm p-4 text-center">
                <p className="testimonial-text">
                  "Prayosha Oil's service is exceptional! The quality of their oil is top-notch, and it’s always fresh."
                </p>
               <div className="container text-center"> <img src={t2} alt="" height={80} width={80} style={{border:"2px solid black",borderRadius:"50%"}} className=""/></div>
                <h5 className="mt-4">Tirth Bhanderi</h5>
               
              </div>
            </div>
          </div>

          <div className="carousel-item">
            <div className="testimonial-card d-flex justify-content-center">
              <div className="card shadow-sm p-4 text-center">
                <p className="testimonial-text">
                  "Amazing experience! I highly recommend their products to anyone looking for pure oils."
                </p>
                <div className="container text-center"> <img src={t4} alt="" height={80} width={80} style={{border:"2px solid black",borderRadius:"50%"}} className=""/></div>
                <h5 className="mt-4">Dhruv Kakadiya</h5>
               
              </div>
            </div>
          </div>

          <div className="carousel-item">
            <div className="testimonial-card d-flex justify-content-center">
              <div className="card shadow-sm p-4 text-center">
                <p className="testimonial-text">
                  "The best edible oil I've ever used! Absolutely love the service and delivery speed."
                </p>
                <div className="container text-center"> <img src={t5} alt="" height={80} width={80} style={{border:"2px solid black",borderRadius:"50%"}} className=""/></div>
                <h5 className="mt-4">Nirav Khichadiya</h5>
               
              </div>
            </div>
          </div>
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#testimonialsCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#testimonialsCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
    </Layout>
  );
}

export default Homepage;
