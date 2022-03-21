const usersRouter=require('express').Router();
const user=require('../Models/User');
const bcrypt=require('bcrypt');

usersRouter.get('/',async(request, response)=>{
    const listUsers=await user.find({});
    response.json(listUsers);

})
usersRouter.post('/',async(request,response)=>{
   const {body}=request;
   const {name,username,password}=body;
   const saltRound=10;
   const passwordHash= await bcrypt.hash(password,saltRound);

   const newUser=new user({
       name,
       username,
       passwordHash
   })
   const savedUser=await newUser.save();
   response.json(savedUser);
})
module.exports =usersRouter;