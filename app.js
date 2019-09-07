const express = require('express')
const app = express()
const exphbs = require('express-handlebars')

const port = process.env.PORT || 3100

//set handlebars middleware
app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')


//Set static folder
app.use(express.static('views'))

app.get('/', function(req, res){
    res.render('home', {
        stuff:'my stuff'
    })
})

app.listen(port, () => console.log('Server started at port '+port))