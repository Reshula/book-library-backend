const mongoose = require('mongoose');
const readingListSchema = new mongoose.Schema({

    books:[
        {
            title:String,
            author:String,
        },
    ],

});
const ReadingList = mongoose.model('ReadingList', readingListSchema);
module.exports = ReadingList;
