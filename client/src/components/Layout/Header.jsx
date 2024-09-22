import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaTimes, FaBars } from "react-icons/fa";
import { GiShoppingCart } from "react-icons/gi";  // Import the new cart icon
import { FaCartShopping } from "react-icons/fa6";
import { useAuth } from "../../context/auth";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
import image1 from "../../../photos/image1.png";
import "../../styles/header.css";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [cart] = useCart();
  const categories = useCategory();
  const [auth, setAuth] = useAuth();

  const handlelogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
  };

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-light container-fluid">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <img src={image1} alt="logo" height={70} />
          </Link>

          {/* Cart and Hamburger for small screens */}
          <div className="d-flex align-items-center ms-auto d-sm-none">
            <Badge count={cart?.length} showZero offset={[-2,-3]} size="small" className="me-2">
              <NavLink to="/cart" className="nav-link" style={{ border: "none" }}>
                {/* <GiShoppingCart size={24} /> */}
                <FaCartShopping size={24} />
              </NavLink>
            </Badge>
            <button
              className={`navbar-toggler ${isOpen ? 'open' : ''}`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarTogglerDemo01"
              aria-controls="navbarTogglerDemo01"
              aria-expanded={isOpen ? "true" : "false"}
              aria-label="Toggle navigation"
              onClick={toggleNavbar}
            >
              <span className="hamburger-icon"><FaBars /></span>
              <span className="close-icon"><FaTimes /></span>
            </button>
          </div>

          {/* Navbar content */}
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" className="nav-link" aria-current="page">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/Store" className="nav-link" aria-current="page">
                  Products
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ border: "none" }}
                >
                  Categories
                </NavLink>
                <ul className="dropdown-menu">
                  {categories?.map((c) => (
                    <li key={c._id}>
                      <NavLink className="dropdown-item" to={`/category/${c.slug}`}>
                        {c.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="nav-item">
                <NavLink to="/bulk" className="nav-link" aria-current="page">
                  bulk order
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/about" className="nav-link" aria-current="page">
                  About Us
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/contact" className="nav-link" aria-current="page">
                  Contact Us
                </NavLink>
              </li>

              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      style={{ border: "none" }}
                    >
                      <i className="fa-solid fa-user fa-lg" />
                    </NavLink>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <li className="dropdown-item">
                        {auth?.user?.name}
                      </li>
                      <li>
                        <NavLink
                          className="dropdown-item"
                          to={`/dashboard/${auth?.user?.role == 1 ? "admin" : "user"}`}
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handlelogout}
                          to="/login"
                          className="dropdown-item"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}

              {/* Cart for larger screens */}
              <li className="nav-item d-none d-sm-block">
                <Badge count={cart?.length} showZero offset={[-5, 5]} size="small">
                  <NavLink to="/cart" className="nav-link">
                  <FaCartShopping size={24} />
                  </NavLink>
                </Badge>
              </li>
              <SearchInput />
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
