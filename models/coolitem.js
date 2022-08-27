const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const coolitemSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true,
    },
    author:{
        type: String,
        required: true,
    },
    visibility:{
        type: String,
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
    }
})

module.exports=mongoose.model('CoolItem', coolitemSchema);