const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
const multer = require('multer');
 
app.use(express.json());
app.use(cors());
app.use(express.static('public'))

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




app.get('/', (req, res) => {
   
});

app.post('/SignIn', (req, res) => {
    const sql = "INSERT INTO users (name, password) VALUES (?, ?)";
    const values = [
        req.body.name,
        req.body.password
    ];

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error inserting data into database:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json({ success: true });
    });
});

app.get('/login',(req,res)=>{
    const sql = "SELECT * FROM users";
    db.query(sql, (err, data) => {
        if (err) {
            console.error('Error querying database:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(data);
    });
})
//from xcon

 

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




 


app.listen('8000', () => {
    console.log("Listening on port 8000");
});
