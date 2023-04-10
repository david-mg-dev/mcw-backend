import { Wallet } from "../models/wallet.model"
import { Crypto } from "../models/crypto.model"
import { wallet_connect } from "../config/wallet.db"

export class WalletRepository {
    _dbWallet: any = {}
    _walletRepository: any
    _cryptoRepository: any

    constructor() {
        this._dbWallet = wallet_connect()
        this._walletRepository = this._dbWallet.sequelize.getRepository(Wallet)
        this._cryptoRepository = this._dbWallet.sequelize.getRepository(Crypto)
    }

    async getWalletUser(id: string): Promise<Wallet[]> {
        try {
            const dataWallet = await this._walletRepository.findAll({
                where: {
                    user_id: id
                },
                include: [ this._cryptoRepository ]
            }) 
            return dataWallet 
        } catch (error) {
            console.error(error) // TODO
        }
        return []
    }

    async addCryptoToWallet(dataWallet: Wallet): Promise<string> {
        try {
            const existCrypto = await this._walletRepository.findOne({
                where: { crypto_id: dataWallet.crypto_id }   
            })

            if(existCrypto) {
                console.log('Esta crypto ya esta agregada') // TODO 
            } else {
                const newCryptoWallet = await this._walletRepository.create(dataWallet) 
                console.log(newCryptoWallet)   // TODO  Por defecto amount=0
            }
            return dataWallet.user_id

        } catch (error) {
            return error // TODO
        }
    }
}