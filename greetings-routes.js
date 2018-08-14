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

  return {
    index,
    greetings,
    greeted
  }
}
