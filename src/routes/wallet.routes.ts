import express from 'express'
import { WalletController } from '../controllers/wallet.controller'

const router = express.Router()

router.get('/all/:id', WalletController.getWallet)
router.post('/add', WalletController.postCryptoWallet)

export default router
module.exports = router