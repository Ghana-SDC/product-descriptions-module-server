// const Sequelize = require('sequelize');
// const db = new Sequelize('description', 'aldohari', '', {
//   host: 'localhost',
//   dialect: 'postgres'
// })

// db.authenticate()
//   .then(() => {
//     console.log('successfully connected to the database')
//   })
//   .catch(err => {
//     console.log('oh no, the db is busted ', err)
//   })

// const MasterProductList = db.define('masterproductlist', {
//   id: {
//     type: Sequelize.INTEGER,
//     primaryKey: true
//   },
//   name: Sequelize.STRING
// }, {
//   timestamps: false
// })

// const ProductDescription = db.define('productdescription', {
//   // id: {
//   //   type: Sequelize.INTEGER,
//   //   primaryKey: true
//   // },
//   ProductTitle: Sequelize.STRING,
//   Manufacturer: Sequelize.STRING,
//   ListPrice: Sequelize.STRING,
//   OurPrice: Sequelize.STRING,
//   StockStatus: Sequelize.BOOLEAN,
//   SoldBy: Sequelize.STRING,
//   Description: Sequelize.TEXT,
//   Category: Sequelize.STRING
// }, {
//   timestamps: false
// })

// db.sync({force: false})

// module.exports.db = db
// module.exports.MasterProductList = MasterProductList
// module.exports.ProductDescription = ProductDescription

/////////////MONGODB/////////////////////////

const MongoClient = require('mongodb').MongoClient;
const { generateData } = require('./dataGeneratorMongo.js');

MongoClient.connect('mongodb://localhost:27017/', function(err, client){
  if (err) {
    console.log('failed to connect to db ', err);
  }

  client.db('description').dropDatabase();
  const db = client.db('description');

  db.createCollection('productdescriptions', (err, data) => {
    if (err) {
      console.log('failed to create productdescriptions collection', err);
    }

    generateData(db.collection('productdescriptions'), () => {
      console.log('Closing database')
      client.close()
    })
  });
});

module.exports = { MongoClient };

