import { sign, verify } from 'jsonwebtoken'

const JWT_SECRET = 'claveprivada'  //TODO

export const generateToken = async (user_id: string) => {
    const jwt = sign({ user_id }, JWT_SECRET, {
        expiresIn: "1h",  //TODO
    })
    return jwt
}

export const verifyToken = async (jwt: string) => {
    try {
       const isValid = verify(jwt, JWT_SECRET)
       return isValid 
    } catch (error) {
        return false
    }
}