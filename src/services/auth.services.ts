import { UserRepository } from "../data/repositories/user.repository"
//import { User } from '../data/models/user.model'
import { AuthDto } from "../types"

export class AuthServices {
    _useRepository: UserRepository

    constructor() {
        this._useRepository = new UserRepository()
    }

    async login(dataLogin: AuthDto): Promise<string | undefined> {
        const loginPromise = await this._useRepository.login(dataLogin).then(data => {
            return data
        }).catch(error => {
            console.error(error)
            throw error
            // TODO 
        })

        return loginPromise
    }
}