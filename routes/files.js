// importing express router
const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const File = require('../models/file');
const { v4: uuid4} = require('uuid');


// cb() 1st parameter is error, there is no error thats why we passed null and 2nd is storage of file


// storage changing name and giving location in upload folder
let storage = multer.diskStorage({

    destination: (req,file,cb) => cb(null,'uploads/'),
    filename : (req,file,cb) =>{
        const uniqueName = `${Date.now()}-${Math.round(Math.random()*1E9)}${path.extname(file.originalname)}`; // extname -- extension name
        cb(null,uniqueName);
    }
})


let upload = multer({
    storage, // we can write it as storage:storage, bcz both names are same
    limit:{fileSize: 100*1024*1024}, // 100 MB

}).single('myfile');
// single bcz we are sharing single file 

/*
router.get('/' , (req,res)=>{

    // store files which comes in upload folder
    //installing lib for file saving  cmd--> yarn add multer

    res.send("hello");
    // response ---> link

});*/

router.post('/' , (req,res)=>{

    // store files which comes in upload folder
    //installing lib for file saving  cmd--> yarn add multer

    upload(req,res, async (err)=>{

        // validate request
            
        if(!req.file)
        {
          //  return res.json({error: 'All fields are required'});
        }
        

        if(err)
        {
           // return res.status(500).send({error:err.message });
        }

        //store into database

        const file = new File({

            filename: req.file.filename,
            uuid : uuid4(),
            path : req.file.path ,
            size : req.file.size
        });

        const response = await file.save();  

        return res.json({file : `${process.env.APP_BASE_URL}/files/${response.uuid}`});
        // returned download link

    });


    // response ---> link

});

router.post('/send',async (req,res) => {

    const {uuid, emailTo, emailFrom } = req.body;
    // validate request

    if(!uuid || !emailFrom || !emailTo)
    {
        return res.status(422).send({error : 'All fields are required'});
    }

    // Get data from Database

    const file = await File.findOne( { uuid: uuid });

    if(file.sender)
    {
        return res.status(422).send({error : 'Email Already sent'});
    }

    file.sender = emailFrom;
    file.receiver = emailTo;

    const response = await file.save();

    // send email

    const sendMail = require('../services/emailService');
     
    sendMail({
        from:emailFrom,
        to:emailTo,
        subject: 'inShare file sharing',
        text: `${emailFrom} shared a file with you`,
        html: require('../services/emailTamplet')({
            emailFrom : emailFrom,
            downloadLink: `${process.env.APP_BASE_URL}/files/${file.uuid}`,
            size :parseInt(file.size/1000)+'KB',
            expires : '24 hours'
        })
    });

    return res.send({success : true});

});





module.exports = router;