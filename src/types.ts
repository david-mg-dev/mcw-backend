export class RegisterDto {
    user_id: string
    username: string
    email: string
    password: string
    fullname: string
    deposit: number
}
export type NewUserDto = Omit<RegisterDto, 'user_id'>

export class AuthDto {
    email: string
    password: string
}

export class CryptoDto {
    crypto_id: string
    name: string
    asset: string
    value: number
    stock: number
    icon: string
}