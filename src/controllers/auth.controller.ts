import { createUser, getUserByEmail, updatePassword } from "../models/auth.model"
import { Request, Response } from "express"
import bcrypt from "bcrypt"
import argon2 from "argon2"
import jwt from "jsonwebtoken"
import { getUserByRequestCode } from "../models/forgotpass.model"
import { validationResult } from "express-validator"

const {APP_KEY} = process.env

export const register = async(req:Request, res:Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()[0].msg });
      }
    const data = req.body
    const findUser:any = await getUserByEmail(data.email)
    if(findUser[0][0]){
        return res.status(400).json({
            success: false,
            message: "email is already in use",
        })
    }else{
        const hashingPassword = await argon2.hash(data.password)
        const finalDataRequest = {firstName: data.firstName, lastName: data.lastName, email: data.email, password:hashingPassword} 
        try {
            await createUser(finalDataRequest)
            return res.status(200).json({
                success: true,
                message: "register successfully",
            })
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: "register failed",
            })
        }
    }
}


export const login = async (req:Request, res:Response) => {
    const { email, password } = req.body
    const results = await getUserByEmail(email)
    if (results.length < 1) return res.status(400).json({
        success: false,
        message: "email doesnt match with any account",
    })
    const user = results[0][0]
    const compare = await argon2.verify(user.password, password)
    if (compare) {
      const payload = { id: user.id, email: user.email }
      const token = jwt.sign(payload, APP_KEY || "")
      return res.status(200).json({
        success: true,
        message: "login succesfully",
        token: token
    })
    } else {
        return res.status(401).json({
            success: false,
            message: "wrong email or password",
        })
    }
  }

export const resetPassword = async (req:Request, res:Response) => {
    const {code, email, newPassword, confirmPassword} = req.body
    const user = await getUserByRequestCode(code)
    if(user[0][0]){
        const date = new Date()
        console.log(date);
        if(user[0][0].expiredCode > date){
            if(email === user[0][0].email){
                if(newPassword !== confirmPassword){
                    return res.status(400).json({
                        success: false,
                        message: "password dosent match"
                    })
                }else{
                    try {
                        const hashingPassword = await argon2.hash(newPassword)
                        await updatePassword(hashingPassword, email)
                        return res.status(200).json({
                            success: true,
                            message: "password updated succesfully"
                        })
                    } catch (e) {
                        console.log(e);
                        return res.status(400).json({
                            success: false,
                            message: "ann error occured"
                        })
                    }
                }
            }else{
                return res.status(400).json({
                    success: false,
                    message: "email dosent match"
                })
            }
        }else{
            return res.status(400).json({
                success: false,
                message: "code expired"
            })
        }
    }else{
        return res.status(401).json({
            success: false,
            message: "typed code is wrong",
        })
    }
}