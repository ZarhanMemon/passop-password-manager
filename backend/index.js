import express from "express"
import { connectDB } from "./utils/db.js"
import cors from "cors"
import dotenv from  "dotenv"
import passwordRoutes from "./routes/passwordRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import cookieParser from "cookie-parser";
import path from "path"

dotenv.config()

const port = process.env.PORT
const app = express()

const __dirname = path.resolve()

app.use(express.json())
app.use(cookieParser());

app.use(
    cors({
    origin: 'http://localhost:5173', // Remove trailing slash
    credentials: true,
}))
 

app.use("/api/auth",authRoutes)
app.use("/api/user",passwordRoutes)


if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))

    app.get("/*any",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend/dist/index.html"))
    })
}


app.listen(port,async() => {
    console.log(`Example app listening on port ${port}`)
    await connectDB()
})
