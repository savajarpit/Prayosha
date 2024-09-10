import React,{useState,useEffect} from "react";
import Layout from "../components/Layout/Layout";
import "../styles/homepage.css"; // Include a CSS file for custom styles

import { useAuth } from "../context/auth";
import pb1 from "../../photos/pb1.png"
import { useNavigate,Link } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/cart";
function Homepage() {
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const getAllProducts = async () => {
    try {
      
      const { data } = await axios.get(
        `${import.meta.env.VITE_APIS}/api/v1/product/product-list/1`
      );
      
      setProducts(data.products);
    } catch (error) {
      
      console.log(error);
    }
  };


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

  useEffect(() => {
    getAllProducts()
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout title={"Prayoshaoil Home"}>
     <section className="home-banner d-flex justify-content-center align-items-center">
  <div className="container-fluid p-0">
    <img src={pb1} alt="Banner" className="banner-image img-fluid w-100" />
  </div>
</section>
<div
            className="mt-3"
            style={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span
              className="text-center  storeh1"
              style={{
                fontFamily: "sans-serif",
                fontSize: " 2rem",
                fontWeight: "500",
              }}
            >
              Top Products
            </span>
            <hr
              className="sline"
              style={{
                backgroundColor: "blue",
                border: "none",
                borderRadius: ".5rem",
                height: ".2rem",
                width: "12%",
                marginTop: "-2px",
              }}
            />
          </div>

          <div className="container">
    <div className="row custom-gap justify-content-center">
        {products?.map((p) => (
            <div
                key={p._id}
                className="col-6 col-sm-4 col-md-3 mb-4 d-flex justify-content-center"
                style={{ maxWidth: "250px" }} // Adjust the card width
            >
                <div
                    className="productItem"
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

<div className="container-fluid mb-2">
<div
            className=""
            style={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          > 
           <button className="btn expobtn" onClick={()=>{
            navigate("/Store");
           }}>Explore Store</button>
          </div>
</div>









    </Layout>
  );
}

export default Homepage;
