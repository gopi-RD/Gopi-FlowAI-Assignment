const User=require("../models/User")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

const dotEnv=require("dotenv")

dotEnv.config()

const SCRECT_KEY=process.env.SCRECT_KEY

const UserRegisteration=async (request, response) =>{
    
    try{
        const {name,email,password}=request.body 
        
        // Check if user already exists 
        const user=await User.findOne({email})
        if(user){
            return response.status(400).json({error_msg:"User email already exists"})
        }
        // Hash the password 
        const hashPassword=await bcrypt.hash(password,10)
        // Create a new user 
        let newUser=new User({
            name,
            email,
            password:hashPassword
        })
        
        // Save the user to the database 
        await newUser.save() 
        response.status(201).json({message:`User saved successfully`})
        console.log("User saved successfully")
    }
    catch(error){
        response.status(500).json({error_msg:`Server error ${error}`}) 
        console.log(`error: ${error}`)
    }
}


const UserLogin=async (request, response) => {
    try{
        const {email, password} = request.body  
        const user=await User.findOne({email})
            console.log(user)
        if (!user){
            response.status(400).json({error_msg:"Invalid Email"}) 
        }
        else{
            const isPasswordMatch = await bcrypt.compare(password,user.password) 
            if (isPasswordMatch===true){
                const payload={id:user._id} 
                const jwtToken= await jwt.sign(payload,SCRECT_KEY)
                response.json({jwt_token:jwtToken, message:`Login Successful`})
            }else{
                response.status(400).json({error_msg:"Invalid password"})
            }

        }
       
    }
    catch(error){
        response.status(500).json({error_msg:`Server error ${error}`})
    }
}


const getAllUsers=async(request,response)=>{
    try{
        const users=await User.find({}).populate({path:"transactionList",models:"Transaction"})
        response.status(200).json(users)
    }
    catch(error){
        response.status(500).json({error_msg:`Server error ${error}`})
    }
}


const getUser=async(request,response)=>{
    const {id}=request.params 
    try {
        const user=await User.findById(id).populate("transactionList")
        if (!user){
            response.status(404).json({error_msg:"User Not Found"})
        }
        
        response.status(200).json(user)
    } catch (error) {
        response.status(500).json({error_msg:`Internal server Error is ${error}`})
    }
}

module.exports={UserRegisteration, UserLogin,getAllUsers,getUser}

