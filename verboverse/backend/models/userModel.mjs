import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 32,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxlength: 32,
        minlength: 3, 
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please enter a valid email"
        ]
    },
    password: {
        type: String,
        required: true,
        maxlength: 32,
        minlength: 6
    },
    role: {
        type: String,
        default: 'user'
    },
    language: {
        type: String,
        default: 'en'
    },
}, {timestamps: true});

// encrypt password before saving to database
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }   
    this.password = await bcrypt.hash(this.password, 10);
}); 

// compare password
userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

// return a JWT token 
userSchema.methods.getJwtToken = function() {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: 3600
    });
}

export default mongoose.models?.User || mongoose.model('User', userSchema);