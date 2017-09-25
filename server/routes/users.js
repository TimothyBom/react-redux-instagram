import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { isEmpty } from 'lodash'
import async from 'async'
import { validate } from '../validate/signup'
import { isValidate } from '../validate/password'
import User from '../models/user'
import Relationship from '../models/relationship'

const router = Router()

router.post('/', (req, res) => {
    const { errors, isValid } = validate(req.body)

    if (isValid) {
        bcrypt.hash(req.body.password, 12, (err, hash) => {
            const user = new User({
                email: req.body.email,
                fullname: req.body.fullname,
                username: req.body.username,
                password: hash
            })
            user.save((err, user) => {
                if (err) {
                    res.json({
                        success: false,
                        message: 'User already exists.'
                    })
                }
                res.json({
                    success: true,
                    message: 'Successful! created new user.'
                })
            })
        })
    } else {
        res.status(400).json(errors)
    }
})

router.get('/:username', (req, res) => {
    const username = req.params.username

    User.findOne({ username: username }, '-password', (err, user) => {
        if (!isEmpty(user)) {
            res.json({user})
        } else {
            res.json({
                success: false,
                message: 'User not found.'
            })
        }
    })
})

router.get('/check/:identifier', (req, res) => {
    const identifier = req.params.identifier
    const query = { $or: [ { email: identifier }, { username: identifier } ] }

    User.find(query, 'email username', (err, user) => {
        res.json({user})
    })
})

router.get('/:userId/check', (req, res) => {
    const userId = req.params.userId
    const token = req.query.token
    const password = jwt.decode(token)

    User.findById(userId, '_id username password', (err, user) => {
        if (!isEmpty(user)) {
            bcrypt.compare(password.token, user.password, (err, isMatch) => {
                if (!err && isMatch) {
                    res.json({ success: true })
                } else {
                    res.json({
                        success: false,
                        errors: { form: 'Old password was incorrectly.' }
                    })
                }
            })
        } else {
            res.json({
                errors: { form: 'User not found.' }
            })
        }
    })
})

router.put('/:username', (req, res) => {
    const username = req.params.username
    const { fullname, email, bio, avatar } = req.body

    User.findOne({ username: username }, '-password', (err, user) => {
        if (!isEmpty(user)) {
            user.fullname = fullname || user.fullname
            user.username = req.body.username || user.username
            user.email = email || user.email
            user.bio = bio || user.bio
            user.avatar = avatar || user.avatar
            user.save((err, result) => {
                if (!err) {
                    res.json({
                        success: true,
                        message: 'Successful! profile updated.',
                        user: result
                    })
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

router.put('/:userId/password', (req, res) => {
    const userId = req.params.userId
    const password = req.body.newpassword
    const { errors, isValid } = isValidate(req.body)

    if (isValid) {
        User.findById(userId, 'password', (err, user) => {
            if (!isEmpty(user)) {
                bcrypt.hash(password, 12, (err, hash) => {
                    user.password = hash
                    user.save((err => {
                        if (!err) {
                            res.json({
                                success: true,
                                message: 'Successful! password changed.'
                            })
                        }
                    }))
                })
            } else {
                res.json({
                    success: false,
                    message: 'User not found.'
                })
            }
        })
    } else {
        res.status(400).json(errors)
    }
})

router.get('/:username/follow', (req, res) => {
    const username = req.params.username
    User.findOne({ username: username }, '_id', (err, user) => {
        Relationship.
            findOne({ user_id: user._id }).
            exec((err, follows) => {
                res.json({follows})
            })
    })
})

router.post('/:currentUser/follow/:userId', (req, res) => {
    const currentUser = req.params.currentUser
    const userId = req.params.userId

    async.waterfall([
        function (cb) {
            Relationship.find({ user_id: userId }, (err, id) => {
                let user = Object.assign({}, id)
                cb(null, user)
            })
        },
        function (user, cb) {
            if (!isEmpty(user)) {
                Relationship.update({ user_id: userId }, { $push: { follower_id: currentUser } }, (err, follower) => {
                    cb(null, follower)
                })
            } else {
                const relationship = new Relationship({
                    user_id: userId,
                    follower_id: currentUser
                })
                relationship.save((err, follower) => {
                    if (!err) {
                        cb(null, follower)
                    }
                })
            }
        },
        function (follower, cb) {
            Relationship.find({ user_id: userId }, (err, follow) => {
                cb(null, follow)
            })
        }
    ], (err, follow) => {
        res.json({follow})
    })
})

router.post('/:userId/follower/:currentUser', (req, res) => {
    const userId = req.params.userId
    const currentUser = req.params.currentUser
    
    async.waterfall([
        function (cb) {
            Relationship.find({ user_id: currentUser }, (err, id) => {
                let user = Object.assign({}, id)
                cb(null, user)
            })
        },
        function (user, cb) {
            if (!isEmpty(user)) {
                Relationship.update({ user_id: currentUser }, { $push: { following_id: userId } }, (err, following) => {
                    cb(null, following)
                })
            } else {
                const relationship = new Relationship({
                    user_id: currentUser,
                    following_id: userId
                })
                relationship.save((err, following) => {
                    if (!err) {
                        cb(null, following)
                    }
                })
            }
        }
    ], (err, follow) => {
        res.json({ success: true })
    })
})

router.get('/:currentUser/unfollow/:userId', (req, res) => {
    const userId = req.params.userId
    const currentUser = req.params.currentUser

    async.waterfall([
        function (cb) {
            Relationship.findOne({ user_id: userId }, (err, id) => {
                let user = Object.assign({}, id)
                cb(null, user)
            })
        },
        function (user, cb) {
            if (!isEmpty(user)) {
                Relationship.update({ user_id: userId }, { $pull: { follower_id: currentUser } }, { safe: true }, (err, follower) => {
                    cb(null, follower)
                })
            }
        },
        function (follower, cb) {
            Relationship.find({ user_id: userId }, (err, follow) => {
                cb(null, follow)
            })
        }
    ], (err, follow) => {
        res.json({follow})
    })
})

router.get('/:userId/unfollower/:currentUser', (req, res) => {
    const currentUser = req.params.currentUser
    const userId = req.params.userId
    
    async.waterfall([
        function (cb) {
            Relationship.find({ user_id: currentUser }, (err, id) => {
                let user = Object.assign({}, id)
                cb(null, user)
            })
        },
        function (user, cb) {
            if (!isEmpty(user)) {
                Relationship.update({ user_id: currentUser }, { $pull: { following_id: userId } }, { safe: true }, (err, following) => {
                    cb(null, following)
                })
            }
        }
    ], (err, result) => {
        res.json({ success: true })
    })
})

export default router