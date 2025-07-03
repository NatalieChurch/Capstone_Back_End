import db from "../../db/client.js"
import bcrypt from "bcrypt"

export async function createNewUser({username, password}){
    const securePassword = await bcrypt.hash(password, 10)
    const sql = `
    INSERT INTO users (username, password)
    VALUES ($1, $2)
    RETURNING *;
    `
    const {rows: [user]} = await db.query(sql, [username, securePassword])
    return user
}

export async function getUser({username}){
    const sql = `
    SELECT * FROM users 
    WHERE username = $1;
    `
    const {rows: [user]} = await db.query(sql, [username])
    return user
}

export async function getUserByID({id}){
    const sql = `
    SELECT * FROM users 
    WHERE id = $1;
    `
}