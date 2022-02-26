const usersRouter=require('express').Router();
const user=require('../Models/User');

usersRouter.post('/',async(request,response)=>{
   const {body}=request;
   const {name,username,password}=body;
   const newUser=new user({
       name,
       username,
       passwordHash:password
   })
   const savedUser=await newUser.save();
   response.json(savedUser);
})
module.exports =usersRouter;