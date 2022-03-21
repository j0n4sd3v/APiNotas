const loginRouter=require('express').Router();
const bCrypt=require('bcrypt');
const User=require('../Models/User');

loginRouter.post('/', async (request,response)=>{
    const {body}=request;
    const {username,password}=body;
    const user= await User.findOne({username});
    
    const passwordCorrect=user===null?false:await bCrypt.compare(password,user.passwordHash);

        if(!(user&&passwordCorrect)){
            response.status(401).json({error:'invalid user or password'});
        }
           
        response.send({
            name:user.name,
            username:user.username
         })
        
})
module.exports=loginRouter;