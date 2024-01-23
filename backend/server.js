const express = require('express')
const app = express();



app.get('/',(req,res)=>{
    res.json({
        "status":'ok'
    })
})


app.get('/project',(req,res)=>{
    res.json({
        "status":'ok'
    })
})
app.listen('3000',()=>{
    console.log("listining to port 3000");
})