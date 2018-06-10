const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const path = require('path')
const axios = require('axios')

const db = require('../database')

const app = express()
const PORT = 3000

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


app.get('/api/description/:product', function(req, res) {
  db.ProductDescription.findOne({where: {ProductTitle: req.params.product}})
    .then(response => {
      res.send(response)
    })
    .catch(err => console.log('err in server DB get', err))
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

//.update(values, where)
//"ProductTitle", "Manufacturer", "ListPrice", "OurPrice", "StockStatus", "SoldBy", "Description", "Category

//npm install

//nodemon X
//body-parser X
//express X
//helmet X
//axios X

//npm install sequelize
//npm install pg 

//react X
//react dom X
//babel core X
//babel-loader X
//babel-preset-env X
//babel-preset-react X

//webpack
//webpack cli

//git checkout branch
//commit everything
//send it up via branch