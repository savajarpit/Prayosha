import React from "react";
import { NavLink } from "react-router-dom";
import"../../styles/Adminpanel.css"
const Adminmenu = () => {
  return (
    <>
    <div className="text-center">
        <div className="list-group">
        <h4>Admin panel</h4>
        <NavLink to="/dashboard/admin/profile" className="list-group-item list-group-item-action adminpanellink">
           Profile
        </NavLink>
        <NavLink to="/dashboard/admin/create-category" className="list-group-item list-group-item-action adminpanellink">
            Create Category
        </NavLink>
        <NavLink to="/dashboard/admin/create-product" className="list-group-item list-group-item-action adminpanellink">
          Create Product
        </NavLink>
        <NavLink to="/dashboard/admin/products" className="list-group-item list-group-item-action adminpanellink">
          Products
        </NavLink>
        <NavLink
            to="/dashboard/admin/orders"
            className="list-group-item list-group-item-action adminpanellink"
          >
            Orders
          </NavLink>
        {/* <NavLink to="/dashboard/admin/users" className="list-group-item list-group-item-action">
          Users
        </NavLink> */}
      </div>
    </div>
    </>










    
  );
};

export default Adminmenu;
