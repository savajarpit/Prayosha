import React from 'react'
import { Link } from 'react-router-dom'
import "./footer.css"
function Footer() {
  return (
    <footer>
  <div className="container">
    <div className="row">
      <div className="col-md-6 col-lg-4 col-sm-6">
        <div className="widge">
          <div className="widge-heading">
            <h5 style={{color: '#134377'}}>ABOUT US</h5>
          </div>
          <div className="widge-contant">
            <img src="Screenshot_29-3-2024_18456_looka.com-removebg-preview.png" alt="footer logo" style={{maxHeight: 50, marginBottom: 30}} />
            <p className="ftextcolor " style={{marginTop: '-20px'}}>Harpal Construction is a leading construction company dedicated to delivering excellence in every project. With years of experience and a commitment to quality craftsmanship, we specialize in residential, commercial, and industrial construction solutions. Our passion for innovation and customer satisfaction drives us to exceed expectations, ensuring each client receives unparalleled service and superior results. Trust Harpal Construction to bring your vision to life with integrity, reliability, and expertise.
            </p>
          </div>
        </div>
      </div>
      <div className="col-lg-2 col-md-6 col-sm-6">
        <div className="widge">
          <div className="widge-heading">
            <h5 style={{color: '#134377'}}>USEFUL LINKS</h5>
          </div>
          <div className="widge-contant">
            <ul className="menu ">
              <li className="menulist "><Link to="/" className="ftextcolor">Home</Link></li>
              <li className="menulist "><Link to="/Store" className="ftextcolor">Store</Link></li>
              <li className="menulist "><Link to="/categories" className="ftextcolor">All Categories</Link></li>
              <li className="menulist "><Link to="/about" className="ftextcolor">AboutUs</Link></li>
              <li className="menulist "><Link to="/contact" className="ftextcolor">ContactUs</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="col-md-6 col-sm-6 col-lg-3">
        <div className="widge">
          <div className="widge-heading">
            <h5 style={{color: '#134377'}}>HELP 
            </h5>
          </div> 
          <div className="widge-contant">
            <ul className="menu ">
              <li className="menulist "><Link to="/policy" className="ftextcolor">Terms of service</Link></li>
              <li className="menulist "><Link to="/" className="ftextcolor">Refund and Return policy</Link></li>
              <li className="menulist "><Link to="/" className="ftextcolor">Shipping Policy</Link></li>
            </ul>
          </div>
          <div className="widge mt-4">
            <div className="widge-heading">
              <h5 className style={{color: '#134377'}}>FOLLOW US</h5>
            </div>
            <div className="widge-contant mt-3 ">
              <div className="footer-social">
                <ul>
                  <li><Link to="https://www.facebook.com/Prayoshaoil/"><i className="fab fa-facebook-f" /></Link></li>
                  <li><Link to="#"><i className="fab fa-instagram" /></Link></li>
                  <li><Link to="#"><i className="fab fa-youtube" /></Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-6 col-sm-6 col-lg-3">
        <div className="widge">
          <div className="widge-heading">
            <h5 style={{color: '#134377'}}>CONTACT INFO</h5>
          </div>
          <div className="widge-contant mt-4" style={{marginLeft: '-15px'}}>
            {/* phone */}
            <div className="cphone">
              <span style={{marginLeft: 20}} className="textcolors">
                <i className="fa-solid fa-phone" /></span>
              <p style={{marginLeft: 50, marginTop: '-26px', color: '#134377'}} className><span style={{fontSize: 22}}>Phone</span> <br /><a href="tel:+91 9428794219" className="ftextcolor">+91 9428794219</a></p>
            </div>
            {/* mail */}
            <div className="cphone">
              <span style={{marginLeft: 20}} className="textcolors"><i className="fa-solid fa-envelope-open" /></span>
              <p style={{marginLeft: 50, marginTop: '-26px'}} className="textcolors"><span style={{fontSize: 22}}>Email</span> <br /><a href="mailto:Harpalconstruction12@gmail.com" className="ftextcolor">Harpalconstruction12@gmail.com</a></p>
            </div>
            {/* address */}
            <div className="cphone">
              <span style={{marginLeft: 20}} className="textcolors"><i className="fa-solid fa-location-dot" /></span>
              <p style={{marginLeft: 50, marginTop: '-26px'}} className="ftextcolor"><span style={{fontSize: 22}} className="textcolors">Address</span> <br />321, Arth Business Center(abc),<br />
                Opposite TorrentPower SubStation,<br />
                Sardar Patel Ring Rd,<br />
                Ahmedabad, Gujarat 382350
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</footer>
  )
}

export default Footer
