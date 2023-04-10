import { Sequelize } from "sequelize-typescript"
import dotenv from 'dotenv'
import { Crypto } from "../models/crypto.model"
import { Wallet } from "../models/wallet.model"

dotenv.config

export const crypto_connect = () => {
    /*
    const DB_HOSTNAME = 'localhost'
    const DB_PORT = 5432 // TODO 
    const DB_NAME = process.env.DB_NAME
    const DB_USERNAME = process.env.DB_USERNAME
    //const DB_PASSWORD = process.env.DB_PASSWORD
    const DB_PASSWORD = 'postgres'
    const DB_SCHEMA = process.env.DB_SCHEMA
    const DB_DIALECT: any = 'postgres'
*/

const DB_HOSTNAME = 'localhost' 
const DB_PORT = 5432
const DB_NAME = 'postgres'
const DB_USERNAME = 'postgres'
const DB_PASSWORD = 'postgres'
const DB_SCHEMA = 'mcw'
const DB_DIALECT: any = 'postgres'

    const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
        host: DB_HOSTNAME,
        dialect: DB_DIALECT,
        schema: DB_SCHEMA,
        port: DB_PORT,
        repositoryMode: true,
        pool: {
            max: 10,
            min: 0,
            acquire: 20000,
            idle: 5000
        }
    })
    sequelize.addModels([Crypto, Wallet])

    const db: any = {}
    db.Sequelize = Sequelize
    db.sequelize = sequelize

    return db
}   




