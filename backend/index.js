const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
require('dotenv').config();

const jwt = require('jsonwebtoken');
const xss = require('xss');
const app = express();

const port = process.env.DB_PORT;
const host = process.env.DB_HOST;
const name = process.env.DB_NAME;
const frontend_url = process.env.FRONTEND_URL;
const jwt_token = process.env.TOKEN_SECRET;

const db = new sqlite3.Database(`./${name}.db`, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log(`Connected to ${name}.db`);
});

app.use(express.json());

// CORS policy
const corsOptions = {
    origin: frontend_url, // Allow only this origin
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));


// Authentication utility functions ---------------------------------------------------------------------------------------------
function generateAccessToken(username) {
    return jwt.sign(username, jwt_token);
}

// Middleware to authenticate token for restricted functionalities
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, jwt_token, (err, user) => {
        console.error(err)

        if (err) return res.sendStatus(403)

        req.user = user

        next()
    })
}

// Login/Logout --------------------------------------------------------------------------------------------------------------

// POST login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    /* XSS flaw fixed:
        username = xss(username);
        password = xss(password);
    */

    function callback(err, row) {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal server error');
        }
        else if (!row) {
            res.status(401).send('Invalid username or password');
        }
        else {
            const token = generateAccessToken({ username });
            res.status(200).json({ token, username });
        }
    }

    /* Injection flaw fixed:
        const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
        db.get(sql, [ username, password ], callback);
    */

    const sql = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
    db.get(sql, callback);
});

// POST logout
app.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).send('Logged out');
});



// Users CRUD --------------------------------------------------------------------------------------------------------------
// GET all users
app.get('/users', (req, res) => {

    function callback(err, rows) {
        if (err) {
            console.error(err.message);
            res.status(500).send(err);
        } else {
            res.send(rows);
        }
    }

    const sql = 'SELECT * FROM users';
    db.all(sql, callback);
});

// GET single user by ID
app.get('/users/:id', (req, res) => {
    const { id } = req.params;

    function callback(err, row) {
        if (err) {
            console.error(err.message);
            res.status(500).send("Internal server error");
        } else if (!row) {
            res.status(404).send('User not found');
        } else {
            res.send(row);
        }
    }

    /* Injection flaw fixed:
        const sql = 'SELECT * FROM users WHERE id = ?';
        db.get(sql, [ id ], callback);
    */

    const sql = `SELECT * FROM users WHERE id = ${id}`;
    db.get(sql, callback);

});


// POST create new user
app.post('/users', (req, res) => {
    let { username, password } = req.body;

    if (!username || !password) {
        res.status(400).send('Username and password are required');
    } else {

        /* XSS flaw fixed:
            username = xss(username);
            password = xss(password);
        */

        function callback(err) {
            if (err) {
                console.error(err.message);
                res.status(500).send("Internal server error");
            } else {
                const token = generateAccessToken({ username });
                res.status(201).json({ token, username });
            }
        };

        /* Injection flaw fixed:
            const sql = 'INSERT INTO users(username, password) VALUES (?, ?)';
            db.run(sql, [ username, password ], callback);
        */

        const sql = `INSERT INTO users(username, password) VALUES ('${username}', '${password}')`;
        db.run(sql, callback);
    }
});


// DELETE user by ID - AUTHENTICATED
/* Broken access control flaw fixed:
    app.delete('/users/:id', authenticateToken, (req, res) => {
*/
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    function callback(err) {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal server error');
        } else if (this.changes === 0) {
            res.status(404).send('User not found');
        } else {
            res.status(204).send("User deleted");
        }
    };

    /* Injection flaw fixed:
        const sql = 'DELETE FROM users WHERE id = ?';
        db.run(sql, [ id ], callback);
    */

    const sql = `DELETE FROM users WHERE id = ${id}`;
    db.run(sql, callback);
});


