import { crypto_connect } from "../config/crypto.db"
import { Crypto } from "../models/crypto.model"

export class CryptoRepository {
    _db: any = {}
    _cryptoRepository: any

    constructor() {
        this._db = crypto_connect()
        this._cryptoRepository = this._db.sequelize.getRepository(Crypto)
    }

    async allCryptos(): Promise<Crypto[]> {
        try {
            const cryptos = await this._cryptoRepository.findAll()
            return cryptos
            
        } catch (error) {
            console.error(error) // TODO log

            
        }
        return []
    } 
}