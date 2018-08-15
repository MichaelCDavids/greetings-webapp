module.exports = function GreetingsRoutes (GreeterObject) {
  async function index (req, res) {
    let data = {
      tally: await GreeterObject.getCounter()
    }
    res.render('home', {data})
  }

  async function greetings (req, res) {
    let language = req.body.greetType
    let name = req.body.name

    let data = {
      greeting: await GreeterObject.greet(name, language),
      tally: await GreeterObject.getCounter()
    }
    res.render('greetings', {data})
  }

  async function greeted (req, res) {
    let data = {
      users: await GreeterObject.allUsers(),
      tally: await GreeterObject.getCounter()
    }
    res.render('greeted', {data})
  }

  async function greetDetails (req, res) {
    let name = req.params.name
    let language = req.params.language
    let data = {
      greeting: await GreeterObject.greet(name, language),
      details: await GreeterObject.getDetails(name),
      tally: await GreeterObject.getCounter()
    }
    res.render('user', {data})
  }

  async function reset (req, res) {
    await GreeterObject.reset()
    res.redirect('/')
  }

  return {
    index,
    greetings,
    greeted,
    greetDetails,
    reset
  }
}
