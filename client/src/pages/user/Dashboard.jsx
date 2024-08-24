import React from 'react'
import Layout from '../../components/Layout/Layout'
import Usermenu from '../../components/Layout/Usermenu'
import { useAuth } from '../../context/auth'
function Dashboard() {
  const [auth]=useAuth()
  return (
    <Layout title={"Dashboard-Ecommerce app"}>
      <div className="container-fluid m-3 p-4">
        <div className="row">
            <div className="col-md-3">
                <Usermenu/>
            </div>
            <div className="col-md-9">
              <div className="card w-75 p-3" >
                <h3>UserName : {auth?.user?.name}</h3>
                <h3>Email : {auth?.user?.email}</h3>
                <h3>Contact : {auth?.user?.phone}</h3>
                <h3>Address : {auth?.user?.address}</h3>

              </div>
                
            </div>
        </div>

    </div>
    </Layout>
  )
}

export default Dashboard
