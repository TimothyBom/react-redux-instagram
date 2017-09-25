import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    public_id: {
        type: String,
        required: true
    },
    image_url: {
        type: String,
        required:true
    },
    caption: {
        type: String
    },
    user_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    created_at: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('Post', postSchema)