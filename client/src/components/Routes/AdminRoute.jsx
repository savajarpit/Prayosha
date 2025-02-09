import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";
import { useNavigate } from "react-router-dom";
export default function AdminRoute() {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();
    const navigate=useNavigate()

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(`${import.meta.env.VITE_APIS}/api/v1/auth/admin-auth`,{
        headers: {
          Authorization:  auth?.token
        },
      });

      
      if (res.data.data.ok) {
        setOk(true);
      } else {
        setOk(false);
       }


      


    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner path=""/>;
}
