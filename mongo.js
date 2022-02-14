const mongoose=require('mongoose');

const conectionString='mongodb+srv://jonasdev:dQLd4e629KYPqq5@cluster0.htgcm.mongodb.net/App_notes?retryWrites=true&w=majority'

//conection to db
mongoose.connect(conectionString)
    .then(()=>{
        console.log('conection ok!')
    })
    .catch((er)=>{
        console.error(er)
    })

    
   