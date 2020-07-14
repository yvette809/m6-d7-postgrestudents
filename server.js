const express = require("express")
const db = require ('./src/db')
const cors = require("cors")
const dotenv = require("dotenv")

dotenv.config()


const server = express()
server.use(cors())
server.use(express.json())
const port = process.env.PORT || 3005

server.get("/testSQL", async(req,res)=>{
    const response = await db.query("SELECT 1+1")
    res.send(response)
})
server.listen(3005, ()=>{
    console.log(`server running on port ${3005}`)
})