import { CryptoRepository } from "../data/repositories/crypto.repository"
import { Crypto } from "../data/models/crypto.model"
import { CryptoDto } from "../types"

export class CryptoServices {
    _cryptoRepository: CryptoRepository

    constructor() {
        this._cryptoRepository = new CryptoRepository()
    }

    async allCryptos(): Promise<CryptoDto[]> {
        const cryptosPromise = await this._cryptoRepository.allCryptos().then(cryptos => {
            let cryptosDto: CryptoDto[] = []
            cryptos.forEach(cryptoAsPojo => {
                //let cryptoDto = this.parseDto(cryptoAsPojo)
                cryptosDto.push(this.parseDto(cryptoAsPojo))
            })
            return cryptosDto    
        }).catch(error => {
                console.error(error)
                throw error // TODO log
        })
        return cryptosPromise
    }

    parseDto(crypto: Crypto): CryptoDto {
        const cryptoDto: CryptoDto = {
            crypto_id: crypto.dataValues.crypto_id,
            name: crypto.dataValues.name,
            asset: crypto.dataValues.asset,
            value: crypto.dataValues.value,
            stock: crypto.dataValues.stock,
            icon: crypto.dataValues.icon
        }
        return cryptoDto
    }
}