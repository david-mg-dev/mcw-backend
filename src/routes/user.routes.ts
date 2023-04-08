import express from 'express'
import { UserController } from '../controllers/user.controllers'

const router = express.Router()

router.post('/create', UserController.createUser)

export default router
module.exports = router