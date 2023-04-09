import { CryptoServices } from "../services/crypto.services"
import { Request, Response } from 'express'

const cryptoService: CryptoServices = new CryptoServices()

export const CryptoController = {
    getAllCryptos: (_req: Request, res: Response) => {
        try {
            cryptoService.allCryptos().then(result => {
                res.json(result)
            })
        } catch (error) {
            res.sendStatus(500)
            // TODO log
        }
    }
}