import React from 'react'
import Layout from '../components/Layout/Layout'
import { Link } from 'react-router-dom'
import page404 from "../../photos/page404.gif"
function Pagenotfound() {
  return (
   <Layout title={"page not found"}>
       <div className='pnf'>
          <img src={page404} alt="404"  height={200}/>
          <h2 className='pnf-heading'>Oops ! Page Not Found</h2>
          <Link to="/" className='btn btn-info'>
            Go Back
          </Link>
       </div>
   </Layout>
  )
}

export default Pagenotfound
