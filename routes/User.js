
const userController=require("../controllers/User")
const express = require('express');  
const routes=express.Router();

routes.post('/register', userController.UserRegisteration); 

routes.post('/login', userController.UserLogin); 
routes.get("/users", userController.getAllUsers)
routes.get("/user/:id", userController.getUser)

module.exports=routes;
