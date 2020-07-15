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





module.exports= projRouter