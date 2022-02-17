const supertest=require('supertest');
const App =require('../index');

const api=supertest(App);

test('notes are returned as a JSON',async ()=>{
  await api
        .get('/api/notes')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})
