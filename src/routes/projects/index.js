const express = require("express")
const db = require('../../db')
const projects = require ('./projects.json')

const projRouter = express.Router()

projRouter.get("/", async (req,res)=>{
    console.log("database")
    const response = await db.query('SELECT * FROM "projects"')
   
    res.send(response.rows)
})





module.exports= projRouter