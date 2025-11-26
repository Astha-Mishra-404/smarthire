const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public')); // serve your HTML and CSS

const usersFile = path.join(__dirname, 'users.json');

// Ensure users.json exists
if (!fs.existsSync(usersFile)) fs.writeFileSync(usersFile, '[]', 'utf8');

// Registration route
app.post('/register', (req, res) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
        return res.json({ success: false, message: 'All fields are required.' });
    }

    let users = JSON.parse(fs.readFileSync(usersFile));

    if (users.some(u => u.email === email)) {
        return res.json({ success: false, message: 'Email already exists.' });
    }

    users.push({ name, email, password, role });
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));

    res.json({ success: true });
});

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
