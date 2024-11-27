const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: String,
    email: { 
        type: String, 
        unique: true, 
        required: true, 
        match: [/.+\@.+\..+/, "Please provide a valid email"]
    },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, enum: ['Admin', 'User', 'Guest'], default: 'User' },
});

userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.matchPassword = async function(enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
