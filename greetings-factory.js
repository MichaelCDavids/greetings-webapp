module.exports = function (pool) {
  async function greetings (name, language) {
    if (language !== '' && language !== undefined) {
      if (name !== '') {
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
      } else {
        return 'Please enter your name'
      }
    } else {
      return 'Please select a language'
    }
  }
  
  async function counter () {
    let result = await pool.query('select count (*) as user_count from users')
    return result.rows[0].user_count
  }

  async function greetedUsers () {
    let result = await pool.query('select * from users')
    return result.rows
  }

  async function userDetails (name) {
    let result = await pool.query('select * from users where name=$1', [name])
    console.log(result.rows[0])
    return result.rows[0]
  }

  async function resetCounter () {
    await pool.query('delete from users')
  }

  return {
    greet: greetings,
    getCounter: counter,
    allUsers: greetedUsers,
    getDetails: userDetails,
    reset: resetCounter
  }
}
