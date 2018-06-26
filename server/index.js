const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const path = require('path')
const axios = require('axios')
const cors = require('cors')

// require('../database/dataGenerator.js');

const db = require('../database')

const app = express()
const PORT = 2112

// const corOpts = {
//  "origin": "*",
//  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
//  "preflightContinue": false,
//  "optionsSuccessStatus": 204
// }

// app.use(cors(corOpts));

app.use(express.static(path.join(__dirname, '../client/dist')))
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.listen(PORT, function(err, success) {
  if(err) {
    console.log('Express server connection error!')
  } else {

    console.log('Listening on PORT: ', PORT)
  }
})

app.get('/api/description/name/:product', function(req, res) {
  db.ProductDescription.findOne({where: {ProductTitle: req.params.product}})
    .then(response => {
      res.send(response)
    })
    .catch(err => console.log('err in server name get', err))
})

app.get('/api/description/id/:id', function(req, res) {
  db.ProductDescription.findOne({where: {id: req.params.id}})
    .then(response => {
      res.send(response)
    })
    .catch(err => console.log('err in server ID get', err))
})


app.put('/api/description/:product', function(req, res) {
  db.ProductDescription.update(
    {
      ProductTitle: req.body.producttitle,
      OurPrice: req.body.ourprice,
      StockStatus: req.body.stockstatus,
      Description: req.body.description
    },
    {
      where: { ProductTitle: req.params.product}
    }
  )
})

// add a post request
app.post('/api/description/', function(req, res){
  // console.log('hello')
  db.ProductDescription.create({
    id: 101,
    ProductTitle: "Testing Title",
    OurPrice: 1111,
    StockStatus: true,
    Description: "Trying to test if this get request is actually working. If it does, the great! If it doesn't, then it's a bummer!"
  })
    .then(post => {
      res.send(post)
    })
    .catch(err => {
      res.status(201).send('error finding post ', err);
    })
})

//add a delete request
app.delete('/api/description/id/:id', function(req, res){
  console.log('deleted!')
  db.ProductDescription.destroy({where: {id: 101}})
  .then(data => {
    res.send('this works')
  })
  .catch(err => {
      res.send('unable to delete ', err);
    })
})

