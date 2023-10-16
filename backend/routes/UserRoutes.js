const express= require('express');

const UserModel= require("../model/UserModel")

const bcrypt= require("bcrypt")
const jwt= require("jsonwebtoken")

const UserRoute = express.Router();


//==================================================>

UserRoute.post("/register",async function(req,res){

    try {
       const {password,email}=req.body
       
       const users= await UserModel.findOne({email})

       if(users){
        return res.status(400).json({
            msg:"User already exists."
        })
       }

      const hashedPass= await bcrypt.hash(password,10)
      const user= new UserModel({...req.body,password:hashedPass})
      await user.save()

      return res.status(200).send({
        message: "User has been registered successfully."
      })



    } catch (error) {
        return res.status(500).send({
        message: error.message
      })
    }
})


//======================================================>


UserRoute.post("/login",async function(req,res){
    try {
        
        const {email,password}=req.body

        const user= await UserModel.findOne({email})
        //console.log(user)


        if(!user){
            return res.status(404).json({
                message: "User with this email not found."
              })
        }

        const ispassword= await bcrypt.compare(password,user.password)
        if(!ispassword){
            return res.status(404).send({
                message: "Password not matching."
              })
        }

        const  token = jwt.sign({ userId:user._id ,username:user.username }, 'blog');

       // console.log(token)

       return res.status(200).json({
        message: "User has been logged in successfully.",
        token,user
      })


    } catch (error) {
        return res.status(500).send({
            message: error.message
          })
    }
})

module.exports=UserRoute