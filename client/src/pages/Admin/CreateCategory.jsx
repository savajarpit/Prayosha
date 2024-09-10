import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import Adminmenu from "../../components/Layout/Adminmenu";
import toast from "react-hot-toast";
import axios from "axios";
import Categoryform from "../../components/Form/Categoryform";
import { Button, Modal } from 'antd';
import slugify from "slugify";
const CreateCategory = () => {
  const [category, setcategory] = useState([]);
  const [name,setname]=useState("")
  const [visibles,setvisible]=useState(false)
  const [selected,setselected]=useState(null)
  const[updatename,setupdatename]=useState("")
  // handle form
  const handlesubmit=async(e)=>{
    e.preventDefault()
    try{
      const {data}=await axios.post( `${import.meta.env.VITE_APIS}/api/v1/category/create-category`,{name})
      if(data.success){
        toast.success(`${name} is created`)
        getAllcategory()
      }
      else{
        toast.error(data.message)
      }
    }catch(error){
      console.log(error)
      toast.error("Something went wrong in input form")
    }
  }

  // update category
  const handleupdate=async(e)=>{
    e.preventDefault()
    try{
      const {data}=await axios.put(`${import.meta.env.VITE_APIS}/api/v1/category/update-category/${selected._id}`,{name:updatename,slug:slugify(updatename)})
      if(data?.success){
        toast.success(`${updatename} is updated`)
        setupdatename("")
        setselected(null)
        setvisible(false)
        getAllcategory()
      }
    }catch(error){
      console.log(error)
      toast.error("Something went wrong")
    }
  }

    // delete category
    const handledelete=async(pid)=>{
      
      try{
        const {data}=await axios.delete(`${import.meta.env.VITE_APIS}/api/v1/category/delete-category/${pid}`,{name:updatename,slug:slugify(updatename)})
        if(data?.success){
          toast.success(`Category is deleted`)
         
          getAllcategory()
        }
      }catch(error){
        console.log(error)
        toast.error("Something went wrong")
      }
    }

  // get all category
  const getAllcategory = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APIS}/api/v1/category/get-category`
      );
      if (data?.success) {
        setcategory(data?.category);
       
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };
  useEffect(() => {
    getAllcategory();
  }, []);

  return (
    <Layout title={"Dashboard - Create Category"}>
      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col-md-3 ">
            <Adminmenu />
          </div>
          <div className="col-md-9">
            <h3 className="text-center mt-3">Manage Catagory</h3>
            <div className="p-3 ">
              <Categoryform handlesubmit={handlesubmit} value={name} setvalue={setname}/>
            </div>
            <div className="">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                    {category?.map((c,index)=>(
                      
                  <tr key={c._id}>
                      <td >{c.name}</td>
                      <td>
                        <button className="btn btn-primary ms-2" onClick={()=>{setvisible(true); setupdatename(c.name); setselected(c)}}>Edit</button>
                        <button className="btn btn-danger ms-2" onClick={()=>{handledelete(c._id)}}>Delete</button>
                      </td>
                    </tr>
                  
                    ))}
                </tbody>
              </table>
              <div>
                 <Modal onCancel={()=>{setvisible(false)}} footer={null} open={visibles}>
                  <Categoryform value={updatename} setvalue={setupdatename} handlesubmit={handleupdate}/>
                 </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
