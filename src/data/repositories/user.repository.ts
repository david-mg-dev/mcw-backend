import { user_connect } from "../config/user.db"
import { User } from "../models/user.model"
import { AuthDto } from "../../types"

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

    async login(dataLogin: AuthDto): Promise<string> {
        let data: User

        try {
            data = await this._userRepository.findOne({
                where: { 
                    email: dataLogin.email, 
                    password: dataLogin.password
                }
            })

            if(!data) {
                return "datos login incorrecto" //TODO 
            } 
        } catch(error) {
            throw error
        }
        return data.user_id
    }
}