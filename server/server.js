require('dotenv').config()
const express = require("express")
const router = require("./router/router")
const {connectdb} = require("./utilites/db")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cors())
app.use("/",router)

const PORT = process.env.PORT || 3000

connectdb().then(()=>{
    app.listen(PORT,()=>{
        console.log("Server is start")
    })
})