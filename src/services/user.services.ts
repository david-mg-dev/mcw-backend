//import { NewUserDto } from "../types"
import { UserRepository } from "../data/repositories/user.repository"
import { User }  from "../data/models/user.model"

export class UserServices {
    _userRepository: UserRepository

    constructor() {
        this._userRepository = new UserRepository()
    }

    async createUser(user: User): Promise<string> {
        //const user: User = this.parseDto(userDto) 
        const userPromise = await this._userRepository.createUser(user).then(userId => {
            return userId
        }).catch(error => {
            console.log(error)
            throw error
            // TODO log
        })
        return userPromise
    }
/*
    parseDto(userDto: NewUserDto): User {
        let user: User = new User()

        user.setDataValue('user_id', null)
        user.setDataValue('username', userDto.username)
        user.setDataValue('email', userDto.email)
        user.setDataValue('password', userDto.password)
        user.setDataValue('fullname', userDto.fullname)
        user.setDataValue('deposit', userDto.deposit)
        
        return user
  
}
*/

}