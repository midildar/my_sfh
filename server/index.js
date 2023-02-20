import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import userRoutes from "./routes/user.js"
import bookRoutes from "./routes/book.js"

dotenv.config()
const app = express()
app.use(express.json())
app.use(bodyParser.json({limit:"30mb",extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb" , extended: true}))
app.use(cors())
app.use("/user",userRoutes)
app.use("/book" , bookRoutes)
//app.use("/post" , postRoutes)

// mongoose setup 

const PORT = process.env.PORT || 6001
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    app.listen(PORT,()=> console.log(`Server Port: ${PORT}`))
}).catch((err)=> console.log(`${err} did not connect`))