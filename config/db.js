
require('dotenv').config(); 

const mongoose = require('mongoose');


function connectDB(){
    // database connection 
    mongoose.connect(process.env.MONGO_CONNECTION_URL, {
        useNewUrlParser:true, useCreateIndex:true, useUnifiedTopology:true , useFindAndModify:true
    }).catch(err =>{
        console.log(err);
    });
    const connection=mongoose.connection;
    
    connection.once('open', ()=>{
        console.log("database connected");
    }).catch(err =>{
        console.log("Connection failed!");
    });

} 

module.exports = connectDB;