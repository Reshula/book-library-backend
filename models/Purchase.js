const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // ID user
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true }, // ID book
    purchasedAt: { type: Date, default: Date.now },

});

module.exports = mongoose.model('Purchase', purchaseSchema);


