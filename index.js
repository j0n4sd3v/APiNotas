require('./mongo');
const Note =require('./Models/Note');
const express = require('express');
const cors=require('cors');
const App=express();
const notFound= require('./Middleware/notFound.js');
const handleError = require('./Middleware/handleError');

App.use(express.json());
App.use(cors());
const PORT=process.env.PORT||3001;
App.listen(PORT,()=>{console.log(`Servidor corriendo en puerto ${PORT}`)});
//let notes=[];
/*const http= require('http');
const App= http.createServer((request,response)=>{
    response.writeHead(200, {'Content-Type':'application/json'});
    response.end(JSON.stringify(notes));
});*/




App.get('/',(request,response,next)=>{
    response.send('<h1>Welcome to api notes</h1>')
});
App.get('/api/notes',(request,response)=>{
   Note.find({})
    .then((notes)=>{
       response.json(notes);       
    })
    .catch(error=>next(error))
});

App.get('/api/notes/:userID',(request,response,next)=>{
    const {userID}= request.params;
    Note.find({userId:userID}).then(note=>{
        response.json(note);
    }).catch(error=>next(error))
});

App.delete('/api/notes/:id',(request,response,next)=>{
    const {id}=request.params;
    Note.findByIdAndRemove(id).then(result=>{
      
   }).catch(error=>next(error));
   response.status(204).end();
});

App.post('/api/notes',(request,response,next)=>{
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
App.put('/api/notes/:id',(request,response,next)=>{
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

App.use(notFound);
App.use(handleError)

module.exports=App;
