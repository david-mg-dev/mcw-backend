import { WalletRepository } from "../data/repositories/wallet.repository"
import { Wallet } from "../data/models/wallet.model"
import { WalletDto } from "../types"
import logger from "../utils/log.handler"
export class WalletServices {
    _walletRepository: WalletRepository

    constructor() {
        this._walletRepository = new WalletRepository()
    }

    async getWalletUser(id: string): Promise<WalletDto[]> {
        const walletPromise = await this._walletRepository.getWalletUser(id).then(wallets => {
            let walletsDto: WalletDto[] = []
            wallets.forEach(walletAsPojo => {
                let walletDto = this.parseDto(walletAsPojo)
                walletsDto.push(walletDto)
            })
            console.log(walletsDto)
            return walletsDto
        }).catch(error => {
            console.error(error)
            throw error //TODO  log
        })
        return walletPromise
    }

    async addCryptoToWallet(dataWallet: Wallet): Promise<string> {
        const body = await this._walletRepository.addCryptoToWallet(dataWallet).then(result => {
            return result
        }).catch(error => {
            console.error(error)
            throw error // TODO log
        })
        return body
    }

    async buyCrypto(dataBuy: Wallet): Promise<string> {
        try {
            return await this._walletRepository.buyCrypto(dataBuy);
        } catch (error) {
            logger.error(error);
            throw new Error('Invalid Data Buy');
        }
    }

    async sellCrypto(dataSell: Wallet): Promise<any> {
        const body = await this._walletRepository.sellCrypto(dataSell).then(amount => {
            return amount
        }).catch(error => {
            console.error(error) // TODO
            throw error
        })
        return body
    }

    parseDto(wallet: Wallet): WalletDto {
        const walletDto: WalletDto = {
            wallet_id: wallet.dataValues.wallet_id,
            user_id: wallet.dataValues.user_id,
            crypto_id: wallet.dataValues.crypto_id,
            amount: wallet.dataValues.amount,
            crypto: wallet.dataValues.crypto && {
                crypto_id: wallet.crypto.crypto_id,
                name: wallet.crypto.name,
                asset: wallet.crypto.asset,
                value: wallet.crypto.value,
                stock: wallet.crypto.stock,
                icon: wallet.crypto.icon
            }
        }
        return walletDto
    } 
}

