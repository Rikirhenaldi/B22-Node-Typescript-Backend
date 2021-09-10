import { Router } from "express"
import { register, login, resetPassword } from "../controllers/auth.controller"
import { createRequestCode } from "../controllers/forgotpass.controller"
import { checkSchema } from "express-validator"
import registerValidator from "../helpers/validator/register.validator"
const auth = Router()


auth.post("/register", checkSchema(registerValidator), register)
auth.post("/login", login)
auth.post("/forgotpass", createRequestCode)
auth.post("/resetpassword", resetPassword)

export default auth