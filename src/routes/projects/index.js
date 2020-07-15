const express = require("express")
const db = require('../../db')
const projects = require ('./projects.json')

const projRouter = express.Router()
// get projects
projRouter.get("/", async (req,res)=>{
    console.log("database")
    const response = await db.query('SELECT * FROM "projects"')
   
    res.send(response.rows)
})

// get a single project 
projRouter.get("/:_id", async(req,res)=>{
    const response = await db.query(`SELECT _id,name,description,creationDate,repoURL,liveURL,studentID FROM "projects" WHERE _id = $1`,
                                                                                                         [req.params._id])
    if (response.rowCount===0){
        return res.status(404).send('not found')
    }else{
       return res.status(200).send(response.rows[0])
    }

})

// delete a single project
projRouter.delete("/:_id", async(req,res)=>{
    const response = await db.query(`DELETE from "projects" WHERE _id =$1`,[req.params._id])
    if(response.rowCount===0){
        return res.status(404).send('not found')
    }else{
        return res.status(200).send("deleted")
    }
})

// create a new project
projRouter.post("/",async(req,res)=>{
    const response = await db.query(`INSERT INTO "projects" (_id,name,description,creationDate,studentID)
                                                                          values ($1,$2,$3,$4,$5)
                                                                            RETURNING *`,
                 [req.body._id, req.body.name,req.body.description, req.body.creationDate,req.body.studentID])
                 res.send(response.rows[0])
})




module.exports= projRouter