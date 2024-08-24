import React,{useState,useEffect} from 'react'
import Layout from '../components/Layout/Layout'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
const Store = () => {
  const [cart, setCart] = useCart();
    const navigate=useNavigate()
    const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

 //get all catagory
 const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_APIS}/api/v1/category/get-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

   //get products
   const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${import.meta.env.VITE_APIS}/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

   //getTOtal COunt
   const getTotal = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_APIS}/api/v1/product/product-count`);
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
      const { data } = await axios.get(`${import.meta.env.VITE_APIS}/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // filter by cat
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

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_APIS}/api/v1/product/product-filters`, {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <Layout title={"Explore-Store"}>
       <div className="container-fluid row mt-3">
        <div className="col-md-2">
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
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
          {products?.map((p) => (
  <div className="productItem m-2"      key={p._id}  style={{ width: "200px", border: "1px solid #ddd", borderRadius: "8px", overflow: "hidden", boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)" }}>
    <Link to={`/product/${p.slug}`} style={{ textDecoration: "none" }}>
      <div className="productimage" style={{ width: "100%", height: "180px", overflow: "hidden" }}>
        <img
          src={`${import.meta.env.VITE_APIS}/api/v1/product/product-photo/${p._id}`}
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
        ₹ {p.price.toLocaleString("en-IN")} / <small style={{ fontSize: "12px", color: "#777" }}>850gm</small>
      </span>
      <div className="productSize" style={{ fontSize: "14px", color: "#555", marginBottom: "10px" }}>
        <i>Pack of </i>850gm
      </div>
      <div style={{ display: "flex", gap: "5px", flexDirection: "column" }}>
        <button className="btn btn-primary" style={{ width: "100%", padding: "8px", fontSize: "14px", whiteSpace: "nowrap" }} onClick={() => { navigate(`/product/${p.slug}`); }}>
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
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div>
        </div>
      </div>

    </Layout>
  )
}

export default Store
