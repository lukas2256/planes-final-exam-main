// Express server
const express = require('express')
const app = express()
const port = 3003

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

// SQL
const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "cars",
    password: "cars",
    database: "egzaminas"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

// CORS
const cors = require('cors')
app.use(cors())

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json());

// ROUTING
app.get('/labas/:id', (req, res) => {
    res.send(`labas tau ${req.params.id} `)
})

//   TEST
app.get('/test', (req, res) => {
    res.send(JSON.stringify({ test: 'OK' }))
})
// ------------------------------------------START------------------

// READ NODE
app.get('/cars', (req, res) => {
    const sql = `
    SELECT *
    FROM cars
    `;
    con.query(sql, (err, results) => {
        if (err) {
            throw err;
        }
        res.send(results);
    })
})

//   DELETE NODE
app.delete('/cars/:id', (req, res) => {
    const sql = `
          DELETE FROM cars
          WHERE id = ?
          `;
    con.query(sql, [req.params.id], (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
        console.log("Automobilis ištrintas");
    })
})

// CREATE NODE
app.post('/cars', (req, res) => {
    const sql = `
        INSERT INTO cars
        (id, plate, weight, pasangers, priority)
        VALUES (?, ?, ?, ?, ?)
    `;
    con.query(sql, [
      req.body.id,
      req.body.plate,
      req.body.weight,
      req.body.pasangers,
      req.body.priority,
    ], (err, results) => {
      if (err) {
        throw err;
      }
      res.send(results);
      console.log("Automobilis sukurtas");
    })
  })

//   EDIT/UPDATE
app.put('/cars/:id', (req, res) => {
    const sql = `
        UPDATE cars
        SET id = ?, plate = ?, weight = ?, pasangers = ?, priority = ?
        WHERE id = ?
    `;
    con.query(sql, [
      req.body.id,
      req.body.plate,
      req.body.weight,
      req.body.pasangers,
      req.body.priority,
      req.params.id
    ], (err, results) => {
      if (err) {
        throw err;
      }
      res.send(results);
      console.log("Automobilis redaguotas");
    })
  })

//   STATISTIC
app.get('/stats', (req, res) => {
    const sql = `
  SELECT COUNT(id) as carsCount, SUM(weight) as carsWeight, AVG(weight) as carsAverage
  FROM cars
  `;
    // console.log(req.query.s);
    con.query(sql, ['%' + req.query.s + '%'], (err, results) => {
      if (err) {
        throw err;
      }
      res.send(results);
    })
  })

// SEARCH
app.get('/cars-search', (req, res) => {
  const sql = `
  SELECT *
  FROM cars
  WHERE plate like ?
  `;
  con.query(sql, ['%' + req.query.s + '%'], (err, results) => {
    if (err) {
      throw err;
    }
    res.send(results);
  })
})