const mongoose =require('mongoose');
// Schema ??
const Schema = mongoose.Schema;

const fileSchema = new Schema({

    // it is a blue print of object how it looks like in database
    filename : { type:String, required:true },
    path : { type:String, required:true },
    size : { type:Number, required:true },
    uuid : { type:String, required:true },
    sender : { type:String, required:false },
    receiver : { type:String, required:false },

},{timestamps:true});

// timestamps ?? 43min


module.exports = mongoose.model('File',fileSchema);
