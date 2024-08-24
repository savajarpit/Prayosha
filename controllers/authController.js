import { comparePassword, hashPassword } from "../helpers/authHelper.js"
import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js"
export const registerControllers=async(req,res)=>{
    try{
        const {name,email,password,phone,address,answer}=req.body
        if(!name){
            return res.send({message:"name is required"})
        }
        if(!password){
            return res.send({message:"password is required"})
        }
        if(!email){
            return res.send({message:"email is required"})
        }
        if(!phone){
            return res.send({message:"Phone no. is required"})
        }
        if(!address){
            return res.send({message:"address is required"})
        }
        if(!answer){
            return res.send({message:"answer is required"})
        }
        // check user
        const existinguser= await userModel.findOne({email})
        // existing user
        if(existinguser){
            return res.status(200).send({success:false,message:"already register plese login"})
        }
        //register user
        const hashedspassword=await hashPassword(password)
        // save
        const user=await new userModel({name,email,phone,address,password:hashedspassword,answer}).save()
        res.status(201).send({
            success:true,
            message:"User Register Successfully"  ,
            user
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error Registretion"
            
        })
    }
}
// post login
export const loginController=async (req,res)=>{
    try{
        const {email,password}=req.body
        // validation
        if(!email || !password){
            return res.status(404).send({success:false,message:"Invalid email or password"})
        }
        // check user
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).send({success:false,message:"email is not registerd"})
        }
        const match=await comparePassword(password,user.password)
        if(!match){
            return res.status(404).send({success:false,message:"Invalid  password"})
        }
        // Token
        const token= await jwt.sign({_id:user.id},process.env.JWT_SECRET,{expiresIn:"7d"})
        res.status(200).send({
            success:true,message:"Login successfully",
           user:{
            name:user.name,
            email:user.email,
            phone:user.phone,
            address:user.address,
            role:user.role,
           }
           ,
           token
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in login",
            error
        })
    }

}


// forgotpasswordController 


export const forgotpasswordController=async(req,res)=>{
    try{
        const {email,newpassword,answer}=req.body
        if(!email){
            res.status(400).send({message:"email is require"})
        }
        if(!newpassword){
            res.status(400).send({message:"new password  is require"})
        }
        if(!answer){
            res.status(400).send({message:"answer is require"})
        }
        // check
        const user=await userModel.findOne({email,answer})
        // validation
        if(!user){
            return(res.status(404).send({
                
                success:false,
                message:"wrong email or password"
            }))
        }
        const hashed= await  hashPassword(newpassword)
        await userModel.findOneAndUpdate(user._id,{password:hashed})
        res.status(200).send({
            success:true,message:"Password Reset Successfully"
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,message:
        "something went wrong!!",error
        })
    }
}

// test Controller
export const testController=(req,res)=>{
    res.send({ky:"chal gaya bhai"})
}


//update prfole
export const updateProfileController = async (req, res) => {
    try {
      const { name, email, password, address, phone } = req.body;
      const user = await userModel.findById(req.user._id);
      //password
      if (password && password.length < 6) {
        return res.json({ error: "Passsword is required and 6 character long" });
      }
      const hashedPassword = password ? await hashPassword(password) : undefined;
      const updatedUser = await userModel.findByIdAndUpdate(
        req.user._id,
        {
          name: name || user.name,
          password: hashedPassword || user.password,
          phone: phone || user.phone,
          address: address || user.address,
        },
        { new: true }
      );
      res.status(200).send({
        success: true,
        message: "Profile Updated SUccessfully",
        updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error WHile Update profile",
        error,
      });
    }
  };