import express from 'express'
import { UserController } from '../controllers/user.controllers'

const router = express.Router()

router.post('/create', UserController.createUser)
router.post('/login', UserController.login)

export default router
module.exports = router