const fs = require('fs');
const faker = require('faker');
const pg = require('pg');
let entryID = -1;
const dataGenerator = fs.createWriteStream('../mongoSeed.csv', {flags: 'a'});

function dataprocess() {
  for (let i = 1 ; i <= 1; i++) {
  //generate ONE piece of fake data
  //let fakeData = {'id': 1, 'ProductTitle': FakerProductTitle(), }
    // return faker.lorem.sentence()+"'"+','+"'"+faker.company.companyName()+"'"+','+faker.commerce.price()+','+faker.commerce.price()+','+"'"+faker.random.boolean()+"'"+','+"'"+faker.company.catchPhrase()+"'"+','+"'"+faker.company.catchPhrase()+"'"
    // +','+"'"+faker.commerce.department()+"'"+''
    return JSON.stringify({
      "_id": entryID,
      "ProductTitle": faker.name.firstName(),
      "Manufacturer": faker.company.companyName(),
      "ListPrice": faker.commerce.price(),
      "OurPrice": faker.commerce.price(), 
      "StockStatus": faker.random.boolean(),
      "SoldBy": faker.company.catchPhrase(),
      "Description": faker.name.title(), 
      "Category": faker.name.prefix()
    }) 
  }
}

const tenMillionData = (limit, callback) => {
  console.log('start ', new Date());
//put in fs.truncate if you want to replace file on other file.
  fs.truncate('../mongoSeed.csv', 0, function(){})
  const write = () => {
    let drained = true;
    do {
      limit--;
      entryID++;
      if (limit === 0) {
        dataGenerator.write(dataprocess() + '\n', callback);
      } else {
        drained = dataGenerator.write(dataprocess() + '\n')
      }
    } while (limit > 0 && drained) {
      if (limit > 0) {
        dataGenerator.once('drain', write);
      }
    }
  }
  write();
};

tenMillionData(10000000, (err) => {
  if (err) console.log('error in details generator', err);
  dataGenerator.end();
  console.log('closed: ', new Date());
})

// console.log(dataprocess())

// module.exports.dataGenerator = dataGenerator;

// const sql = fs.readFileSync('')


//DATAGENERATOR BY BATCHES!
// const faker = require('faker');
// const moment = require('moment')
// const numEntries = 10000000;
// const batchSize = 100000;
// let startTime = moment().format('mm:ss');
// let entryID = 1;

// let generateData = (db, callback) => {
//   entryID===1? console.log('Start time: ', startTime) : null;

//   let batch = []
  
//   for (let i = 1 ; i <= batchSize; i++) {
//     let newEntry = {
//       "_id": entryID,
//       "ProductTitle": faker.name.firstName(),
//       "Manufacturer": faker.company.companyName(),
//       "ListPrice": faker.commerce.price(),
//       "OurPrice": faker.commerce.price(), 
//       "StockStatus": faker.random.boolean(),
//       "SoldBy": faker.company.catchPhrase(),
//       "Description": faker.name.title(), 
//       "Category": faker.name.prefix()
//     }
//     batch.push(newEntry)
//     entryID++;
//   }

//   importData(db, batch, callback)
// }

// let importData = (db, batch, callback) => {
//   db.insertMany(batch, {unordered: false})
//     .then(() => {
//       if (entryID < numEntries) {
//         console.log(entryID/numEntries*100+'% Complete')
//         generateData(db, callback)
//       } else {
//         console.log('End time: ', moment().format('mm:ss'))
//         callback()
//       }
//     })
// }

// module.exports = {
//   generateData: generateData
// }

/*
  Generator PseudoCode
1. Create a batch of batchSize objects inside of an array.
    [
      {_id: 11, ...},
      {}
    ]
2. Insert that into your mongoDB
// 3. If you haven't reached numEntries,
      4. start again at step 1

*/

