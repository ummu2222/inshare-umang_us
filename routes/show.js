const router = require('express').Router();
const File = require('../models/file');

// async and await ??
//whenever we use await we have to handel error

router.get('/:uuid', async (req,res)=>{

    try{
        const file = await File.findOne({ uuid: req.params.uuid }) // params having all dynamic parameter

        if(!file)
        {
            return res.render('download',{error : 'Something went wrong!!!'});
        }

        return res.render('download', {
            uuid : file.uuid ,
            fileName : file.filename,
            fileSize : file.size,
            downloadLink : `${process.env.APP_BASE_URL}/files/download/${file.uuid}`
        });

    } catch(err){
        return res.render('download',{error : 'Something went wrong!!!'});
    }


});



module.exports = router;

//1:08