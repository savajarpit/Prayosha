import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import "../styles/storepage.css";
const Store = () => {
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [filtersVisible, setFiltersVisible] = useState(false); // State to toggle filter visibility

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APIS}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
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
    getAllCategory();
    getTotal();
    window.scrollTo(0, 0);
  }, []);

  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_APIS}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APIS}/api/v1/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_APIS}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  // get filtered products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_APIS}/api/v1/product/product-filters`,
        {
          checked,
          radio,
        }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"Explore-Store"}>
      <div className="container-fluid row mt-3">
        <div className="col-md-2">
          <button
            className="btn btn-primary mb-3"
            style={{ backgroundColor: "#022760" }}
            onClick={() => setFiltersVisible(!filtersVisible)}
          >
            {filtersVisible ? "Hide Filters" : "Show Filters"}
          </button>
          {filtersVisible && (
            <div>
              <h4 className="text-center">Filter By Category</h4>
              <div className="d-flex flex-column">
                {categories?.map((c) => (
                  <Checkbox
                    key={c._id}
                    onChange={(e) => handleFilter(e.target.checked, c._id)}
                  >
                    {c.name}
                  </Checkbox>
                ))}
              </div>
              {/* price filter */}
              <h4 className="text-center mt-4">Filter By Price</h4>
              <div className="d-flex flex-column">
                <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                  {Prices?.map((p) => (
                    <div key={p._id}>
                      <Radio value={p.array}>{p.name}</Radio>
                    </div>
                  ))}
                </Radio.Group>
              </div>
              <div className="d-flex flex-column mt-4">
                <button
                  className="btn btn-danger"
                  onClick={() => window.location.reload()}
                >
                  RESET FILTERS
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="col-md-9 ">
          <div
            className=""
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
              Our Store
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

          <div className="row">
            {products?.map((p) => (
              <div
                key={p._id}
                className="col-6 col-sm-4 col-md-3 mb-4"
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
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                style={{ color: "white", backgroundColor: "#7619a4" }}
                className="btn "
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Load more"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Store;
