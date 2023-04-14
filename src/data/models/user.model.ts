import { Table, Column, Model } from 'sequelize-typescript'
import { STRING, INTEGER, DATE } from 'sequelize'

@Table({
    freezeTableName: true,
    schema: 'mcw',
    tableName: 'users'
})

export class User extends Model {
    
    @Column({
        type: STRING,
        primaryKey: true,
        field: 'user_id'
    })
    user_id: string 

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
        type: INTEGER,
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


