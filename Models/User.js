const mongoose=require('mongoose');
const {Schema,model} =mongoose;

//define schema for the data
const usersSchema =new Schema({
    name:String,
    username:String,
    passwordHash:String,
    notes:[{
        type:Schema.Types.ObjectId,
        ref:'Note'
    }]
})

usersSchema.set('toJSON',{
    transform:(document,returnedObject)=>{
        returnedObject.id=returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
}})

//define a model with the schema
const User=new model('User',usersSchema);



module.exports=User;