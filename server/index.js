const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const path = require('path')
const axios = require('axios')
const cors = require('cors')
require('newrelic');

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

app.get('/api/description/id/:id', function(req, res) { //app.get('/api/description/id:id', function(req, res)
  // let id = Math.floor(Math.random()*10000000);
  console.log('req.params.id--', Number(req.params.id))
  db.ProductDescription.findOne({where: {id: req.params.id}}) //db.ProductDescription.findOne({where: {id: req.params.id}})
    .then(response => {
      // console.log('response-', response)
      res.send(response)
    })
    .catch(err => console.log('err in server ID get', err))
})


app.put('/api/description/:product', function(req, res) {
  db.ProductDescription.update({
      ProductTitle: "Update",
      OurPrice: req.body.ourprice,
      StockStatus: req.body.stockstatus,
      Description: req.body.description
    },
    {
      where: { ProductTitle: req.params.product}
    }).then(data => {
      res.send(data)
    })
})

// add a post request
app.post('/api/description/', function(req, res){
  // console.log('hello')
  db.ProductDescription.create({
    ProductTitle: "newdata",
    OurPrice: req.body.OurPrice,
    StockStatus: req.body.StockStatus,
    Description: req.body.Description,
    Category: req.body.Category,
    Manufacturer: req.body.Manufacturer,
    ListPrice: req.body.ListPrice,
    SoldBy: req.body.SoldBy
  })
    .then(post => {
      res.status(201).send(post)
    })
    .catch(err => {
      console.log('error finding post ', err);
    })
})

//add a delete request
app.delete('/api/description/id/:id', function(req, res){
  console.log('deleted!')
  db.ProductDescription.destroy({where: {id: req.params.id}})
  .then(data => {
    res.send('this works')
  })
  .catch(err => {
      res.send('unable to delete ', err);
    })
})

