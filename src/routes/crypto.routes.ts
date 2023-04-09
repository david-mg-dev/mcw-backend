import express from 'express'
import { CryptoController } from '../controllers/crypto.controllers'

const router = express.Router()

router.get('/all', CryptoController.getAllCryptos)

export default router
module.exports= router