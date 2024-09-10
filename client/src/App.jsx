import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Aboutpage from "./pages/Aboutpage";
import Contectpage from "./pages/Contectpage";
import Pagenotfound from "./pages/Pagenotfound";
import Registerpage from "./pages/Auth/Registerpage";
import Loginpage from "./pages/Auth/Loginpage";
import Dashboard from "./pages/user/Dashboard";
import PrivetRoute from "./components/Routes/PrivetRoute";
import Forgotpassword from "./pages/Auth/Forgotpassword";
import AdminRoute from "./components/Routes/AdminRoute";
import Admindashboard from "./pages/Admin/Admindashboard";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import Users from "./pages/Admin/Users";
import Profile from "./pages/user/Profile";
import Orders from "./pages/user/Orders";
import Products from "./pages/Admin/Products";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import Store from "./pages/Store";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";
import CategoryProduct from "./pages/CategoryProduct";
import CartPage from "./pages/CartPage";
import AdminOrders from "./pages/Admin/AdminOrders";
import Termsofservices from "./pages/Termsofservices";
import Refundandreturn from "./pages/Refundandreturn";
import Shipingpolicy from "./pages/Shipingpolicy";
import Adminprofile from "./pages/Admin/Adminprofile";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      
      <Route path="/" element={<Homepage />} />
      <Route path="/search" element={<Search />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/product/:slug" element={<ProductDetails />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/category/:slug" element={<CategoryProduct />} />
      <Route path="/Store" element={<Store />} />
      <Route path="/Termsofservices" element={<Termsofservices />} />
      <Route path="/RefundandReturn" element={<Refundandreturn />} />
      <Route path="/shipingpolicy" element={<Shipingpolicy />} />
      <Route path="/about" element={<Aboutpage />} />
      <Route path="/dashboard" element={<PrivetRoute />}>
        <Route path="user" element={<Dashboard />} />
        <Route path="user/profile" element={<Profile />} />
        <Route path="user/orders" element={<Orders />} />
      </Route>
      <Route path="/dashboard" element={<AdminRoute />}>
        <Route path="admin" element={<Admindashboard />} />
        <Route path="admin/create-category" element={<CreateCategory />} />
        <Route path="admin/create-product" element={<CreateProduct />} />
        <Route path="admin/products" element={<Products />} />
        <Route path="admin/product/:slug" element={<UpdateProduct />} />
        <Route path="admin/users" element={<Users />} />
        <Route path="admin/orders" element={<AdminOrders />} />
        <Route path="admin/profile" element={<Adminprofile />} />
      </Route>
      <Route path="/contact" element={<Contectpage />} />
      <Route path="/policy" element={<Privacypolicypage />} />
      <Route path="/register" element={<Registerpage />} />
      <Route path="/forgotpassword" element={<Forgotpassword />} />
      <Route path="/login" element={<Loginpage />} />
      <Route path="*" element={<Pagenotfound />} />
    </Routes>
  );
}

export default App;
