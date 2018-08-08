module.exports = function GreetingsRoutes (GreeterObject) {
  function index (req, res) {
    res.render('view')
  }

  async function greetings (req, res) {
    let language = req.body.greetType
    let name = req.body.name

    let Greet = {
      greeting: await GreeterObject.greet(name, language),
      tally: await GreeterObject.getCounter()
    }

    res.render('view', {Greet})
  }

  async function greeted (req, res) {
    let users = await GreeterObject.allUsers()
    console.log(users);
    res.render('greeted', {users})
  }

  return {
    index,
    greetings,
    greeted
  }
}
