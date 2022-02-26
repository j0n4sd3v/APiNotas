const mongoose=require('mongoose');
const supertest=require('supertest');
const Note =require('../Models/Note')
const{ App,server }=require('../index');

const api=supertest(App);
const initalNotes=[
    {
        userId:'1',
        title:'Acete cargo si no funciona',
        body:'Siempre que la cages, pue te aces cargo!'
    },
    {
        userId:'2',
        title:'Otro punto de vista',
        body:'Las gafas con la graduacion apropiada pueden subir los puntos en la vision XD'
    }
]
beforeEach(async()=>{
    await Note.deleteMany({});
    const note1=new Note(initalNotes[0]);
    await note1.save();

    const note2=new Note(initalNotes[1]);
    await note2.save();
})
test('notes are returned as a JSON',async ()=>{
  await api
        .get('/api/notes')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('dos notas',async()=>{
    const notes=await api.get('/api/notes')
    expect(notes.body).toHaveLength(initalNotes.length);
})
afterAll(()=>{
    mongoose.connection.close();
    server.close();
})