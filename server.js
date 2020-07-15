const express = require("express")
const db = require ('./src/db')
const studRouter = require('./src/routes/students')
const cors = require("cors")
const dotenv = require("dotenv")
const projRouter = require("./src/routes/projects")

dotenv.config()


const server = express()
server.use(cors())
server.use(express.json())
const port = process.env.PORT || 3005

server.get('/testSQL', async(req,res)=>{
    const response = await db.query("SELECT 1 +1")
    console.log('response is',response)
    res.send(response)
})
server.use('/students', studRouter)
server.use('/projects',projRouter)



server.listen(port, ()=>{
    console.log(`server running on port ${port}`)
})