import { AuthServices } from "../services/auth.services"
import { UserServices } from "../services/user.services"
import { Request, Response } from 'express'

const userService: UserServices = new UserServices()
const authService: AuthServices = new AuthServices()

export const UserController = {
    createUser: (req: Request, res: Response) => {
        try {
            const newUser = req.body
            userService.createUser(newUser).then(result => {
                res.json(result)
            })
        } catch(error) {
            res.sendStatus(500)
            // TODO log
        }
    },
    login: (req: Request, res: Response) => {
        try {
            const dataLogin = req.body
            authService.login(dataLogin).then(result => {
                res.json(result)
            })
        } catch(error) {
            res.sendStatus(500)
        }
    }
}
