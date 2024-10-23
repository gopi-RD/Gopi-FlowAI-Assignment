const express=require("express")
const app = express()
const dotEnv=require("dotenv")
const mongoose=require("mongoose") 
const cors=require("cors")
const PORT=process.env.PORT || 3000
const userRoute=require("./routes/User")
const transactionRoutes=require("./routes/Transaction")
 
dotEnv.config()



app.use(express.json())
app.use(cors())
app.use("/user",userRoute)
app.use("/trans",transactionRoutes)

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL).then(()=>console.log("Connected to MongoDB")).catch((error)=>console.log(`DB Error is ${error}`));

app.listen(PORT,()=>{
    console.log(`Server  is running on port ${PORT}`)
})

app.get("/",(request,response)=>{
    response.send("Welcome to Flow Ai Assignment!")
})