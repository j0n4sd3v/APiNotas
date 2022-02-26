require('./mongo');
const Note =require('./Models/Note');
const express = require('express');
const cors=require('cors');
const App=express();
const notFound= require('./Middleware/notFound.js');
const handleError = require('./Middleware/handleError');
const notesRouter=require('./Controllers/notes');
const usersRouter=require('./Controllers/users');

App.use(express.json());
App.use(cors());
const PORT=process.env.PORT||3001;
const server=App.listen(PORT,()=>{console.log(`Servidor corriendo en puerto ${PORT}`)});
//let notes=[];
/*const http= require('http');
const App= http.createServer((request,response)=>{
    response.writeHead(200, {'Content-Type':'application/json'});
    response.end(JSON.stringify(notes));
});*/

App.get('/',(request,response,next)=>{
    response.send('<h1>Welcome to api notes</h1>')
});

App.use('/api/notes',notesRouter)
App.use('/api/users',usersRouter);
App.use(notFound);
App.use(handleError)

module.exports={App,server};
