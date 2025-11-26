const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bcrypt = require('bcrypt');
const path = require('path');
const app = express();
const PORT = 3000;

// ===== Middleware =====
app.use(cors());
app.use(express.json());

// Serve static files (HTML, CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public'))); // Serve files from the "public" folder

// ===== Database Connection =====
const dbConfig = {
    host: 'localhost',
    user: 'smart_user',        // Database username
    password: 'smart_password123', // Database password
    database: 'smart_hire',    // Database name
};

let pool;

async function initDB() {
    try {
        pool = await mysql.createPool(dbConfig);
        console.log('Connected to MariaDB');
    } catch (err) {
        console.error('DB Connection Error:', err);
        process.exit(1);
    }
}

initDB();

// ===== Routes =====

// Test endpoint
app.get('/', (req, res) => {
    res.send('Server is running');
});

// ===== Register endpoint =====
app.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        // Check if the email is already registered
        const [existingUser] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ error: 'Email is already registered' });
        }

        // Hash the password before storing
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user into the database
        await pool.query('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', [
            name,
            email,
            hashedPassword,
            role,
        ]);

        // Send success message
        res.json({ message: 'Registration successful' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

// ===== Login endpoint =====
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length === 0) return res.status(401).json({ error: 'Invalid credentials' });

        const user = rows[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ error: 'Invalid credentials' });

        res.json({ message: 'Login successful', user: { name: user.name, email: user.email, role: user.role } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});


// ===== Get Freelancers endpoint =====
app.get('/freelancers', async (req, res) => {
    try {
        // Fetch freelancers with the 'provider' role from the database
        const [rows] = await pool.query('SELECT id, name, email, skill FROM users WHERE role = "provider"');

        // Check if we got freelancers from the database
        if (rows.length === 0) {
            return res.status(404).json({ message: 'No freelancers found' });
        }

        // Send the freelancers as a response (send data as JSON)
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});



// ===== Start Server =====
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);

});
