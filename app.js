const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const request = require('request')
const bodyParser=require('body-parser')

const port = process.env.PORT || 3100

//set handlebars middleware
app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({extended: false}))

//get data from stock api
function get_stock_info(callback, stock_input){
    request('https://cloud.iexapis.com/stable/stock/'+stock_input+'/quote?token=pk_5d66fa63e15449158a1658103b11c235', 
    {json : true }, (err, res, body)=>{
        if(err){console.log(err)}
        if(res.statusCode===200){
             callback(body)
            }else{
                callback({error:"Please provide correct stock symbol to search."})
            }
    })
}



//Set static folder
app.use(express.static('views'))

app.get('/', function  (req, res){
     get_stock_info(function(data){
        console.log(data)
            res.render('home', {
            data: data
        })
    }, 'fb')  
})

app.post('/', function  (req, res){
    console.log(req.body.stock_input)
     get_stock_info(function(data){
            res.render('home', {
            data: data
        })
    }, req.body.stock_input)  
})

app.get('/about', function(req, res){
    res.render('about')
})
app.listen(port, () => console.log('Server started at port '+port))