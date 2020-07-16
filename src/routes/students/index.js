const express = require("express")
const db = require('../../db')
const students = require ('./students.json')

const studRouter = express.Router()

//import students from students.json and upload in to our database

studRouter.post('/import', async(req,res)=>{
    const response = await db.query('SELECT _id FROM "students"')
    const idList = response.rows.map(x=> x._id)

    let total = 0
    let skipped = 0
    students.forEach(async stud=>{
        if (idList.indexOf(stud._id) === -1){
        await db.query(`INSERT INTO "students" (_id,name,surname,email,dateOfBirth)
        values($1, $2,$3,$4,$5)`,
        [stud._id, stud.name,stud.surname, stud.email,stud.dateOfBirth])
        total++
        
        } else{
            console.log(`Element ${stud._id} is already in the DB!`)
            skipped ++
        }  
    })
        res.send({
            added:total,
            skipped
        })
})

// get students

// studRouter.get("/", async (req,res)=>{
//     console.log("database")
//     const response = await db.query('SELECT * FROM "students"')
   
//     res.send(response.rows)
// })

 //get students plus filtering,pagination etc
studRouter.get('/', async (req,res)=>{
    const order = req.query.order || "asc"
    const offset = req.query.offset || 0
    const limit = req.query.limit|| 5

    delete req.query.order
    delete req.query.offset
    delete req.query.limit

    let query = 'SELECT * FROM "students"'
    const params = []
    for(queryParam in req.query){
        params.push(req.query[queryParam])
        if(params.length===1){
            query += `WHERE ${queryParam} = $${params.length}`
        }else{
            query+= `AND ${queryParam} =$${params.length}`
        }
    }
    query+= "ORDER BY Title" + order
    params.push(limit)
    query+= `LIMIT $${params.length } `
   
    params.push(offset)
    console.log(query)
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

// check student's email before posting
studRouter.post("/checkemail", async (req,res)=>{
    const response = await db.query(`SELECT * from "students" WHERE email=$1`,[req.body.email])
    if(response.rowCount> 0){
        res.send("Email already exists")
    }else{
        const response = await db.query(`INSERT INTO "students"(_id,name,surname,email,dateOfBirth)
                                                            values($1,$2,$3,$4,$5)
                                                             RETURNING *`,
                                                              [req.body._id,req.body.name,req.body.surname,req.body.email,req.body.dateOfBirth])
        console.log(response)
        res.send(response.rows[0])            
    }
})
// update a student
studRouter.put('/:_id', async(req,res)=>{
    try{
        const result = await db.query(`UPDATE "students"
                                  SET name = $1,
                                  surname = $2,
                                  email = $3,
                                  dateOfBirth = $4
                                  WHERE _id = $2`,
                                  [req.body.name,req.body.surname,req.body.email,req.body.dateOfBirth,req.params._id])
        if(result.rowCount===0)
            return res.status(404).send('not found')
        res.send(result.rows[0])
    }catch(ex){
        res.status(500).send(ex)
    }
})

// delete a student
studRouter.delete("/:_id", async(req,res)=>{
    const response = await db.query(`DELETE FROM "students" WHERE _id = $1`,[req.params._id] )
    if(response.rowCount===0){
    return res.status(404).send("Not Found")
    }else{
        res.send('Deleted')
    }
})



module.exports= studRouter