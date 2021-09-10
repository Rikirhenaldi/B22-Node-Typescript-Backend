import db from "../helpers/db";
import { forgotform } from "../types/users.types";

const table: string = "request_forgotpass"

export const createRequestForgotPass = async(data: forgotform) => {
    const debug = (await db).execute(`
     INSERT INTO ${table} (code, userId, expiredCode) VALUES (?,?,?)
    `, [data.code, data.userId, data.expiredCode]
    )
}

export const getRequestCode = async (userId) => {
    return (await db).execute(`
     SELECT ${table}.expiredCode from ${table} WHERE ${table}.userId = ?
    `, [userId]
    )
  }

export const updateRequestCode = async(newcode, time, userId) => {
    return (await db).execute(`
     UPDATE ${table} SET code = ?, expiredCode = ? WHERE userId = ?
    `, [newcode, time, userId]
    )
}

export const getUserByRequestCode = async (code) => {
    return (await db).execute(`
     SELECT ${table}.expiredCode, ${table}.code, users.email as email from ${table} 
     LEFT JOIN users ON ${table}.userId = users.id
     WHERE ${table}.code = ?
    `, [code]
    )
  }
