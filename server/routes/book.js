import express, { Router } from "express";
import { addBook,getBook } from "../controllers/book.js";
import { verifyToken } from "../middleware/verifyUser.js";
const router = express.Router()

router.post('/addbook', verifyToken , addBook)
router.get('/getbook',getBook)
//router.get('/logout',userLogOut)

export default router