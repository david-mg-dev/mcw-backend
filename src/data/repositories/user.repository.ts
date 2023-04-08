import { user_connect } from "../config/user.db"
import { User } from "../models/user.model"

export class UserRepository {
    _db: any = {}
    _userRepository: any

    constructor() {
        this._db = user_connect()
        this._userRepository = this._db.sequelize.getRepository(User)
    }

    async createUser(newUser: User): Promise<string> {
        try {
            const dataEmail = await this._userRepository.findOne({
                where: { email: newUser.email }
            })
            if(dataEmail != null) {
                throw 'Email Already Exist'
                // TODO log
            }

            newUser = await this._userRepository.create(newUser)
            return newUser.user_id
        } catch (error) {
            // TODO log
            return error
        }
    }
}