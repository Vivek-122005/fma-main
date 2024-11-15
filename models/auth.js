const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
});




userSchema.methods.comparePassword = async function (enteredPassword) {
    console.log('Entered password:', enteredPassword); 
    console.log('Stored hashed password:', this.password); 
    return enteredPassword == this.password;
};


const User = mongoose.model('User', userSchema);
module.exports = User;
