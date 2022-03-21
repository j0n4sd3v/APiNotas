const notesRouter=require('express').Router();
const Note=require('../Models/Note');
const User=require('../Models/User');

notesRouter.get('/',(request,response)=>{
    Note.find({}).populate('user',{
        username:1
    })
     .then((notes)=>{
        response.json(notes);       
     })
     .catch(error=>next(error))
 });
 
 notesRouter.get('/:userID',(request,response,next)=>{
     const {userID}= request.params;
     Note.find({userId:userID}).then(note=>{
         response.json(note);
     }).catch(error=>next(error))
 });
 
 notesRouter.delete('/:id',async(request,response,next)=>{
     const {id}=request.params;
     try{
        const note=await Note.findById(id);
        const postUser=await User.findById(note.user);
        const notes=postUser.notes.filter((note)=>note!=id);
        postUser.notes=notes;
        await postUser.save();
        const resp=await Note.findByIdAndRemove(id)
     } 
    catch(error){
        next(error)
    };
    response.status(204).end();
 });
 
 notesRouter.post('/',async(request,response,next)=>{
     const {userId,title,body}=request.body;
     if(body!==""){
       const postUser= await User.findById(userId);  
       const newNote=new Note({
            title:title,
            body:body,
            user:postUser._id
       });
       try{
        const savedNote=await newNote.save();
        postUser.notes=postUser.notes.concat(savedNote._id);
        await postUser.save();
        response.json(savedNote);
       }
        catch(e){

        }
     }
 });
 notesRouter.put('/:id',(request,response,next)=>{
     const note=request.body;
     const {id}=request.params;
     if(Note.findById(id)&note!==""){
       const newNote={
             title:note.title,
             body:note.body
       }
      Note.findByIdAndUpdate(id,newNote,{new:true})
        .then(result=>{ response.json(result)})
        .catch(error=>next(error))
     }else{ throw 'CastError id or input error'}
 });
 module.exports=notesRouter;