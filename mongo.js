require('dotenv').config();
const mongoose=require('mongoose');
const {MONGO_DB_URI,MONGO_DB_URI_TEST,NODE_ENV} =process.env;
const conectionString=NODE_ENV==='test'
    ?MONGO_DB_URI_TEST
    :MONGO_DB_URI;

//conection to db
mongoose.connect(conectionString)
    .then(()=>{
        console.log('conection ok!')
    })
    .catch((er)=>{
        console.error(er)
    })

    
   