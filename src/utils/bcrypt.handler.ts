import { hash } from "bcrypt"

export const encrypt = async(pass: string) => {
    const passHash = await hash(pass, 8)
    return passHash
}
/*
export const verify = async(pass: string, passHash: string) => {
    const isValid = await compare(pass, passHash)
    return isValid
}
*/

