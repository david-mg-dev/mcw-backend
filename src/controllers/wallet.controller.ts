import { WalletServices } from "../services/wallet.services"
import { Request, Response } from 'express'

const walletService: WalletServices = new WalletServices()

export const WalletController =  {
    getWallet: (req: Request, res: Response) => {
        try {
            const userId = req.params.id
            walletService.getWalletUser(userId).then(result => {
                res.json(result)
            })
        } catch (error) {
            res.sendStatus(500)
            // TODO log
        }
    }
}