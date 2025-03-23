const express = require('express');
const { Pool } = require('pg');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;


const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'teamdb',
    password: 'Harsh123',  
    port: 5432,
});


app.use(express.json());
app.use(cors());
app.use(express.static('public'));


const storage = multer.diskStorage({
    destination: 'public/uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});
const upload = multer({ storage: storage });


async function testDBConnection() {
    try {
        await pool.query('SELECT NOW()');
        console.log(' Connected to PostgreSQL Database');
    } catch (err) {
        console.error('Database Connection Error:', err.message);
        process.exit(1);
    }
}
testDBConnection();

// 
app.post('/api/team', upload.fields([{ name: 'panCardUpload' }, { name: 'aadhaarUpload' }]), async (req, res) => {
    try {
        const {
            name, fatherName, motherName, contact, email, emergencyContact,
            address, dob, joiningDate, panCard, uanNumber, accountName, bankName, ifsc, branch, accountNumber
        } = req.body;

        const pan_card = req.files['panCardUpload'] ? req.files['panCardUpload'][0].filename : null;
        const aadhaar_card = req.files['aadhaarUpload'] ? req.files['aadhaarUpload'][0].filename : null;

        const query = `
            INSERT INTO team_members 
            (name, father_name, mother_name, contact, email, emergency_contact, address, dob, doj, pan, uan, 
            account_name, bank_name, ifsc, branch, account_number, pan_card, aadhaar_card) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18) 
            RETURNING *`;

        const values = [name, fatherName, motherName, contact, email, emergencyContact, address, dob, joiningDate,
            panCard, uanNumber, accountName, bankName, ifsc, branch, accountNumber, pan_card, aadhaar_card];

        const result = await pool.query(query, values);
        res.json(result.rows[0]);

    } catch (err) {
        console.error(' Error inserting data:', err);
        res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
});


app.get('/api/team', async (req, res) => {
    try {
        const result = await pool.query('SELECT id, name, email, contact FROM team_members');
        res.json(result.rows);
    } catch (err) {
        console.error(' Error fetching team members:', err);
        res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
});


app.put('/api/team/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, contact } = req.body;

        const query = `
            UPDATE team_members 
            SET name = $1, email = $2, contact = $3 
            WHERE id = $4 RETURNING *`;

        const result = await pool.query(query, [name, email, contact, id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Team member not found' });
        }

        res.json(result.rows[0]);

    } catch (err) {
        console.error(' Error updating data:', err);
        res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
});


app.delete('/api/team/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const query = 'DELETE FROM team_members WHERE id = $1 RETURNING *';
        const result = await pool.query(query, [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Team member not found' });
        }

        res.json({ message: 'Team member deleted successfully' });

    } catch (err) {
        console.error('Error deleting data:', err);
        res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
});


app.listen(port, () => {
    console.log(`Server running at:`);
    console.log(` http://localhost:${port}`);
});
