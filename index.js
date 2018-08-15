const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const greetings = require('./greetings-factory')
const GreetingsRoutes = require('./greetings-routes')
const pg = require('pg')

const Pool = pg.Pool

let useSSL = false
let local = process.env.LOCAL || false

if (process.env.DATABASE_URL && !local) {
  useSSL = true
}

const connectionString = process.env.DATABASE_URL || 'postgresql://coder:pg123@localhost:5432/greetings'

const pool = new Pool({
  connectionString,
  ssl: useSSL
})

let app = express()

let GreeterObject = greetings(pool)
let greetingsRoutes = GreetingsRoutes(GreeterObject)

app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}))

app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

app.get('/', greetingsRoutes.index)

app.post('/greetings', greetingsRoutes.greetings)

app.post('/', greetingsRoutes.reset)

app.get('/greeted', greetingsRoutes.greeted)

app.get('/greeted/:name', greetingsRoutes.greetDetails)

app.get('/greeted/:name/:language', greetingsRoutes.greetDetails)
let PORT = process.env.PORT || 3007

app.listen(PORT, function () {
  console.log('Server successfully started and running on port: ', PORT)
})
