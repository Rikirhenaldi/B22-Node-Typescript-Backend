import { generalUsers, Email } from "../types/users.types";
import db from "../helpers/db";
// const { promisify } = require('util')

// const execPromise = promisify(db.query).bind(db)

const table: string = "users"

export const createUser = async (data:generalUsers) => {
    return (await db).execute(`
     INSERT INTO ${table} (firstName, lastName, email, password) VALUES (?,?,?,?)
    `, [data.firstName, data.lastName, data.email, data.password])
  }

  export const getUserByEmail = async (email: Email) => {
    return (await db).execute(`
    SELECT ${table}.id, ${table}.firstName, ${table}.lastName, ${table}.email, ${table}.password FROM ${table}
    WHERE ${table}.email=?
    `, [email])
  }

  export const updatePassword = async (password: string, email:string) => {
    return (await db).execute(`
    UPDATE ${table} SET ${table}.password = ? 
    WHERE ${table}.email=?
    `, [password, email])
  }