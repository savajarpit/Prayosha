import React from 'react'
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import { useState } from 'react';
import "./registerpage.css";
import axios from "axios";
import toast from "react-hot-toast";
const Forgotpassword = () => {

    const navigate = useNavigate();
 
  const [email, setemail] = useState("");
  const [answer, setanswer] = useState("");
  const [newpassword, setnewpassword] = useState("");
  
  // form function
  const handelsubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APIS}/api/v1/auth/forgotpassword`,
        {  email, newpassword,answer }
      );
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong!!");
    }
  };


  return (
    <Layout title={"Forgot-Password"}>
      <div className="Registerpage">
        <div className="wrapper">
          <h2>Reset Password</h2>
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
                placeholder="Enter new password"
                value={newpassword}
                onChange={(e) => {
                  setnewpassword(e.target.value);
                }}
                required
              />
            </div>

            <div className="input-box">
              <input
                type="text"
                placeholder="What city were you born in?"
                value={answer}
                onChange={(e) => {
                  setanswer(e.target.value);
                }}
                required
              />
            </div>

            <div className="input-box button">
              <input type="Submit" defaultValue="Reset" />
            </div>  
            
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default Forgotpassword
