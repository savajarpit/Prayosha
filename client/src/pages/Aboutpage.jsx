import React,{useEffect} from "react";
import Layout from "../components/Layout/Layout";
import videos2 from "../../photos/videos2.mp4";
import fb4 from "../../photos/fb4.jpg";
import ce_oil from "../../photos/ce_oil.jpg";
import "../styles/aboutus.css";
function Aboutpage() {
  useEffect(()=>{
    window.scrollTo(0, 0);
  })
  return (
    <Layout title={"Aboutus-Prayoshaoil"}>
      <div className="about-banner-container">
        <video className="about-banner-video" autoPlay loop muted>
          <source src={videos2} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-12 text-center">
            <span
              className="text-center storeh1"
              style={{
                fontFamily: "sans-serif",
                fontSize: "2rem",
                fontWeight: "500",
                display: "block", // Ensures the span takes up the full width
                marginBottom: "0.5rem", // Adds space between the text and the hr
              }}
            >
              About Us
            </span>
            <div style={{ textAlign: "center" }}>
              {" "}
              {/* Ensures hr is centered */}
              <hr
                className="sline"
                style={{
                  backgroundColor: "blue",
                  border: "none",
                  borderRadius: ".5rem",
                  height: ".2rem",
                  width: "10%", // Adjust this if needed
                  margin: "0 auto", // Centers the hr element
                  marginTop: "0", // Removes any extra margin above the hr
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-3">
            <div className="headingtitle mt-5">
              <h2 className="textcolors" style={{ color: "#022760" }}>
                A Journey Back to Pure Flavors
              </h2>
            </div>
            <p className="mt-4" style={{ fontSize: "1.2rem" }}>
              In the bustling city of Surat, amidst the challenges of the
              COVID-19 pandemic, a simple idea transformed the world of cooking
              oil. Our founder, a newcomer to the city, longed for the authentic
              taste of home-cooked meals. He quickly realized that what was
              missing was the pure essence of true, original oil.
            </p>
            <p className="mt-4" style={{ fontSize: "1.2rem" }}>
              This realization sparked a desire to bring that pure oil to
              others. In October 2020, in city Surat, a small oil factory was
              born. Using the finest G-20 groundnuts, the first batch of
              groundnut oil was produced, marking the beginning of a new chapter
              for Prayosha Oil.
            </p>
          </div>
          <div className="col-md-6 mt-3">
            <img
              src={fb4}
              alt="aboutusimg"
              width="100%"
              height="90%"
              style={{
                border: "5px solid ",
                borderRadius: "8%",
                borderColor: "rgb(35, 74, 130)",
              }}
            />
          </div>
        </div>
      </div>

      <div className="container mt-4 aboutdiv1 mb-4">
        <div className="container text-center">
          <h2 style={{ fontWeight: "400" }}>
            OUR PROMISE{" "}
            <span style={{ fontWeight: "500", color: "#022760" }}>
              PURE.NATURAL.ORIGINAL
            </span>
          </h2>
        </div>
        <div className="container">
          {" "}
          <div className="row">
            <div className="col-md-6 mt-2 subdivs container">
              <div
                className="container  "
                style={{
                  border: "2px solid",
                  borderRadius: "20px",
                  borderColor: "rgb(37, 147, 184)",
                  backgroundColor: "#7eb7e9",
                 
                }}
              >
                <h4 className="text-center mt-2">PURITY</h4>
                <p className="text-center">
                  We carefully select top-grade peanuts, sourced directly from
                  trusted farmers, to guarantee that every drop of our oil meets
                  the highest standards of purity.
                </p>
              </div>
            </div>
            <div className="col-md-6 mt-2 subdivs container">
              <div
                className="container  "
                style={{
                  border: "2px solid",
                  borderRadius: "20px",
                  borderColor: "rgb(37, 147, 184)",
                  backgroundColor: "#7eb7e9",
                }}
              >
                <h4 className="text-center mt-2">NATURALITY</h4>
                <p className="text-center " style={{ marginBottom: "40px" }}>
                  We are committed to providing a natural and healthy
                  alternative to processed oils, prioritizing the well-being of
                  our valued customers.
                </p>
              </div>
            </div>
            <div className="col-md-6 mt-2 subdivs container">
              <div
                className="container"
                style={{
                  border: "2px solid",
                  borderRadius: "20px",
                  borderColor: "rgb(37, 147, 184)",
                  backgroundColor: "#7eb7e9",
                }}
              >
                <h4 className="text-center mt-2">ORIGINALITY</h4>
                <p className="text-center">
                  We produce our oil using time-honored techniques, preserving
                  the natural nutrients and flavors just as they are.
                </p>
              </div>
            </div>
            <div className="col-md-6 mt-2 subdivs container">
              <div
                className="container "
                style={{
                  border: "2px solid",
                  borderRadius: "20px",
                  borderColor: "rgb(37, 147, 184)",
                  backgroundColor: "#7eb7e9",
                }}
              >
                <h4 className="text-center mt-2">NOURISHING EVERY MEAL</h4>
                <p className="text-center">
                  Crafted with care, our oil enhances the true flavors of your
                  dishes, making every meal a wholesome experience.{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
     
    </Layout>
  );
}

export default Aboutpage;
