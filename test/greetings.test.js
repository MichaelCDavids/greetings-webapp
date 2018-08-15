'use strict'

const assert = require('assert')
const GreetingsFactory = require('../greetings-factory')
const pg = require('pg')
const Pool = pg.Pool

const connectionString = process.env.DATABASE_URL || 'postgresql://coder:pg123@localhost:5432/greetings'

const pool = new Pool({
  connectionString
})

describe('The Greetings-Webapp', function () {
  beforeEach(async function () {
    await pool.query('delete from users;')
  })

  describe('The greet Function', function () {
    it('should return a message based on a given input', async function () {
      let greetingsFactory = GreetingsFactory(pool)
      let message = await greetingsFactory.greet('Greg', 'English')

      assert.equal(message, 'Hello, Greg')
    })
  })
  describe('The getCounter Function', function () {
    it('should return the number of people greeted', async function () {
      let greetingsFactory = GreetingsFactory(pool)
      await greetingsFactory.greet('Mike', 'English')
      await greetingsFactory.greet('Schtoo', 'English')
      let result = await greetingsFactory.getCounter()
      assert.equal(result, 2)
    })
  })
  describe('The userCounter Function', function () {
    it('should return a list of user objects', async function () {
      let greetingsFactory = GreetingsFactory(pool)
      await greetingsFactory.greet('Mike', 'English')
      await greetingsFactory.greet('Schtoo', 'English')
      let result = await greetingsFactory.allUsers()
      result = [{
        name: result[0].name,
        counter: result[0].counter
      },{
        name: result[1].name,
        counter: result[1].counter
      }]
      assert.deepEqual(result, [{
        name: 'Mike',
        counter: 1
      },
      {
        name: 'Schtoo',
        counter: 1
      }
      ])
    })
  })

  after(function () {
    pool.end()
  })
})