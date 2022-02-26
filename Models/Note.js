const mongoose=require('mongoose');
const {Schema,model} =mongoose;

//define schema for the data
const notesSchema =new Schema({
    title:String,
    body:String,
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
})

notesSchema.set('toJSON',{
    transform:(document,returnedObject)=>{
        returnedObject.id=returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
}})

//define a model with the schema
const Note=new model('Note',notesSchema);

//ejemplo
/* const note=new Note({
        userId:'1',
        title:'mira vos',
        body:'esta es la primera pureba'
    });
    note.save()
        .then(res=>{
            console.log(res);
            mongoose.connection.close();
        })
        .catch(er=>console.error(er))*/

module.exports=Note;