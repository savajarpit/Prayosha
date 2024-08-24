import React from 'react'
import Adminmenu from '../../components/Layout/Adminmenu'
import Layout from '../../components/Layout/Layout'

const Users = () => {
  return (
    <Layout title={"Dashboard - All User"} >
        <div className='container-fluid m-3 p-3'> 
    <div className="row">
        <div className="col-md-3 ">
            <Adminmenu/>
        </div>
        <div className="col-md-9">
            <h1>all users</h1>
        </div>
    </div>
    </div>
    </Layout>
  )
}

export default Users
