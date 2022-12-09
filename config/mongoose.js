const mongoose=require('mongoose');

mongoose.set('strictQuery', true);

mongoose.connect('mongodb://localhost/career-camp-db');

const db=mongoose.connection;

db.on('error',console.error.bind(console,"Error in Connect with DB"));

db.once('open',function(){
    console.log("Successfuly connected into db");
})

module.exports=db;