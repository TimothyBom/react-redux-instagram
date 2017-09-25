import { Router } from 'express'
import Post from '../models/post'
import Comment from '../models/comment'

const router = Router()

router.get('/', (req, res) => {
    Comment.
        find({}).
        populate('user_id', '_id username avatar').
        sort({ created_at: 'desc' }).
        exec((err, comments) => {
            res.json({comments})
        })
})

router.post('/', (req, res) => {
    const _comment = req.body.comment
    const { post_id, user_id } = req.body
    
    const comment = new Comment({
        comment: _comment,
        post_id: post_id,
        user_id: user_id
    })
    comment.save((err, commentz) => {
        if (err) {
            res.json({
                success: false,
                message: 'Comment Unsuccessfully.'
            })
        }
        Comment.
            findOne({ _id: commentz._id }).
            populate('user_id', '_id username avatar').
            exec((err, comment) => {
                res.json({comment})
            })
    })
})

router.get('/:commentId/delete/:userId', (req, res) => {
    const comment_id = req.params.commentId
    const user_id = req.params.userId

    Comment.findOne({ _id: comment_id }, (err, comment) => {
        if (comment.user_id.toString() === user_id) {
            Comment.findByIdAndRemove(comment._id, (err, comment) => {
                res.json({comment})
            })
        }
    })
})

export default router