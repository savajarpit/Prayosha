import React from 'react'
import Layout from '../components/Layout/Layout'
import contactus from '../assets/images/contactus.jpeg'
function Privacypolicypage() {
  return (
    <Layout title={"privacy policy"}>
        <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src={contactus}
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p>add privacy policy</p>
          <p>add privacy policy</p>
          <p>add privacy policy</p>
          <p>add privacy policy</p>
          <p>add privacy policy</p>
          <p>add privacy policy</p>
          <p>add privacy policy</p>
        </div>
      </div>
    </Layout>
  )
}

export default Privacypolicypage
