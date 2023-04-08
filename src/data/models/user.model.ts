import { Table, Column, Model } from 'sequelize-typescript'
import { STRING, NUMBER, DATE } from 'sequelize'
import { v4 as uuid } from 'uuid'

@Table({
    freezeTableName: true,
    schema: 'mcw',
    tableName: 'users'
})

export class User extends Model {
    @Column({
        primaryKey: true,
        type: STRING,
        field: 'user_id'
    })
    user_id: string = uuid()

    @Column({
        type: STRING,
        field: 'username'
    })
    username: string

    @Column({
        type: STRING,
        field: 'email'
    })
    email: string

    @Column({
        type: STRING,
        field: 'password'
    })
    password: string

    @Column({
        type: STRING,
        field: 'fullname'
    })
    fullname: string

    @Column({
        type: NUMBER,
        field: 'deposit'
    })
    deposit: number

    @Column({
        field: 'createdAt',
        type: DATE
    })
    createdAt!: Date
    
    @Column({
        field: 'updatedAt',
        type: DATE
    })
    updatedAt!: Date
}


