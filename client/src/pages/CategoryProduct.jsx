
import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
const CategoryProduct = () => {
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
    <Layout>
    <div className="container mt-3">
      <h4 className="text-center">Category - {category?.name}</h4>
      <h6 className="text-center">{products?.length} result found</h6>
      <div className="row">
        <div className="col-md-9 offset-1">
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div
                className="productItem m-2"
                key={p._id}
                style={{
                  width: '200px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                }}
              >
                <Link to={`/product/${p.slug}`} style={{ textDecoration: 'none' }}>
                  <div className="productimage" style={{ width: '100%', height: '180px', overflow: 'hidden' }}>
                    <img
                      src={`${import.meta.env.VITE_APIS}/api/v1/product/product-photo/${p._id}`}
                      alt={p.name}
                      className="productImg"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                </Link>
                <div className="productContent" style={{ padding: '15px' }}>
                  <span className="productText" style={{ display: 'block', fontSize: '16px', color: '#333', marginBottom: '8px' }}>
                    {p.name.substring(0, 30)}...
                  </span>
                  <span className="productPrice" style={{ display: 'block', fontSize: '18px', color: '#e91e63', marginBottom: '8px' }}>
                    ₹ {p.price.toLocaleString('en-IN')} / <small style={{ fontSize: '12px', color: '#777' }}>850gm</small>
                  </span>
                  <div className="productSize" style={{ fontSize: '14px', color: '#555', marginBottom: '10px' }}>
                    <i>Pack of </i>850gm
                  </div>
                  <div style={{ display: 'flex', gap: '5px', flexDirection: 'column' }}>
                    <button
                      className="btn btn-primary"
                      style={{ width: '100%', padding: '8px', fontSize: '14px', whiteSpace: 'nowrap' }}
                      onClick={() => { navigate(`/product/${p.slug}`); }}
                    >
                      More Details
                    </button>
                    <button
                      className="btn btn-secondary"
                      style={{ width: '100%', padding: '8px', fontSize: '14px', whiteSpace: 'nowrap' }}
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem('cart', JSON.stringify([...cart, p]));
                        toast.success('Item Added to cart');
                      }}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Uncomment if needed */}
          {/* <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? 'Loading ...' : 'Load more'}
              </button>
            )}
          </div> */}
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default CategoryProduct;
