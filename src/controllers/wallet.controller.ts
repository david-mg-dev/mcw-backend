import { WalletServices } from "../services/wallet.services"
import { Request, Response } from 'express'
import logger from "../utils/log.handler"

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
    },
    postCryptoWallet: (req: Request, res: Response) => {
        try {
            const bodyWallet = req.body
            walletService.addCryptoToWallet(bodyWallet).then(result => {
                res.json(result)
            })
        } catch (error) {
            res.sendStatus(500)
            // TODO log
        }
    },
    buyCryptos: (req: Request, res: Response) => {
        try {
            const bodyBuy = req.body
            walletService.buyCrypto(bodyBuy).then(result => {
                console.log(result)
                res.json(result)
            }).catch(error => {
                logger.error({ message: error })
                if(error.message === 'Stock Insuficiente') {
                    res.status(400).send({ message: error.message })
                } else if(error.message === 'deposito insuficiente'){
                    res.status(400).send({ message: error.message })
                } else {
                    console.log(error.message)
                    res.status(500).send({ message: 'Error Transaccion' })
                }     
            })
        } catch (error) {
            res.sendStatus(500)
            //TODO log
        }
    },
    sellCryptos: (req: Request, res: Response) => {
        try {
            const bodySell = req.body
            walletService.sellCrypto(bodySell).then(result => {
                res.json(result)
            })
        } catch (error) {
            res.sendStatus(500)
        }
    }
}