import mongoose from 'mongoose'

const relationshipSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    follower_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    following_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
})

export default mongoose.model('Relationship', relationshipSchema)