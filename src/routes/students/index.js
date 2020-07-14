const express = require("express")
const db = require('../../db')
const students = require ('./students.json')
const studRouter = express.Router()

//import students from students.json and upload in to our database

studRouter.post('/import', async(req,res)=>{

})


studRouter.get('/', async (req,res)=>{
    const response = await db.query('SELECT * FROM "students"')
    res.send(response.rows)
})

// get a single student

studRouter.get("/:_id", async (req,res)=>{
    const response = await db.query('SELECT _id, name,surname,email,dateOfBirth FROM "students" WHERE _id = $1',[req.params._id])
    if(response.rowCount===0){
        return res.status(404).send("not found")
    }else{
        res.send(response.rows[0])
    }
})

// create student
studRouter.post("/", async(req,res)=>{
    const response = await db.query(`INSERT INTO "students"(_id,name,surname,email,dateOfBirth)
                                                            values($1,$2,$3,$4,$5)
                                                             RETURNING *`,
                                                              [req.body._id,req.body.name,req.body.surname,req.body.email,req.body.dateOfBirth])
        console.log(response)
        res.send(response.rows[0])                                                      
})

// update a student

// delete a student
studRouter.delete("/", async(req,res)=>{
    const response = await db.query(`DELETE FROM "students" WHERE _id = $1`,[req.params._id] )
    if(response.rowCount===0){
    return res.status(404).send("Not Found")
    }else{
        res.send('Deleted')
    }
})


module.exports = studRouter;