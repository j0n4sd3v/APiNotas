const mongoose=require('mongoose');
const supertest=require('supertest');
const{ App,server }=require('../index');

const api=supertest(App);

test('notes are returned as a JSON',async ()=>{
  await api
        .get('/api/notes')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})
afterAll(()=>{
    mongoose.connection.close();
    server.close();
})