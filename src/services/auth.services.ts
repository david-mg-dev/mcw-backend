import { UserRepository } from "../data/repositories/user.repository"
import { AuthDto } from "../types"
import { generateToken } from "../utils/jwt.handler"
import logger from "../utils/log.handler"

export class AuthServices {
    _userRepository: UserRepository

    constructor() {
        this._userRepository = new UserRepository()
    }

    async login(dataLogin: AuthDto): Promise<string> {
        try {
            const user = await this._userRepository.login(dataLogin)
            const token = generateToken(user)
            return token
        } catch (error) {
            logger.error(error)
            throw new Error('Invalid credentials')
        }
    }
}