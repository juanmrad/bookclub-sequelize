const express = require('express');
const PORT = process.env.PORT || 3000;
const models = require('./models');
const bcrypt = require('bcrypt');
const db = require('./models');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to my book club app')
})

app.post('/signup', (req, res) => {
  /**
   * ES6 object deconstruct assignment.
   * 
   * const username = req.body.username
   * const email = req.body.email
   * const password = req.body.password
   */
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.json({ error: 'Username, Email, and Password required.' })
    return;
  }

  bcrypt.hash(password, 5, (err, hash) => {
    models.User.create({
      username: username,
      email: email,
      password: hash
    }).then((user) => {
      res.json({
        success: true,
        user_id: user.id
      })
    }).catch(e => {
      let errors = [];

      e.errors.forEach((error) => {
        errors.push(error.message)
      })

      res.json({ error: errors })
    })
  })
})

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  models.User.findOne({
    where: { username: username }
  }).then((user) => {
    if (!user) {
      res.json({ error: 'no user with that username' })
      return;
    }

    bcrypt.compare(password, user.password, (err, match) => {
      if (match) {
        res.json({ user_id: user.id, success: true })
      } else {
        res.json({ error: 'incorrect password' })
      }
    })
  })
})


app.listen(PORT, () => {
  console.log(`App started in port ${PORT}`)
})