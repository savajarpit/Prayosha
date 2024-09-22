import React,{useState} from "react";
import "./registerpage.css";
import axios from 'axios'
import { useNavigate,Link } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import toast from 'react-hot-toast';
function Registerpage() {
    const [name,setname]=useState("")
    const [email,setemail]=useState("")
    const [password,setpassword]=useState("")
    const [phone,setphone]=useState("")
    const [address,setaddress]=useState("")
    const [answer,setanswer]=useState("")
    const navigate=useNavigate()
    // form function
    const handelsubmit=async(e)=>{
        e.preventDefault()
        try{
          const res=await axios.post(`https://prayosha-backend.onrender.com/api/v1/auth/register`,{name,email,password,phone,address,answer});
          if(res && res.data.success){
            toast.success(res.data && res.data.message)
            navigate('/login')
          }
          else{
            toast.error(res.data.message)
          }
        }
        catch(error){
          toast.error("Something went wrong!!")
         
        }
    }
    
  return (
    <Layout title={"register-prayoshaoil"}>
      <div className="Registerpage">
        <div className="wrapper">
          <h2>Registration</h2>
          <form onSubmit={handelsubmit}>
            <div className="input-box">
              <input type="text" 
              placeholder="Enter your name" 
              value={name}
              onChange={(e)=>{setname(e.target.value)}}
              required />
            </div>
            <div className="input-box">
              <input type="email" placeholder="Enter your email" 
              value={email}
              onChange={(e)=>{setemail(e.target.value)}}
              required />
            </div>
            <div className="input-box">
              <input type="password" placeholder="Create password" 
              value={password}
              onChange={(e)=>{setpassword(e.target.value)}}
              required />
            </div>
            <div className="input-box">
              <input type="text" placeholder="Enter your Phone" 
              value={phone}
              onChange={(e)=>{setphone(e.target.value)}}
              required />
            </div>
            <div className="input-box">
              <input type="text" placeholder="Enter your Address" 
              value={address}
              onChange={(e)=>{setaddress(e.target.value)}}
              required />
            </div>

            <div className="input-box">
              <input type="text" placeholder="What city were you born in?" 
              value={answer}
              onChange={(e)=>{setanswer(e.target.value)}}
              required />
            </div>
           
            <div className="policy">
              <input type="checkbox" />
              <h3>I accept all terms &amp; condition</h3>
            </div>
            <div className="input-box button">
              <input type="Submit" defaultValue="Register Now" />
            </div>
            <div className="text">
              <h3>
                Already have an account? <Link to={'/login'}>Login now</Link>
              </h3>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default Registerpage;
