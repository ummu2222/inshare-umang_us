// yarn dev -> to start server 
// rest API client insomia/postman



const express = require('express');

const app = express(); // calling express fun to eccess objects
const path = require('path');
const cors = require('cors');

const PORT = process.env.PORT || 3000 ;

app.use(cors(corsOption));
// to add css in download.ejs or to remove MIME error
app.use(express.static('public'));
app.use(express.json()); // middleware of express , it will parse json data

const connectDB = require('./config/db');
connectDB();

// cors 
const corsOption ={
    origin: process.env.ALLOWED_CLIENTS.split(',')
    // [http://localhost:3000],etc... 
}

//--------Template engine
// view engine set
app.set('views',path.join(__dirname , '/views'));
app.set('view engine', 'ejs');


//---------Routes

app.use('/api/files',require('./routes/files'));
app.use('/files', require('./routes/show') );
app.use('/files/download',require('./routes/download'));


app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`);
});
