module.exports = function (pool) {
  async function greetings (name, language) {
    name = name.replace(/[^A-Za-z]/g, '')
    name = name.charAt(0).toUpperCase() + name.slice(1)
    let found = await pool.query('select id from users where name=$1', [name])
    if (found.rowCount === 0) {
      await pool.query('insert into users (name,counter) values ($1, 0)', [name])
    }
    await pool.query('update users set counter=counter+1 where name=$1', [name])
    if (language === 'English') {
      return 'Hello, ' + name
    } else if (language === 'Afrikaans') {
      return 'Goeie dag, ' + name
    } else if (language === 'isiXhosa') {
      return 'Molo, ' + name
    }
  }

  async function counter () {
    let result = await pool.query('select * from users')
    return result.rowCount
  }

  async function userCounter () {
    let result = await pool.query('select * from users')
    return result.rows
  }

  return {
    greet: greetings,
    getCounter: counter,
    allUsers: userCounter
  }
}
