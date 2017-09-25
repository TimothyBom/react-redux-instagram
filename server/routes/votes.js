import { Router } from 'express'
import async from 'async'
import { isEmpty } from 'lodash'
import Vote from '../models/vote'

const router = Router()

router.get('/', (req, res) => {
    Vote.
        find({}).
        exec((err, votes) => {
            res.json({votes})
        })
})

router.post('/:userId/vote/:postId', (req, res) => {
    const user_id = req.params.userId
    const post_id = req.params.postId

    async.waterfall([
        function (cb) {
            const vote = new Vote({
                user_id: user_id,
                post_id: post_id
            })
            vote.save((err, vote) => {
                cb(null, vote)
            })
        },
        function (vote, cb) {
            Vote.
                findOne({ _id: vote._id }).
                populate('user_id', '_id username').
                exec((err, vote) => {
                    cb(null, vote)
                })
        }
    ], (err, vote) => {
        res.json({vote})
    })
})

router.get('/post', (req, res) => {
    Vote.
        find({}).
        populate('user_id', '_id username').
        exec((err, votes) => {
            res.json({votes})
        })
})

router.get('/:userId/delete/:postId', (req, res) => {
    const user_id = req.params.userId
    const post_id = req.params.postId

    Vote.find({post_id}, (err, votes) => {
        votes.map(vote => {
            if (vote.user_id.toString() === user_id) {
                Vote.findByIdAndRemove(vote._id, (err, vote) => {
                    res.json({vote})
                })
            }
        })
    })
})

export default router