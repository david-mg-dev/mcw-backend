import { UserRepository } from "../data/repositories/user.repository"
import { AuthDto } from "../types"
import { generateToken } from "../utils/jwt.handler"

export class AuthServices {
    _userRepository: UserRepository

    constructor() {
        this._userRepository = new UserRepository()
    }

    async login(dataLogin: AuthDto): Promise<string> {
        const loginPromise = await this._userRepository.login(dataLogin).then(dataLogin => {
                const token = generateToken(dataLogin)
                return token
        }).catch(error => {
            console.error(error)
            //return error
            // TODO 
            //hrow new Error('Unable to log in. Please check your credentials and try again.')
        })
        return loginPromise
    }
}