const Sequelize = require('sequelize');
const db = new Sequelize('descriptions', 'postgres', 'guest', {
// const db = new Sequelize('descriptions', 'postgres', 'guest', {
  host: 'ec2-54-196-24-167.compute-1.amazonaws.com',
  port: 5432,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

db.authenticate()
  .then(() => {
    console.log('successfully connected to the database')
  })
  .catch(err => {
    console.log('oh no, the db is busted ', err)
  })

const MasterProductList = db.define('masterproductlist', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  name: Sequelize.STRING
}, {
  timestamps: false
})

const ProductDescription = db.define('productdescription', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  product_title: Sequelize.STRING,
  manufacturer: Sequelize.STRING,
  list_price: Sequelize.INTEGER,
  our_price: Sequelize.INTEGER,
  stock_status: Sequelize.BOOLEAN,
  sold_by: Sequelize.STRING,
  description: Sequelize.TEXT,
  category: Sequelize.STRING
}, {
  timestamps: false
})

db.sync({force: false})

module.exports.db = db
module.exports.MasterProductList = MasterProductList
module.exports.ProductDescription = ProductDescription

// To insert inside docker manually
// CREATE TABLE ProductDescriptions (
//   ID SERIAL PRIMARY KEY,
//   Product_Title VARCHAR,
//   Manufacturer VARCHAR,
//   List_Price INTEGER,
//   Our_Price INTEGER,
//   Stock_Status BOOLEAN,
//   Sold_By VARCHAR,
//   Description VARCHAR,
//   Category VARCHAR
// );

/////////////MONGODB/////////////////////////

// const MongoClient = require('mongodb').MongoClient;
// // const { generateData } = require('./dataGeneratorMongo.js');

// MongoClient.connect('mongodb://localhost:27017/', function(err, client){
//   if (err) {
//     console.log('failed to connect to db ', err);
//   }

//   client.db('description').dropDatabase();
//   const db = client.db('description');

//   db.createCollection('productdescriptions', (err, data) => {
//     if (err) {
//       console.log('failed to create productdescriptions collection', err);
//     }

//     // generateData(db.collection('productdescriptions'), () => {
//     //   console.log('Closing database')
//     //   client.close()
//     // })
//   });
// });

// module.exports = { MongoClient };

