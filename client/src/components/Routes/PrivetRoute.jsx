import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";
import { useNavigate } from "react-router-dom";
export default function PrivetRoute() {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();
    const navigate=useNavigate()

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(`${import.meta.env.VITE_APIS}/api/v1/auth/user-auth`);
      console.log(res.data.data.ok)
      if (res.data.data.ok) {
        setOk(true);
        navigate('/dashboard/user');
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner />;
}
