import React from "react";
import { NavLink, Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { GiShoppingBag } from "react-icons/gi";
import { useAuth } from "../../context/auth";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";

function Header() {
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
  return (
    <>
     {/* <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand">
              🛒Ecommerce app
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" className="nav-link" aria-current="page">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/Store" className="nav-link" aria-current="page">
                  Store
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={"/categories"}>
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((c) => (
                    <li key={c._id}>
                      <Link
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              <SearchInput/>
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
                      {auth?.user?.name}
                    </NavLink>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <li>
                        <NavLink
                          className="dropdown-item "
                          to={`/dashboard/${
                            auth?.user?.role == 1 ? "admin" : "user"
                          }`}
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
              <li className="nav-item mt-2">
                <Badge count={cart?.length} showZero>
                  <NavLink to="/cart" className="nav-link">
                  <FaCartShopping />
                  </NavLink>
                </Badge>
              </li>
            </ul>
          </div>
        </div>
      </nav> */}
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
  <div className="container-fluid">
    <Link to="/" className="navbar-brand">
      <img src="https://scontent.famd15-1.fna.fbcdn.net/v/t39.30808-6/227809428_210010607725670_3041727024764980399_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=3aQVwweOoFIQ7kNvgFq-VFS&_nc_ht=scontent.famd15-1.fna&oh=00_AYCSdFBwWiE8af-wObNB33EcljIIawGgX0dHBI7wniAfBQ&oe=66CAB69C" alt=""  height={50}/>
    </Link>
    <button
      className="navbar-toggler ms-auto"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarTogglerDemo01"
      aria-controls="navbarTogglerDemo01"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink to="/" className="nav-link" aria-current="page">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/Store" className="nav-link" aria-current="page">
            Store
          </NavLink>
        </li>
        <li className="nav-item dropdown">
          <Link
            className="nav-link dropdown-toggle"
            to={"/categories"}
            data-bs-toggle="dropdown"
          >
            Categories
          </Link>
          <ul className="dropdown-menu">
            <li>
              <Link className="dropdown-item" to={"/categories"}>
                All Categories
              </Link>
            </li>
            {categories?.map((c) => (
              <li key={c._id}>
                <Link className="dropdown-item" to={`/category/${c.slug}`}>
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </li>
        <SearchInput />
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
                {auth?.user?.name}
              </NavLink>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <NavLink
                    className="dropdown-item"
                    to={`/dashboard/${
                      auth?.user?.role == 1 ? "admin" : "user"
                    }`}
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
        <li className="nav-item mt-2">
          <Badge count={cart?.length} showZero>
            <NavLink to="/cart" className="nav-link">
              <FaCartShopping />
            </NavLink>
          </Badge>
        </li>
      </ul>
    </div>
  </div>
</nav>


    </>
  );
}

export default Header;
