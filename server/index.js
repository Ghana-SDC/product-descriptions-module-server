const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const path = require('path')
const axios = require('axios')

const db = require('../database')

const app = express()
const PORT = 2112

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

//https://www.amazon.com/morning-stoneware-co-workers-microwave-dishwasher/dp/B075W9NNK9/ref=sr_1_2_sspa?s=kitchen&ie=UTF8&qid=1528417867&sr=1-2-spons&keywords=mug&psc=1
//https://www.amazon.com/Bose-QuietComfort-Wireless-Headphones-Cancelling/dp/B0756CYWWD/ref=pd_sim_23_5?_encoding=UTF8&pd_rd_i=B0756CYWWD&pd_rd_r=VVZKBB33HHC9Q6BGCXK3&pd_rd_w=fQ32G&pd_rd_wg=EjFsZ&psc=1&refRID=VVZKBB33HHC9Q6BGCXK3
//https://www.amazon.com/Come-Away-Esg/dp/B005K2L4XK/ref=sr_1_3_twi_aud_1?ie=UTF8&qid=1528418464&sr=8-3&keywords=esg