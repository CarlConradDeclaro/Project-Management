const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const multer = require('multer');
const jwt = require('jsonwebtoken')
const bcrypt= require('bcrypt')
const cookieParse = require('cookie-parser')



const app = express();
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST","GET","DELETE","PUT"],
    credentials: true
}));
app.use(express.static('public'))
app.use(cookieParse())

// Connecting to the database
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "project_management"
});

// Check MySQL connection
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/images");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({ storage });


const verifyUser=(req,res,next)=>{
    const token = req.cookies.TOKEN
    if(!token){
        return res.json({Error:"Your not authenticated"})
    }else{
        jwt.verify(token,"jwt-secret-key",(err,decoded)=>{
            if(err){
                return res.json({Error: "Token is not okey"})
            }else{
                req.name = decoded.name
                req.id = decoded.id;
                next();
            }
        })
    }
}


app.get('/', verifyUser,(req, res) => {
     return res.json({Status : "Success" , name:req.name,  id: req.id })
});

app.post('/SignIn', (req, res) => {
    const sql = "INSERT INTO users (name, password) VALUES (?, ?)";
    bcrypt.hash(req.body.password.toString(),10,(err,hash)=>{
        if(err)return res.json({Error: "error for hashing"})       
        const values = [
            req.body.name,
           hash
        ];
        db.query(sql, values, (err, data) => {
            if (err) {
                console.error('Error inserting data into database:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            res.json({ success: true });
        });
    })

});


// app.post('/login',(req,res)=>{
//     const sql = "SELECT * FROM users WHERE name = ?";
//     db.query(sql,[req.body.name] , (err,data) => {
//         if (err)     
//             return res.json({ error: 'Internal Server Error' });
//         if(data.length > 0){
//             bcrypt.compare(req.body.password.toString(), data[0].password, (err,response)=>{
//                 if(err) return res.json({Error: "Pasword hash error"})
//                 if(response){
//                     const NAME =data[0].name;
//                     const TOKEN = jwt.sign({NAME},"jwt-secret-key",{expiresIn:  '1d'})
//                     res.cookie('TOKEN',TOKEN)
//                     return res.json({Status: "Success"})
//                 }else{
//                     return res.json({Error: "Password not matched"})
//                 }
//             })
//         }else{
//             return res.json({Error: "No email existed"})
//         }
         
//     });
// })


app.post('/login', (req, res) => {
    const { name, password } = req.body;
    const sql = "SELECT id, name, password FROM users WHERE name = ?";
    db.query(sql, [name], (err, data) => {
        if (err || data.length === 0) {
            return res.json({ Error: "Invalid credentials" });
        }

        const user = data[0];
        bcrypt.compare(password, user.password, (err, result) => {
            if (err || !result) {
                return res.json({ Error: "Invalid credentials" });
            }

            const token = jwt.sign({ id: user.id, name: user.name }, "jwt-secret-key", { expiresIn: '1d' });
            // res.cookie('TOKEN', token, { httpOnly: true });
            res.cookie('TOKEN', token);
            return res.json({ Status: "Success", id: user.id, name: user.name });
        });
    });
});



app.post('/create', upload.single('file'), (req, res) => {
    const sqlQuery = "INSERT INTO project (projectTitle, description, image, status,tags,owner,members) VALUES (?, ?,?, ?,?,?,?)";
    const values = [
        req.body.title,
        req.body.description,
        req.file.filename,
        req.body.status,
        req.body.tags,
        req.body.id,
        req.body.members
    ];    
    db.query(sqlQuery, values, (err, data) => {
        if (err) {
            console.error('Error inserting data into database:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json({success: true});
    });
});


app.get('/create/users', (req, res) => {
    const sql = "SELECT * FROM users";
    db.query(sql, (err, data) => {
        if (err) {
            console.error('Error querying database:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(data);
    });
});




app.get('/project', (req, res) => {
    const sql = "SELECT * FROM project";
    db.query(sql, (err, data) => {
        if (err) {
            console.error('Error querying database:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(data);
    });
});


app.get('/logout',(req,res)=>{
    res.clearCookie('TOKEN')
    return res.json({Status: "Success"})
})

app.post('/create-task',(req,res)=>{
    
    const sql = "INSERT INTO task (projId,details,assign,status,dueDate,priority) VALUES (?,?,?,?,?,?)"
 
    const values = [
        req.body.id,
        req.body.details,
        req.body.assign,
        req.body.status,
        req.body.dueDate,
        req.body.priority  
    ]; 

    const numTask = ++req.body.numTask
    const taskDone = req.body.taskDone


    const status = numTask != taskDone ? 'inprogress':'completed'
    const projId =    req.body.id

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error inserting data into database:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        const sqlUpdate = "UPDATE project SET numTask = ? , status = ? WHERE id = ?";
        db.query(sqlUpdate, [numTask,status, projId], (err, result) => {
            if (err) {
                console.error('Error updating numTask:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            console.log('numTask updated successfully');
            res.json({ message: 'numTask added successfully' });
        });    


    });
})
app.put('/update-taskDone', (req, res) =>{


    const taskId = req.body.taskid;
    const taskDone = ++req.body.tskDone


    const nTask = req.body.numT;
    const tDone = ++req.body.taskD
    const status = nTask == tDone ? 'completed' : 'inprogress'

    const sqlUpdate = "UPDATE project SET taskDone = ?, status =? WHERE id = ?";   
    db.query(sqlUpdate, [taskDone,status, taskId], (err, result) => {
        if (err) {
            console.error('Error updating numTask:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        console.log('numTask updated successfully');
        res.json({ message: 'numTask updated successfully' });
    });   
})





app.put('/update-task', (req, res) => {

    const Id = req.body.id;
   

    const sql = "UPDATE task SET status = 'Done' WHERE id = ?";    
    db.query(sql, Id, (err, data) => {
      if (err) {
        console.error('Error updating task in the database:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      console.log('numTask updated successfully');
      res.json({ message: 'numTask updated successfully' });
    });
  });


 
app.get('/getTask', (req, res) => {
    const {prodId} =  req.body
    const sql = "SELECT * FROM task";
    db.query(sql, (err, data) => {
        if (err) {
            console.error('Error querying database:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(data);
    });
});

 
app.delete('/task/:id/:numTTask/:projIdd/:taskdoneval/:status', (req, res) => {
    const itemId = req.params.id;
    const sql = "DELETE FROM task WHERE id = ?";


    
    const td =   req.params.taskdoneval > 0  && req.params.status == 'Done'?  --req.params.taskdoneval : req.params.taskdoneval;

    const numTask = --req.params.numTTask
    const proId =    req.params.projIdd
   
    const status = req.params.taskdoneval == req.params.numTTask &&  (req.params.taskdoneval == 0 &&  req.params.numTTask  != 0)  ? 'completed' :  req.params.numTTask == 0  ? 'working':'inprogress'



         console.log("task done: "+td);
          console.log("task num: "+numTask);
    db.query(sql, [itemId], (err, result) => {
        if (err) {
            console.error('Error deleting item:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Item not found' });
        }


        const sqlUpdate = "UPDATE project SET status = ?, numTask = ?, taskDone=? WHERE id = ?";
        db.query(sqlUpdate, [status,numTask,td, proId], (err, result) => {
            if (err) {
                console.error('Error updating numTask:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            console.log('numTask updated successfully' + td + " " +numTask);
            res.json({ message: 'numTask updated successfully and deleted sussecfully' });
        });    
    });
});

 


app.delete('/project-delete/:prodId', (req, res) => {
    const itemId = req.params.prodId;
    const sqlProject = "DELETE FROM project WHERE id = ?";
    db.query(sqlProject, [itemId], (err, result) => {
        if (err) {
            console.error('Error deleting item:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Item not found' });
        }
       

     
    const sqlTask = "DELETE FROM task WHERE projId = ?";
    db.query(sqlTask, [itemId], (err, result) => {
        if (err) {
            console.error('Error deleting item:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
      
        res.json({ message: 'Item deleted successfully' });
    });

});
});

 

app.listen('8000', () => {
    console.log("Listening on port 8000");
});
