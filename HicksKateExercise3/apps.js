const express = require('express');
const { v4: uuidv4 } = require('uuid');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');


const app = express();
let port = 3000;
let host = 'localhost';
app.set('view engine', 'ejs');

let students = [
    {   id: '1', 
        name: 'Alice', 
        major: 'Computer Science', 
        gpa: 3.2,
        profile: '/images/bear1.jpg'},
    {   id: '2', 
        name: 'Bob', 
        major: 'Biology', 
        gpa: 3.0,
        profile: '/images/bear2.jpg'},
    {   id: '3', 
        name: 'Charlie', 
        major: 'Physics', 
        gpa: 3.8,
        profile: '/images/bear3.jpg'}
];

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({storage}).single('image');

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/students', (req, res) => {
    res.json(students);
});

app.post('/students', upload, (req, res) => {
    let student = req.body;
    console.log(student);
    student.id = uuidv4();
    students.push(student);
    res.redirect('/students');
});

app.get('/students/new', (req, res) => {
    res.render('new');
});

app.get('/students/:sid', (req, res) => {
    let id = req.params.sid;
    let student = students.find(element => element.id === id);
    res.render('student', {student});
});


app.listen(port, host, () => {
    console.log('The server is running at port', port);
});