import { Router } from 'express'
import { isEmpty } from 'lodash'
import User from '../models/user'

const router = Router()

router.get('/', (req, res) => {
    res.json({ message: 'User not found.' })
})

router.get('/:username', (req, res) => {
    const username = req.params.username
    const regex = new RegExp(username, 'i')

    User.
        find({ username: regex }).
        select('_id fullname username avatar').
        exec((err, user) => {
            if (!isEmpty(user)) {
                res.json({user})
            } else {
                res.json({ message: 'User not found.' })
            }
        })
})

export default router