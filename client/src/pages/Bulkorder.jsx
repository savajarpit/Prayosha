import Layout from "./../components/Layout/Layout";
import React,{useState,useEffect} from 'react'
import axios from "axios";
import toast from "react-hot-toast";

function Bulkorder() {

  const [products, setProducts] = useState([]);

  // Get all products
  const getp = async () => {
    try {
      const { data } = await axios.get(
        `https://prayosha-backend.onrender.com/api/v1/product/get-product`
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    getp();
  }, []);

const handsu=()=>{
  toast.success("Thank you!!,we will reach to you soon")
}

  return (
    <Layout title={"Bulk-order prayosha oil"}>
<div className="Registerpage">
  <div className="wrapper">
    <h2>Bulk-Order</h2>
    <form action="https://formspree.io/f/mpwabdqa" method="post"  onSubmit={()=>{handsu()}}>
      <div className="input-box">
        <input
          type="text"
          placeholder="Enter your name"
          required
          name="Name"
        />
      </div>
      <div className="input-box">
        <input
          type="email"
          placeholder="Enter your email"
          required
          name="email"
        />
      </div>
      <div className="input-box">
        <input
          type="text"
          placeholder="Enter your contact no."
          required
          name="phone number"
        />
      </div>
      <div className="input-box">
        <input
          type="text"
          placeholder="Enter your Shop/Business name"
          required
          name="shop/business name"
        />
      </div>

      {/* Added select input */}
      <div className="input-box">
        <select required  className="form-select" aria-label="Default select example" name="product name">
          <option value="" disabled selected>Select Product</option>
          {products?.map((p) => (
            <option key={p._id}>{p.name}</option>
          ))}
        </select>
      </div>

      <div className="input-box">
        <input
          type="text"
          placeholder="Enter Quantity"
          required
          name="Quantity"
        />
      </div>

      <div className="input-box button">
        <input type="submit" value="Submit" />
      </div>
    </form>
  </div>
</div>

    </Layout>

  )
}

export default Bulkorder
