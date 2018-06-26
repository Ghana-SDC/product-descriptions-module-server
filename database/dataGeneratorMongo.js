const faker = require('faker');
const moment = require('moment')
const numEntries = 10000000;
const batchSize = 100000;
let startTime = moment().format('mm:ss');
let entryID = 1;

let generateData = (db, callback) => {
  entryID===1? console.log('Start time: ', startTime) : null;

  let batch = []
  
  for (let i = 1 ; i <= batchSize; i++) {
    let newEntry = {
      "_id": entryID,
      "ProductTitle": faker.name.firstName(),
      "Manufacturer": faker.company.companyName(),
      "ListPrice": faker.commerce.price(),
      "OurPrice": faker.commerce.price(), 
      "StockStatus": faker.random.boolean(),
      "SoldBy": faker.company.catchPhrase(),
      "Description": faker.name.title(), 
      "Category": faker.name.prefix()
    }
    batch.push(newEntry)
    entryID++;
  }

  importData(db, batch, callback)
}

let importData = (db, batch, callback) => {
  db.insertMany(batch, {unordered: false})
    .then(() => {
      if (entryID < numEntries) {
        console.log(entryID/numEntries*100+'% Complete')
        generateData(db, callback)
      } else {
        console.log('End time: ', moment().format('mm:ss'))
        callback()
      }
    })
}

module.exports = {
  generateData: generateData
}

/*
1. Create a batch of batchSize objects inside of an array.
    [
      {_id: 11, ...},
      {}
    ]
2. Insert that into your mongoDB
// 3. If you haven't reached numEntries,
      4. start again at step 1

*/

