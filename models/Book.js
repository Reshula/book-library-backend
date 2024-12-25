const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({

    title:{
        type:String,
        require:true,
    },
    author:{
        type:String,
        require:true,
    },
    description:{
        type:String,
    },
    
    isPurchased: { 
        type: Boolean,
        default: false
    },
    price: {
        type: Number, 
        required: true, 
    },
});

const Book = mongoose.model('Book', bookSchema);



module.exports = Book;