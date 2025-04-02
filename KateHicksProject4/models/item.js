const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    seller: {
        type: Schema.Types.ObjectId, ref: 'User'
        //required: [true, 'Seller is required']
    },
    condition: {
        type: String,
        enum: ['New', 'Like New', 'Used - Good', 'Used - Fair', 'Damaged'],
        required: [true, 'Condition is required']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0.01, 'Price must be at least $0.01']
    },
    details: {
        type: String,
        required: [true, 'Details are required'],
        minlength: [10, 'Details must be at least 10 characters long']
    },
    image: {
        type: String,
        required: [true, 'Image file path is required']
    },
    active: {
        type: Boolean,
        default: true
    }
}, { timestamps: true }
);

//collection name is items in the database 
module.exports = mongoose.model('Item', itemSchema);
