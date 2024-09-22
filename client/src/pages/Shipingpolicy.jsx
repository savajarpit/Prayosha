import React,{useEffect} from "react";
import Layout from "../components/Layout/Layout";
import "../styles/shipingpolicy.css";
const Shipingpolicy = () => {
  useEffect(()=>{
    window.scrollTo(0, 0);
  },[])
  return (
    <Layout>
     <div className="container">
     <div className="shipping-policy-container container ">
        <div className="container">
          <h1 className="shipping-policy-title">Shipping Policy</h1>
          <p className="shipping-policy-intro">
            This Shipping Policy outlines the terms and conditions regarding the
            shipping of our products to ensure a smooth and satisfactory
            experience for our customers. Prayosha Oil reserves the right to
            update or modify these terms and conditions at any time without
            prior notice.
          </p>
        </div>
        <div className="shipping-section ">
          <div className="container">
            <h2 className="shipping-section-title">1. Order Processing:</h2>
            <div className="shipping-subsection">
              <h3 className="shipping-subsection-title">a. Processing Time:</h3>
              <p className="shipping-subsection-content">
                Orders are typically processed and dispatched within the same or
                the next business day (excluding weekends and holidays) after
                the order is placed and payment is confirmed. Delivery of the
                shipment is subject to the courier company or post office norms.
              </p>
            </div>
          </div>
          <div className="shipping-subsection">
            <div className="container">
              {" "}
              <h3 className="shipping-subsection-title">
                b. Order Confirmation:
              </h3>
              <p className="shipping-subsection-content">
                Upon placing an order, you will receive an email confirmation
                with the details of your purchase and order number. Please
                review this confirmation for accuracy and contact us immediately
                if any corrections are needed.
              </p>
            </div>
          </div>
        </div>
        <div className="shipping-section">
          <div className="container">
            <h2 className="shipping-section-title">2. Shipping Methods:</h2>
            <div className="shipping-subsection">
              <h3 className="shipping-subsection-title">
                a. Domestic Shipping:
              </h3>
              <p className="shipping-subsection-content">
                Shipping times and costs are calculated at checkout based on the
                pincode submitted on the order page. Orders are shipped through
                registered domestic courier companies and/or registered Indian
                post only.
              </p>
              <p className="shipping-subsection-content">
                We envision offering international shipping in the future.
              </p>
            </div>
          </div>
        </div>
        <div className="shipping-section">
          <div className="container">
            <h2 className="shipping-section-title">3. Shipping Rates:</h2>
            <div className="shipping-subsection">
              <h3 className="shipping-subsection-title">a. Domestic Rates:</h3>
              <p className="shipping-subsection-content">
                Domestic shipping rates are determined by the weight of the
                order and the selected shipping method. Free shipping may be
                available for orders over a certain value, as specified on our
                website.
              </p>
              <p className="shipping-subsection-content">
                These Terms and Conditions may change.
              </p>
            </div>
          </div>
        </div>
        <div className="shipping-section">
          <div className="container">
            <h2 className="shipping-section-title">4. Shipment Tracking:</h2>
            <div className="shipping-subsection">
              <h3 className="shipping-subsection-title">
                a. Tracking Information:
              </h3>
              <p className="shipping-subsection-content">
                Once your order is dispatched, you will receive a shipping
                confirmation email with tracking information. You can use this
                information to track the status and location of your package.
              </p>
            </div>
          </div>
          <div className="shipping-subsection">
            <div className="container">
              <h3 className="shipping-subsection-title">
                b. Delivery Updates:
              </h3>
              <p className="shipping-subsection-content">
                We recommend keeping an eye on the provided tracking information
                for real-time updates on the delivery status. In case of any
                issues, please contact our customer support team for assistance.
              </p>
            </div>
          </div>
        </div>
        <div className="shipping-section">
          <div className="shipping-subsection">
            <div className="container">
              <h2 className="shipping-section-title">5. Delivery Times:</h2>
              <h3 className="shipping-subsection-title">a. Estimated Times:</h3>
              <p className="shipping-subsection-content">
                Delivery of all orders will be to the registered address of the
                buyer and/or address provided by the buyer at the time of Order.
                Prayosha Oil is in no way responsible for any damage to the
                order while in transit to the buyer. Estimated delivery times
                are provided during checkout based on the shipping method
                selected. Please note that these are estimates, and actual
                delivery times may vary due to external factors.
              </p>
            </div>
          </div>
        </div>
        <div className="shipping-section">
          <div className="shipping-subsection">
            <div className="container">
              <h2 className="shipping-section-title">
                6. Order Changes and Cancellations:
              </h2>
              <h3 className="shipping-subsection-title">a. Changes:</h3>
              <p className="shipping-subsection-content">
                Once an order is placed, changes to the shipping address,
                products, or other details may not be possible. Please review
                your order carefully before confirming the purchase.
              </p>
            </div>
          </div>
          <div className="shipping-subsection">
            <div className="container">
              <h3 className="shipping-subsection-title">b. Cancellations:</h3>
              <p className="shipping-subsection-content">
                Orders cannot be canceled after they have been dispatched. If
                you wish to cancel an order, please contact us as soon as
                possible, and we will do our best to accommodate your request.
              </p>
            </div>
          </div>
        </div>
        <div className="shipping-section">
          <div className="container">
            <h2 className="shipping-section-title">7. Contact Us:</h2>
            <p className="shipping-subsection-content">
              If you have any questions or concerns about our Shipping Policy,
              please contact our concerned person at +91 8849287519 or write to
              us at{" "}
              <a href="mailto:Prayoshanaturaloil@gmail.com" className="policy-link">
              Prayoshanaturaloil@gmail.com
              </a>
              .
            </p>
          </div>
        </div>
        <div className="container">
          {" "}
          <address className="shipping-address">
            Prayosha Oil <br />
            Shop No. 1 & 2,Gayatri Nagar Society,<br />
              Beside Tapovan School<br />
              Nana Varachha,<br />
                Surat, Gujarat 395006<br/>
          </address>
        </div>
      </div>
     </div>
    </Layout>
  );
};

export default Shipingpolicy;
