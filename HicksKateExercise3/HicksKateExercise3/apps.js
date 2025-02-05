const express = require('express');
const { v4: uuidv4 } = require('uuid');
const morgan = require('morgan');
const { upload } = require('./middleware/fileUpload')


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

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/students', (req, res) => {
    res.render('students', { students });
});

app.post('/students', upload, (req, res) => {
    let student = req.body;
    student.id = uuidv4();
    student.profile = '/images/' + req.file.filename;
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