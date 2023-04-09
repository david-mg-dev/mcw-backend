import { Table, Column, Model } from 'sequelize-typescript'
import { STRING, INTEGER, DATE } from 'sequelize'
import { v4 as uuid } from 'uuid'

@Table({
    freezeTableName: true,
    schema: 'mcw',
    tableName: 'cryptos'
})

export class Crypto extends Model {
    
    @Column({
        type: STRING,
        primaryKey: true,
        field: 'crypto_id'
    })
    crypto_id: string = uuid()

    @Column({
        type: STRING,
        field: 'name'
    })
    name: string

    @Column({
        type: STRING,
        field: 'asset'
    })
    asset: string

    @Column({
        type: INTEGER,
        field: 'value'
    })
    value: number

    @Column({
        type: INTEGER,
        field: 'stock'
    })
    stock: number

    @Column({
        type: STRING,
        field: 'icon'
    })
    icon: string

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


