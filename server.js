const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/studentdb')
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

const StudentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    course: String
});

const Student = mongoose.model('Student', StudentSchema);



// CREATE API
app.post('/addStudent', async (req, res) => {
    try {
        const student = new Student(req.body);
        const savedStudent = await student.save();
        res.json(savedStudent);
    } catch (err) {
        res.status(500).json(err);
    }
});



// READ API
app.get('/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).json(err);
    }
});



// UPDATE API
app.put('/updateStudent/:id', async (req, res) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updatedStudent);
    } catch (err) {
        res.status(500).json(err);
    }
});



// DELETE API
app.delete('/deleteStudent/:id', async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.json({ message: 'Student Deleted Successfully' });
    } catch (err) {
        res.status(500).json(err);
    }
});



app.listen(3000, () => {
    console.log('Server running on port 3000');
});
