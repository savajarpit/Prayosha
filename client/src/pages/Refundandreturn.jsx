import React, { useEffect } from 'react'
import Layout from '../components/Layout/Layout';
import "../styles/refundandreturn.css"
const Refundandreturn = () => {
  useEffect(()=>{
    window.scrollTo(0, 0);
  },[])
  return (
    <Layout>
        <div className="policy-container">
  <div className="container">
  <h1 className="policy-title">Refund and Return Policy</h1>
  <p className="policy-updated">Last Updated: 10-7-2024</p>
  <p className="policy-intro">
    Prayosha Oil is committed to delivering high-quality products and providing exceptional customer service. 
    Please review our Refunds &amp; Return Policy to understand your rights and responsibilities regarding refunds, 
    returns, and exchanges.
  </p>
  </div>
    <div className="container">  <h2 className="policy-section-title">1. Returns Eligibility:</h2>
  <h3 className="policy-subtitle">a. Defective or Damaged Products:</h3>
  <p className="policy-text">
    If you receive a defective or damaged product (subject to investigation), please contact us within 7 days 
    of receiving the item. We will provide instructions on how to return the product for a replacement or refund.
  </p>
  <h3 className="policy-subtitle">b. Incorrect Items:</h3>
  <p className="policy-text">
    If you receive an incorrect item (subject to investigation), please notify us within 7 days of receiving the order. 
    We will arrange for the correct item to be shipped to you or issue a refund.
  </p>
  <h3 className="policy-subtitle">c. Unsatisfactory Products:</h3>
  <p className="policy-text">
    If you are unsatisfied with your purchase for any reason other than the above, please contact us within 7 days of 
    receiving the order. We will assess each case individually to determine the appropriate solution.
  </p>
  <p className="policy-text">
    Subject to investigation, Prayosha Oil may accept any return 7 days after delivery. In any case of a quality complaint, 
    the firm may try to exchange the product with the quantity left, or else the firm may pay back the balance amount of the product 
    (depending on qty. left).
  </p>
  <p className="policy-text">
    Only for the reasons mentioned below will Prayosha Oil accept returns:
  </p>
  <ul className="policy-list">
    <li>Wrong Product</li>
    <li>Damaged Product</li>
    <li>Incomplete Package</li>
  </ul></div>
  <div className="container">
  <h2 className="policy-section-title">2. Return Process:</h2>
  <h3 className="policy-subtitle">a. Authorization:</h3>
  <p className="policy-text">
    Before returning any items, please contact our customer support team at <a href="mailto:Prayoshanaturaloil@gmail.com" className="policy-link">Prayoshanaturaloil@gmail.com</a> 
    to obtain authorization. Unauthorized returns may not be accepted.
  </p>
  <h3 className="policy-subtitle">b. Condition of Products:</h3>
  <p className="policy-text">
    Returned products must be unused, in their original packaging, and in the same condition as when you received them. We reserve 
    the right to refuse returns that do not meet these criteria.
  </p>
  </div>
  <div className="container">
  <h2 className="policy-section-title">3. Refund Process:</h2>
  <h3 className="policy-subtitle">a. Refund Eligibility:</h3>
  <p className="policy-text">
    Refunds are issued for the purchase price of the returned item(s). Shipping costs are non-refundable.
  </p>
  <h3 className="policy-subtitle">b. Refund Timeframe:</h3>
  <p className="policy-text">
    Subject to investigation, Prayosha Oil may pay back the amount in 7 working days from the date of approval. The time it takes 
    for the refund to reflect in your account may vary depending on your payment method.
  </p>
  </div>
  <div className="container"><h2 className="policy-section-title">4. Exchanges:</h2>
  <h3 className="policy-subtitle">a. Product Exchanges:</h3>
  <p className="policy-text">
    If you wish to exchange a product for a different variant, please contact us for authorization. Exchanges are subject to product availability.
  </p></div>
  <div className="container">
  <h2 className="policy-section-title">5. Non-Returnable Items:</h2>
  <h3 className="policy-subtitle">a. Sale and Clearance Items:</h3>
  <p className="policy-text">
    Sale and clearance items are final sale and cannot be returned or exchanged unless defective.
  </p>
  <h3 className="policy-subtitle">b. Gift Cards:</h3>
  <p className="policy-text">
    Gift cards are non-refundable.
  </p>
  </div>
  <div className="container"><h2 className="policy-section-title">6. Contact Us:</h2>
  <p className="policy-text">
    If you have any questions or concerns about our refunds &amp; return policy, please contact us at  
    <a href="mailto:Prayoshanaturaloil@gmail.com" className="policy-link">Prayoshanaturaloil@gmail.com</a>.
  </p>
  <address className="policy-address">
    Prayosha Oil<br />
    Shop No. 1 & 2,Gayatri Nagar Society,<br />
              Beside Tapovan School<br />
              Nana Varachha,<br />
                Surat, Gujarat 395006<br/>
    <a href="mailto:Prayoshanaturaloil@gmail.com" className="policy-link">Prayoshanaturaloil@gmail.com</a>
  </address></div>
</div>

    </Layout>
  )
}

export default Refundandreturn
