const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storySchema = new Schema({
    title: { type: String, require: [true, 'title is required'] },
    author: { type: String, require: [true, 'author is required'] },
    content: {type: String, require: [true, 'content is required'], minLength: [10, 'the content should have at least 10 characters']}
},
{timestamps: true}
);

//coilleciton name is stories in the database
module.exports = mongoose.model('Story', storySchema);

