import mysql from "mysql2/promise"
import * as ts from "dotenv"
ts.config();

const db = mysql.createConnection({
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    connectTimeout: 100000
})
export default db