import express, { Router } from "express";
import { register,login } from "../controllers/user.js";
const router = express.Router()

router.post('/register', register)
router.post('/login',login)
//router.get('/logout',userLogOut)

export default router