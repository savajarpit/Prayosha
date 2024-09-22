import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Link } from "react-router-dom";
import "./registerpage.css";
import axios from "axios";
import { useNavigate,useLocation } from "react-router-dom";
import { useAuth } from "../../context/auth"; 
import toast from "react-hot-toast";
function Loginpage() {
  const navigate = useNavigate();
  const[auth,setAuth]=useAuth()
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const location=useLocation()
  // form function
  const handelsubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `https://prayosha-backend.onrender.com/api/v1/auth/login`,
        {  email, password }
      );
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({...auth,user:res.data.user,token:res.data.token})
        localStorage.setItem("auth",JSON.stringify(res.data))
        navigate(location.state||"/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong!!");
    }
  };
  return (
    <Layout title={"Login/Register -prayoshaoil"}>
      <div className="Registerpage">
        <div className="wrapper">
          <h2>Login</h2>
          <form onSubmit={handelsubmit}>
            <div className="input-box">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setemail(e.target.value);
                }}
                required
              />
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
                required
              />
            </div>

            <div className="input-box button">
              <input type="Submit" defaultValue="Login" />
            </div>
            <div className="text">
              <h3>
                Already have an account?{" "}
                <Link to={"/register"}>Register now</Link>
              </h3>
              <h3>
                <Link to={"/forgotpassword"}>Forgot Password </Link>
              </h3>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default Loginpage;
