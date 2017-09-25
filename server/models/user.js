import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        unique: true
    },
    fullname: {
        type: String,
    },
    username: {
        type: String,
        lowercase: true,
        unique: true
    },
    password: {
        type: String
    },
    avatar: {
        type: String
    },
    bio: {
        type: String
    }
})

export default mongoose.model('User', userSchema)