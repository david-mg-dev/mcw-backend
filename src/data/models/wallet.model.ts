import { Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript'
import { STRING, INTEGER, DATE } from 'sequelize'
import { v4 as uuid } from 'uuid'
import { Crypto } from './crypto.model'

@Table({
    freezeTableName: true,
    schema: 'mcw',
    tableName: 'wallet'
})

export class Wallet extends Model {

    @Column({
        type: STRING,
        primaryKey: true,
        field: 'wallet_id'
    })
    wallet_id: string = uuid()

    @Column({
        type: STRING,
        field: 'user_id'
    })
    user_id: string

    @ForeignKey(() => Crypto)
    @Column({
        type: STRING
    })
    crypto_id: string

    @BelongsTo(() => Crypto)
    crypto: Crypto

    @Column({
        type: INTEGER,
        field: 'amount'
    })
    amount: number

    @Column({
        field: 'createdAt',
        type: DATE
    })
    createdAt: Date
    
    @Column({
        field: 'updatedAt',
        type: DATE
    })
    updatedAt: Date
}


