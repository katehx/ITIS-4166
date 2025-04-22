const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const offerSchema = new Schema({
    amount: {
        type: Number,
        required: [true, 'Offer amount is required'],
        min: [0.01, 'Offer must be at least $0.01']
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    item: {
        type: Schema.Types.ObjectId,
        ref: 'Item'
    }
}, { timestamps: true }
);

//collection name is offers in the database 
module.exports = mongoose.model('Offer', offerSchema);
