import React from 'react'
import Layout from '../../components/Layout/Layout'
import Usermenu from '../../components/Layout/Usermenu'

const Orders = () => {
  return (
    <Layout title={"UserDashboard - Orders"}>
        <div className="container-fluid m-3 p-4">
            <div className="row">
                <div className="col-md-3">
                    <Usermenu/>
                </div>
                <div className="col-md-9">
                    <h1>All Orders</h1>
                </div>
            </div>

        </div>

    </Layout>
  )
}

export default Orders
