const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: String,
    profileImage: String,
    following: [{}]
});

// Hash password before saving to MongoDB
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next(); // Only hash if password is new/modified

    try {
        const salt = await bcrypt.genSalt(10); // Generate salt
        this.password = await bcrypt.hash(this.password, salt); // Hash password
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare passwords during login
userSchema.methods.comparePassword = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('Users', userSchema);

module.exports = User;
