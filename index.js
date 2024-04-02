// index.js

const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();

// Body parser middleware
app.use(bodyParser.json());

// Create MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'formValidation'
});

// Connect to MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// Endpoint to handle form submissions
app.post('/submit-form', (req, res) => {
    const { name, email, age } = req.body;

    // Simple validation
    if (!name || !email || !age) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Additional validation can be implemented here

    // Insert data into MySQL
    const sql = 'INSERT INTO formData (name, email, age) VALUES (?, ?, ?)';
    connection.query(sql, [name, email, age], (err, result) => {
        if (err) {
            console.error('Error inserting data into MySQL:', err);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }
        console.log('Data inserted into MySQL:', result);
        res.status(201).json({ message: 'Form data submitted successfully' });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
