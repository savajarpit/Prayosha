import React,{useEffect} from "react";
import Layout from "../components/Layout/Layout";
import contactus from "../assets/images/contactus.jpeg";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
import "../styles/contactus.css";
function Contectpage() {
  useEffect(()=>{
    window.scrollTo(0, 0);
  })
  return (
    <Layout title={"Contact-us - prayoshaoil"}>
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <div
              className=""
              style={{
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span
                className="text-center  storeh1"
                style={{
                  fontFamily: " Marhey, sans-serif",
                  fontSize: " 2rem",
                  fontWeight: "500",
                }}
              >
                Contact Us
              </span>
              <hr
                className="sline"
                style={{
                  backgroundColor: "blue",
                  border: "none",
                  borderRadius: ".5rem",
                  height: ".2rem",
                  width: "12%",
                  marginTop: "-2px",
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-6 ">
            <div className="contactheading mt-2">Connect With US</div>
            <div className="container mt-2 company-info">
              <div className="row">
                <div className="col-12">
                  <h5 className="info-title">
                    Company<span className="info-text"> - SHAYONA SALES</span>
                  </h5>

                  <h5 className="info-title" style={{ marginTop: "25px" }}>
                    Email
                    <span className="info-text">
                      {" "}
                      -{" "}
                      <a
                        href="mailto:Prayoshanaturaloil@gmail.com"
                        className="info-link"
                        style={{ color: "#495057" }}
                      >
                        Prayoshanaturaloil@gmail.com
                      </a>
                    </span>
                  </h5>

                  <h5 className="info-title" style={{ marginTop: "25px" }}>
                    Phone
                    <span className="info-text">
                      {" "}
                      -{" "}
                      <a
                        href="tel:+91 8849287519"
                        className="info-link"
                        style={{ color: "#495057" }}
                      >
                        +91 8849287519
                      </a>
                    </span>
                  </h5>

                  <h5 className="info-title" style={{ marginTop: "25px" }}>
                    Corporate Office
                    <span className="info-text">
                      {" "}
                      - Shayona sales
                      <p>
                      Shop No. 1 & 2, Gayatrinagar Society,Beside Tapovan School,Nana Varachha, Surat, Gujarat
                        395006
                      </p>
                    </span>
                  </h5>

                  <h5 className="info-title" style={{ marginTop: "25px" }}>
                    Working Days
                    <span className="info-text"> - Monday to Saturday</span>
                  </h5>

                  <h5 className="info-title" style={{ marginTop: "25px" }}>
                    Timing<span className="info-text"> - 9 am to 6 pm</span>
                  </h5>

                  <h5 className="info-title" style={{ marginTop: "25px" }}>
                    Certification
                  </h5>
                  <p className="info-text">
                    An ISO 9001:2015 Certified Company
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div>
              <div className="Registerpage mb-3" >
                <div className="wrapper" style={{maxWidth:"760px"}}>
                  <h2>Get in Touch</h2>
                  <p style={{ color: "#505050" }}>
                    Feel free to fill this contact form to get in touch with our
                    team.
                  </p>
                  <form  action="https://formspree.io/f/mpwabdqa"
  method="POST">
                    <div className="input-box">
                      <input type="text" placeholder="*Name" required name="Name" />
                    </div>
                    <div className="input-box">
                      <input type="email" placeholder="*Email" required name="email"/>
                    </div>

                    <div className="input-box">
                      <input type="text" placeholder="*Phone Number" required name="phone number" />
                    </div>
                    <div className="input-box">
                      <input type="text" placeholder="*Area/City" required  name="area/city"/>
                    </div>

                    <div className="input-box">
                      <input type="text" placeholder="*Message" required name="message"/>
                    </div>

                    <div className="input-box button mt-4 ">
                      <input type="Submit" defaultValue="Submit" />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Contectpage;