// Blogs CRUD --------------------------------------------------------------------------------------------------------------
// GET all blogs
app.get('/blogs', (req, res) => {
    function callback(err, rows) {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal server error');
        } else {
            res.send(rows);
        }
    }

    const sql = 'SELECT * FROM blogs ORDER BY created_at DESC';
    db.all(sql, callback);
});

// GET all blogs by user ID - AUTHENTICATED
/* Broken access control flaw fixed:
    app.get('/user/:user_id/blogs', authenticateToken, (req, res) => {
*/
app.get('/user/:user_id/blogs', (req, res) => {
    const { user_id } = req.params;

    function callback(err, rows) {
        if (err) {
            console.error(err.message);
            res.status(500).send("Internal server error");
        } else {
            res.send(rows);
        }
    }

    /* Injection flaw fixed:
        const sql = 'SELECT * FROM blogs WHERE user_id = ?';
        db.all(sql, [ user_id ], callback);
    */

    const sql = `SELECT * FROM blogs WHERE user_id = ${user_id} ORDER BY created_at DESC`;
    db.all(sql, callback);
});


// GET single blog by blog ID and user ID - AUTHENTICATED
/* Broken access control flaw fixed:
    app.get('/user/:user_id/blogs/:blog_id', authenticateToken, (req, res) => {
*/
app.get('/user/:user_id/blogs/:blog_id', (req, res) => {
    const { user_id, blog_id } = req.params;

    function callback(err, row) {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal server error');
        } else if (!row) {
            res.status(404).send('Blog not found');
        } else {
            res.send(row);
        }
    }

    /* Injection flaw fixed:
        const sql = 'SELECT * FROM blogs WHERE user_id = ? AND id = ?';
        db.get(sql, [ user_id, blog_id ], callback);
    */

    const sql = `SELECT * FROM blogs WHERE user_id = ${user_id} AND id = ${blog_id}`;
    db.get(sql, callback);
});


// POST new blog by user ID - AUTHENTICATED
/* Broken access control flaw fixed:
    app.post('/user/:user_id/blogs', authenticateToken, (req, res) => {
*/
app.post('/user/:user_id/blogs', (req, res) => {
    const { user_id } = req.params;
    let { title, content } = req.body;

    if (!title || !content) {
        res.status(400).send('Title and content are required');
    } else {

        /* XSS flaw fixed:
            title = xss(title);
            content = xss(content);
        */

        function callback(err) {
            if (err) {
                console.error(err.message);
                res.status(500).send('Internal server error');
            } else {
                const blog_id = this.lastID;
                res.status(201).send({ user_id, blog_id, title, content });
            }
        }

        /* Injection flaw fixed:
            const sql = 'INSERT INTO blogs(user_id, title, content) VALUES (?, ?, ?)';
            db.run(sql, [ user_id, title, content ], callback);
        */

        const sql = `INSERT INTO blogs(user_id, title, content) VALUES ('${user_id}', '${title}', '${content}')`;
        db.run(sql, callback);
    }
});

// DELETE blog by blog ID and user ID - AUTHENTICATED
/* Broken access control flaw fixed:
    app.delete('/user/:user_id/blogs/:blog_id', authenticateToken, (req, res) => {
*/
app.delete('/user/:user_id/blogs/:blog_id', (req, res) => {
    const { user_id, blog_id } = req.params;

    function callback(err) {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal server error');
        } else {
            res.status(204).send();
        }
    }

    /* Injection flaw fixed:
        const sql = 'DELETE FROM blogs WHERE user_id = ? AND id = ?';
        db.run(sql, [ user_id, blog_id ], callback);
    */

    const sql = `DELETE FROM blogs WHERE user_id = ${user_id} AND id = ${blog_id}`;
    db.run(sql, callback);
});



// Start the server --------------------------------------------------------------------------------------------------------
app.listen(port, () => {
    const url = `http://${host}:${port}`;
    console.log(`Server listening on ${url}.`);
});