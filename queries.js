const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'api',
  password: 'postgres',
  port: 5432
})

const getUsers = (req, res) => {
  pool.query(`SELECT * FROM users ORDER BY id ASC`, (err, results) => {
    if (err) {
      throw err
    }
    res.status(200).json(results.rows)
  })
}

const getUserById = (req, res) => {
  const id = parseInt(req.params.id)
  pool.query(`SELECT * FROM users WHERE id = ${id}`, (err, results) => {
    if (err) {
      throw err
    }
    res.status(200).json(results.rows)
  })
}

const createUser = (req, res) => {
  const { name, email } = req.body
  console.log(req.body)

  pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (err, result) => {
    if (err) {
      throw err
    }
    res.status(201).send(`Usuário adicionado com ID: ${result.insertId}}`)
  })
}

const updateUser = (req, res) => {
  const id = parseInt(req.params.id)
  const { name, email } = req.body

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (err, result) => {
      if (err) {
        throw err
      }
      res.status(200).send(`Usuário modificado com ID: ${id}`)
    }
  )
}

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (err, result) => {
    if (err) {
      throw err
    }
    res.status(200).send(`Usuário deletado com ID: ${id}`)
  })
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
}