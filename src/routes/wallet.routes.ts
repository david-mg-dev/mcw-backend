import express from 'express'
import { WalletController } from '../controllers/wallet.controller'

const router = express.Router()

router.get('/all/:id', WalletController.getWallet)

export default router
module.exports = router