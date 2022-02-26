const notesRouter=require('express').Router();
const Note=require('../Models/Note');

notesRouter.get('/',(request,response)=>{
    Note.find({})
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
 
 notesRouter.delete('/:id',(request,response,next)=>{
     const {id}=request.params;
     Note.findByIdAndRemove(id).then(result=>{
       
    }).catch(error=>next(error));
    response.status(204).end();
 });
 
 notesRouter.post('/',(request,response,next)=>{
     const note=request.body;
     if(note!==""){
       const newNote=new Note({...note});
       newNote.save()
         .then(res=>{
             response.json(res);
             mongoose.connection.close();
         })
         .catch(error=>next(error))
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