const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    firstName: {type: String, required: [true, 'cannot be empty']},
    lastName: {type: String, required: [true, 'cannot be empty']},
    email: {type: String, required: [true, 'cannot be empty'], unique: [true, 'this email address has been used']},
    password: {type: String, required: [true, 'cannot be empty']}
});

// Hash the plaintext password before saving the user document in the database - pre middleware
userSchema.pre('save', function(next){
    let user = this;
    if(!user.isModified('password')) {
        return next();
    } else {
        bcrypt.hash(user.password, 10)
            .then(hash => {
                user.password = hash;
                next();
            })
            .catch(err => next(err));
    }
});

userSchema.methods.comparePassword = function(inputPassword) {
  let user = this;
  return bcrypt.compare(inputPassword, user.password);
}

module.exports = mongoose.model('User', userSchema);