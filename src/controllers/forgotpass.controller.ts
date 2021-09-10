import { createRequestForgotPass, getRequestCode, updateRequestCode } from "../models/forgotpass.model";
import { getUserByEmail } from "../models/auth.model";
import { Request, Response } from "express"
import { customAlphabet } from "nanoid";
import expiredcode from "../helpers/expiredcode";


export const createRequestCode = async (req: Request, res: Response) => {
    const {email} = req.body
    const findUser:any = await getUserByEmail(email)
    if(!findUser[0][0]){
        return res.status(400).json({
            success: false,
            message: "email doesnt match with any user",
        })
    }else{
        const findRequestCode = await getRequestCode(findUser[0][0].id)
        if(findRequestCode[0][0]){
            try {
                const newGenCode = customAlphabet('0123456789', 5)
                await updateRequestCode(await newGenCode(),expiredcode(), findUser[0][0].id)
                return res.status(200).json({
                    success: true,
                    message: "request again forgot password successfully",
                })
            } catch (e) {
                console.log(e);
                return res.status(400).json({
                    success: false,
                    message: "an error on update expiredcode",
                })
            }
        }else{
            try {
                console.log("ini expire code", expiredcode())
                const user = findUser[0][0]
                const gencode = customAlphabet('0123456789', 5)
                const finaldata = {code: await gencode(), userId: user.id, expiredCode: expiredcode()}
                await createRequestForgotPass(finaldata)
                return res.status(200).json({
                    success: true,
                    message: "request forgot password successfully",
                })
            } catch (e) {
                console.log(e);
                return res.status(400).json({
                    success: false,
                    message: "ann error occurred",
                })
            }
        }
    }
}