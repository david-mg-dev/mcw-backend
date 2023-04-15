import { Wallet } from "../models/wallet.model"
import { wallet_connect } from "../config/wallet.db"
import { Crypto } from "../models/crypto.model"
import { User } from "../models/user.model"
import { user_connect } from "../config/user.db"
import { WalletDto } from "../../types"
import logger from "../../utils/log.handler"
import { v4 as uuid } from 'uuid'

export class WalletRepository {
    _dbWallet: any = {}
    _dbUser: any = {}
    _walletRepository: any
    _userRepository: any
    _cryptoRepository: any

    constructor() {
        this._dbWallet = wallet_connect()
        this._dbUser = user_connect()
        this._walletRepository = this._dbWallet.sequelize.getRepository(Wallet)
        this._cryptoRepository = this._dbWallet.sequelize.getRepository(Crypto)
        this._userRepository = this._dbUser.sequelize.getRepository(User)
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
                where: { crypto_id: dataWallet.crypto_id, user_id: dataWallet.user_id }
            })

            if(existCrypto) {
                console.log('Esta crypto ya esta agregada') // TODO 
            } else {
                dataWallet.wallet_id = uuid()
                dataWallet.amount = 0
                return await this._walletRepository.create(dataWallet) 
            }
            return dataWallet.user_id

        } catch (error) {
            return error // TODO
        }
    }

    async buyCrypto(dataBuy: WalletDto): Promise<string> {
        // TODO Refactorizar
        try {
            const dataCrypto = await this._cryptoRepository.findOne({
                where: { crypto_id: dataBuy.crypto_id }
            })
            const stockCrypto = (dataCrypto.stock - dataBuy.amount)

            if(stockCrypto < 0) {
                logger.error({message: 'Stock Insuficiente'}) 
                throw new Error('Stock Insuficiente')
            }
            
            const dataUser = await this._userRepository.findOne({
                where: { user_id: dataBuy.user_id }
            })
            const userAmount = (dataUser.deposit - (dataBuy.amount * dataCrypto.value))

            if(userAmount < 0) {
                logger.error({ message: 'Deposito insuficiente' })
                throw new Error('deposito insuficiente')
            }

            const newDataBuy = await this._walletRepository.findOne({
                where: { crypto_id: dataBuy.crypto_id }
            })

            await this._cryptoRepository.update({ stock: stockCrypto },
                { where: { crypto_id: dataBuy.crypto_id } }
            )
    
            await this._userRepository.update({ deposit: userAmount },
                { where: { user_id: dataBuy.user_id } }
            )
    
            await this._walletRepository.update({ amount: newDataBuy.amount + dataBuy.amount },
                { where: { user_id: dataBuy.user_id, crypto_id: dataBuy.crypto_id } 
            })
            return "buy ok" // TODO

        } catch (error) {
            throw error
        }
    }

    async sellCrypto(dataSell: WalletDto): Promise<string> {
        // TODO Refactorizar
        try {
            const dataCrypto = await this._cryptoRepository.findOne({
                where: { crypto_id: dataSell.crypto_id }
            })

            const newDataSell = await this._walletRepository.findOne({
                where: { crypto_id: dataSell.crypto_id }
            })

            if(dataSell.amount > newDataSell.amount)
                throw new Error('amount insuficiente')
                
            const amountCrypto = (dataCrypto.stock + dataSell.amount)

            const dataUser = await this._userRepository.findOne({
                where: { user_id: dataSell.user_id }
            })
            const userAmount = (dataUser.deposit + (dataSell.amount * dataCrypto.value))

            await this._cryptoRepository.update({ stock: amountCrypto },
                { where: { crypto_id: dataSell.crypto_id } 
            })

            await this._userRepository.update({ deposit: userAmount },
                { where: { user_id: dataSell.user_id }
            })

            await this._walletRepository.update({ amount: newDataSell.amount - dataSell.amount },
                { where: { crypto_id: dataSell.crypto_id } 
            })
            return "sell ok" // TODO 

        } catch (error) {
            throw error  
        }
    }
}