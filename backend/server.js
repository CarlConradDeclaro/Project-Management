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
    methods: ["POST","GET"],
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
        return res.json({Error:"You not authenticated"})
    }else{
        jwt.verify(token,"jwt-secret-key",(err,decoded)=>{
            if(err){
                return res.json({Error: "Token is not okey"})
            }else{
                req.name = decoded.name
                next();
            }
        })
    }
}


app.get('/', verifyUser,(req, res) => {
     return res.json({Status : "Success"})
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

app.post('/login',(req,res)=>{
    const sql = "SELECT * FROM users WHERE name = ?";
    db.query(sql,[req.body.name] , (err,data) => {
        if (err)     
            return res.status(500).json({ error: 'Internal Server Error' });
        if(data.length > 0){
            bcrypt.compare(req.body.password.toString(), data[0].password, (err,response)=>{
                if(err) return res.json({Error: "Pasword hash error"})
                if(response){
                    const NAME =data[0].name;
                    const TOKEN = jwt.sign({NAME},"jwt-secret-key",{expiresIn:  '1d'})
                    res.cookie('TOKEN',TOKEN)
                    return res.json({Status: "Success"})
                }else{
                    return res.json({Error: "Password not matched"})
                }
            })
        }else{
            return res.json({Error: "No email existed"})
        }
         
    });
})


 

app.post('/create', upload.single('file'), (req, res) => {
    const sqlQuery = "INSERT INTO project (projectTitle, description, image, status,tags) VALUES (?, ?,?, ?,?)";
    const values = [
        req.body.title,
        req.body.description,
        req.file.filename,
        req.body.status,
        req.body.tags
    ];
    
    db.query(sqlQuery, values, (err, data) => {
        if (err) {
            console.error('Error inserting data into database:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json({ success: true });
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


 


app.listen('8000', () => {
    console.log("Listening on port 8000");
});
