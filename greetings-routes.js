module.exports = function GreetingsRoutes(GreeterObject) {
  async function index(req, res) {
    let data = {
      tally: await GreeterObject.getCounter()
    }
    res.render('home', {
      data
    })
  }

  async function greetings(req, res) {
    let language = req.body.greetType
    let name = req.body.name
    console.log('language '+language)
    console.log('name '+name)

    let data = {
      greeting: await GreeterObject.greet(name, language),
      tally: await GreeterObject.getCounter()
    }

    if (name === '' && name === undefined) {
      req.flash('info', 'Please enter a valid name.')
    } else if (language === '' || language === undefined) {
      req.flash('info', 'Please select a language.')
    } else {
      req.flash('info', 'Person greeted and name stored in database.')
    }
    res.render('greetings', {
      data
    })
  }

  async function greeted(req, res) {
    let data = {
      users: await GreeterObject.allUsers(),
      tally: await GreeterObject.getCounter()
    }
    req.flash('info', 'A list of names of people who have greeted.')
    res.render('greeted', {
      data
    })
  }

  async function greetDetails(req, res) {
    let name = req.params.name
    let language = req.params.language
    if (language === '' || language === undefined) {
      language = 'English'
    }
    let data = {
      greeting: await GreeterObject.greet(name, language),
      details: await GreeterObject.getDetails(name),
      tally: await GreeterObject.getCounter()
    }
    res.render('user', {
      data
    })
  }

  async function reset(req, res) {
    await GreeterObject.reset()
    req.flash('info', 'Database restored to factory defaults')
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