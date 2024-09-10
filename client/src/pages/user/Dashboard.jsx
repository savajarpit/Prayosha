import React,{useEffect} from 'react'
import Layout from '../../components/Layout/Layout'
import Usermenu from '../../components/Layout/Usermenu'
import { useAuth } from '../../context/auth'
function Dashboard() {
  const [auth]=useAuth()
  useEffect(()=>{
    window.scrollTo(0, 0);
  })
  return (
    <Layout title={"Dashboard-User"}>
      <div className="container-fluid mt-4">
        <div className="row">
            <div className="col-md-3">
                <Usermenu/>
            </div>
            <div className="col-md-9">
            <div className="container mt-4">
              <div className="row">
                <div className="col-md-12 text-center">
                  <h3>User Name : {auth?.user?.name}</h3>
                  <h6>User Email : {auth?.user?.email}</h6>
                  <h6>User Contact : {auth?.user?.phone}</h6>
                </div>
              </div>
            </div>
                
            </div>
        </div>

    </div>
    </Layout>
  )
}

export default Dashboard
