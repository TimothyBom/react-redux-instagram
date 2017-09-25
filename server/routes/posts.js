import { Router } from 'express'
import jwt from 'jsonwebtoken'
import async from 'async'
import cloudinary from 'cloudinary'
import { isEmpty } from 'lodash'
import Post from '../models/post'
import User from '../models/user'
import Relationship from '../models/relationship'
import Comment from '../models/comment'

const router = Router()

cloudinary.config({
    cloud_name: 'timothybom',
    api_key: '414499466558622',
    api_secret: 'QJZgMEwp3lJt5_KlG4EIaV-zsYc'
})

router.post('/', (req, res) => {
    const { public_id, image_url, caption } = req.body
    const token = jwt.decode(req.body.token)
    
    const post = new Post({
        public_id: public_id,
        image_url: image_url,
        caption: caption,
        user_id: token._id
    })
    post.save((err, post) => {
        res.json({post})
    })
})

router.get('/:username', (req, res) => {
    const username = req.params.username

    User.findOne({ username: username }, '_id', (err, user) => {
        if (!isEmpty(user)) {
            Post.
                find({ user_id: user._id }).
                sort({ created_at: 'asc' }).
                exec((err, posts) => {
                    if (!isEmpty(posts)) {
                        res.json({posts})
                    }
                })
        } else {
            res.json({
                success: false,
                message: 'User not found.'
            })
        }
    })
})

router.get('/:postId/delete/:userId', (req, res) => {
    const post_id = req.params.postId
    const user_id = req.params.userId

    async.waterfall([
        function (cb) {
            Post.findOne({ _id: post_id }, (err, post) => {
                cb(null, post)
            })
        },
        function (post, cb) {
            Comment.remove({ post_id: post_id }, (err, comment) => {
                cb(null, post)
            })
        },
        function (post, cb) {
            if (post.user_id.toString() === user_id) {
                Post.findByIdAndRemove(post_id, (err, post) => {
                    cb(null, post)
                })
            }
        }
    ], (err, post) => {
        res.json({post})
    })
})

router.get('/image/delete/:publicId', (req, res) => {
    const public_id = req.params.publicId

    cloudinary.v2.uploader.destroy(public_id, (err, result) => {
        console.log(result)
    })
})

router.get('/follow/:username', (req, res) => {
    const username = req.params.username

    async.waterfall([
        function (cb) {
            Relationship.findOne({ user_id: username }, (err, user) => {
                if (!isEmpty(user)) {
                    cb(null, user)
                }
            })
        },
        function (user, cb) {
            if (!isEmpty(user.following_id)) {
                Post.
                    find({ $or: [ { user_id: { $in: user.following_id } }, { user_id: { $in: [username] } } ] }).
                    populate('user_id', '_id username avatar').
                    sort({ created_at: 'desc' }).
                    exec((err, posts) => {
                        cb(null, posts)
                    })
            } else {
                Post.
                    find({ user_id: { $in: [username] } }).
                    populate('user_id', '_id username avatar').
                    sort({ created_at: 'desc' }).
                    exec((err, posts) => {
                        cb(null, posts)
                    })
            }
        }
    ], (err, posts) => {
        res.json({posts})
    })
})

export default router