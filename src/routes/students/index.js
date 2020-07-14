const express = require("express")
const db = require('../../db')

const studRouter = express.Router()

studRouter.get('/', async (req,res)=>{
    const response = await db.query('SELECT * FROM "students"')
    res.send(response.rows)
})

studRouter.get("/:_id", async (req,res)=>{
    const response = await db.query('SELECT _id, name,surname,email,dateOfBirth FROM "students" WHERE _id = $1',[req.params._id])
    if(response.rowCount===0){
        return res.status(404).send("not found")
    }else{
        res.send(response.rows[0])
    }
})



module.exports = studRouter;