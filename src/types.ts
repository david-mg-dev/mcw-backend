export class RegisterDto {
    user_id: string
    username: string
    email: string
    password: string
    fullname: string
    deposit: number
}

export type NewUserDto = Omit<RegisterDto, 'user_id'>
