import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { isEmpty } from 'lodash'
import { validate } from '../validate/login'
import User from '../models/user'
import 'dotenv/config'

const router = Router()

router.post('/', (req, res) => {
    const { errors, isValid } = validate(req.body)
    const { identifier, password } = req.body
    const query = { $or: [ { email: identifier }, { username: identifier } ] }

    if (isValid) {
        User.find(query, (err, user) => {
            if (!isEmpty(user)) {
                bcrypt.compare(password, user[0].password, (err, isMatch) => {
                    if (!err && isMatch) {
                        const token = jwt.sign({
                            _id: user[0]._id,
                            username: user[0].username,
                            avatar: user[0].avatar
                        }, process.env.SECRET)
                        res.json({token})
                    } else {
                        res.status(401).json({
                            errors: { form: 'Password was incorrect.' }
                        })
                    }
                })
            }
            if (isEmpty(user)) {
                res.status(401).json({
                    errors: { form: 'User not found.' }
                })
            }
        })
    } else {
        res.status(400).json(errors)
    }
})

router.post('/:userId', (req, res) => {
    const userId = req.params.userId

    User.findById(userId, (err, user) => {
        if (!isEmpty(user)) {
            const token = jwt.sign({
                _id: user._id,
                username: user.username,
                avatar: user.avatar
            }, process.env.SECRET)
            res.json({token})
        } else {
            res.json({
                success: false,
                message: 'User not found.'
            })
        }
    })
})

export default router