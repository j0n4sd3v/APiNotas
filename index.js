require('./mongo');
const Note =require('./Models/Note');
const express = require('express');
const cors=require('cors');
const App=express();

App.use(express.json());
App.use(cors());
const PORT=process.env.PORT || 3001;
App.listen(PORT,()=>{console.log(`Servidor corriendo en puerto ${PORT}`)});
let notes=[];
/*const http= require('http');
const App= http.createServer((request,response)=>{
    response.writeHead(200, {'Content-Type':'application/json'});
    response.end(JSON.stringify(notes));
});*/




App.get('/',(request,response)=>{
    response.send('<h1>Welcome to api notes</h1>')
});
App.get('/api/notes',(request,response)=>{
   Note.find({})
    .then((notes)=>{
       response.json(notes);       
    })
 
});

App.get('/api/notes/:userID',(request,response)=>{
    const {userID}= request.params;
    Note.find({userId:userID}).then(note=>{
        response.json(note);
    })
});

App.delete('/api/notes/:id',(request,response,next)=>{
    const {id}=request.params;
    Note.findByIdAndRemove(id).then(result=>{
      
   }).catch(er=>next(er));
   response.status(204).end();
});

App.post('/api/notes',(request,response)=>{
    const note=request.body;
    if(note!==""){
      const newNote=new Note({...note});
      newNote.save()
        .then(res=>{
            response.json(res);
            mongoose.connection.close();
        })
        .catch(er=>console.error(er))
    }
});

App.use((reques,response)=>{
  response.status(404).json({error:"Page not found"}); 
})
