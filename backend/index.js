const express= require('express');
const connection =require("./db")

const cors= require('cors')


 const blogRoutes=require("./routes/BlogRoutes")
//const userrRoute=require("./routes/UserRoutes")
const UserRoutes=require("./routes/UserRoutes")
const app=express()

app.use(cors())
app.use(express.json())

app.use("/api",UserRoutes)
app.use("/api",blogRoutes)



app.get("/",(req,res)=>{
    res.send({"msg":"Welcome to the Server"})
})

app.listen(8080,async(req,res)=>{
    try {
        await connection 
        console.log("Connected to server.")
    } catch (error) {
       console.log(error.message) 
    }
})