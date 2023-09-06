const PORT = process.env.PORT ?? 3030;
const express = require('express');
// import v4 uuid untuk regenerate random unique id
const { v4: uuidv4 } = require('uuid');
const app = express();
const pool = require('./db');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.use(cors());
app.use(express.json());
// get all todos
app.get('/todos/:userEmail', async (req, res) => {
  const { userEmail } = req.params;

  try {
    const todos = await pool.query(
      'SELECT * FROM todos WHERE user_email = $1',
      [userEmail]
    );
    res.json(todos.rows);
  } catch (error) {
    console.log(error);
  }
});

// create new todo
app.post('/todos', async (req, res) => {
  // membuat beberapa data yang dimasukan agar menjadi request body dan dapat terekam ke database
  const { user_email, title, progress, date } = req.body;
  // random generate ID
  const id = uuidv4();

  try {
    // query insert data to table, dan mempassing email, title, progress, dan date dari frontend
    const newTodo = await pool.query(
      'INSERT INTO todos(id, user_email, title, progress, date) VALUES($1, $2, $3, $4, $5)',
      [id, user_email, title, progress, date]
    );
    res.json(newTodo.rows[0]);
  } catch (error) {
    console.error(error);
  }
});

// update todo
app.put('/todos/:id', async (req, res) => {
  // mengambil value id dari parameter
  const { id } = req.params;
  const { user_email, title, progress, date } = req.body;
  try {
    const editTodo = await pool.query(
      'UPDATE todos SET user_email = $1, title = $2, progress = $3, date = $4 WHERE id = $5',
      [user_email, title, progress, date, id]
    );
    res.json(editTodo);
  } catch (error) {
    console.error(error);
  }
});

// delete todo
app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleteTodo = await pool.query('DELETE FROM todos WHERE id = $1', [
      id,
    ]);
    res.json(deleteTodo);
  } catch (error) {
    console.error(error);
  }
});

// sign up
app.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  // encrypt password menggunakan bcrypt
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  try {
    // koneksi baru ke database users
    const signUp = await pool.query(
      `INSERT INTO users (email, hashed_password) VALUES ($1, $2)`,
      [email, hashedPassword]
    );
    // melakukan generate token menggunakan jwt untuk menambah
    const token = jwt.sign({ email }, 'secret', { expiresIn: '1hr' });

    res.json({ email, token });
  } catch (error) {
    console.error(error);
    // untuk menampilkan respon error yang akan di konsume di frontend
    if (error) {
      res.json({ detail: error.detail });
    }
  }
});

// login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const users = await pool.query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);

    if (!users.rows.length) {
      res.json({ detail: 'User not found' });
    }

    const success = await bcrypt.compare(
      password,
      users.rows[0].hashed_password
    );
    const token = jwt.sign({ email }, 'secret', { expiresIn: '1hr' });

    if (success) {
      res.json({ email: users.rows[0].email, token });
    } else {
      res.json({ detail: 'Login Failed, Please Try Again' });
    }
  } catch (error) {
    console.error(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
