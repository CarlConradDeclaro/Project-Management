const express = require('express')
const app = express();
const cors = require('cors');
const mysql = require('mysql');



app.use(express.json())
app.use(cors())


//connecting to the database
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"",
    database: "project_management"
})


app.get('/',(req,res)=>{
    const sql = "SELECT * FROM project"
    db.query(sql,(err,data)=>{
       if(err)
       return res.json(err)
       else 
       return res.json(data)
    })
})
app.post('/create',(req,res)=>{
   
    const mysql = "INSERT INTO project (`projectTitle`,`description` ) VALUES(?)"
    const  value =[
        req.body.title,
        req.body.description
    ]

    db.query(mysql,[value],(err,data)=>{
        if(err)
        return res.json(err)
        else
        return res.json(data)
    })
    
    



})


app.get('/project',(req,res)=>{
    res.json({
        "status":'ok'
    })
})





app.listen('8000',()=>{
    console.log("listining to port 8000");
})