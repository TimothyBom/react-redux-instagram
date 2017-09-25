import { Router } from 'express'
import users from './users'
import auth from './auth'
import posts from './posts'
import comments from './comments'
import search from './search'
import votes from './votes'

const router = Router()

router.get('/', (req, res) => {
    res.json({ message: 'Welcome to Instagram API.' })
})

router.use('/users', users)
router.use('/auth', auth)
router.use('/posts', posts)
router.use('/comments', comments)
router.use('/search', search)
router.use('/votes', votes)

export default router