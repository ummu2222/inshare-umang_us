// for expire time 
const File = require('./models/file');
const fs = require('fs'); // file system module

const connectDB =require('./config/db');
connectDB();

async function fetchData()
{
    const pastDate = new Date(Date.now()- (24*60*60*1000));

    const files = await File.find({ createdAt : { $lt: pastDate } });

    if(files.length)
    {
        // for of loop
        for(const file of files)
        {
            try
            {
                fs.unlinkSync(file.path);
                await file.remove();
                console.log(`successfully deleted ${file.filename}`);

            } catch(err) {
                console.log(`Error while deleting file ${err}`);
            }
            
        }
        console.log('job done!');

    }


} 

fetchData().then(process.exit);

// if we use async await then to handle error we use try catch block