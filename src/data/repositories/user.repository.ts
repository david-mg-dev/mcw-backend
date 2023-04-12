import { user_connect } from "../config/user.db"
import { User } from "../models/user.model"
import { AuthDto } from "../../types"
import { encrypt } from "../../utils/bcrypt.handler"
import { compare } from "bcrypt"
import logger from "../../utils/log.handler"

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

            const passHash = await encrypt(newUser.password)

            newUser.password = passHash

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
                    email: dataLogin.email
                }
            })
            console.log(data)
            if(data === null) {
                logger.error({message: 'Email Not Found'})
                throw new Error('Email not Found')
            } 
            
            const isValidPass = await compare(dataLogin.password, data.password)
            if(!isValidPass) {
                logger.error({message: 'Password Incorrect'})
                throw new Error('Password Incorrect')
            }
            return data.user_id

        } catch(error) {
            throw error
        }
    }

    async getUserById(userId: string): Promise<User | null> {
        try {
            const dataUser = await this._userRepository.findOne({
                where: {
                    user_id: userId
                }
            })
            if(dataUser) {
                return dataUser
            }
        } catch (error) {
            console.error(error) // TODO
        }
        return null
    }
}