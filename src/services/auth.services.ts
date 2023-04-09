import { UserRepository } from "../data/repositories/user.repository"
//import { User } from '../data/models/user.model'
import { AuthDto } from "../types"
import { generateToken } from "../utils/jwt.handler"

export class AuthServices {
    _useRepository: UserRepository

    constructor() {
        this._useRepository = new UserRepository()
    }

    async login(dataLogin: AuthDto): Promise<string> {
        const loginPromise = await this._useRepository.login(dataLogin).then(dataLogin => {
            const token = generateToken(dataLogin)
            return token
        }).catch(error => {
            console.error(error)
            throw error
            // TODO 
        })

        return loginPromise
    }
}