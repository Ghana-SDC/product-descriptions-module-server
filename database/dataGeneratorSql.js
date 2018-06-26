const fs = require('fs');
const faker = require('faker');
const pg = require('pg');

const dataGenerator = fs.createWriteStream('../testCSV.csv', {flags: 'a'});

function dataprocess() {
  for (let i = 1 ; i <= 1; i++) {
  //generate ONE piece of fake data
  //let fakeData = {'id': 1, 'ProductTitle': FakerProductTitle(), }
    // return faker.lorem.sentence()+"'"+','+"'"+faker.company.companyName()+"'"+','+faker.commerce.price()+','+faker.commerce.price()+','+"'"+faker.random.boolean()+"'"+','+"'"+faker.company.catchPhrase()+"'"+','+"'"+faker.company.catchPhrase()+"'"
    // +','+"'"+faker.commerce.department()+"'"+''
    return faker.name.firstName()+'%'+faker.company.companyName()+'%'+faker.commerce.price()+'%'+faker.commerce.price()+'%'+faker.random.boolean()+'%'+faker.company.catchPhrase()+'%'+faker.name.title()+'%'+faker.name.prefix();
  } 
}

const tenMillionData = (limit, callback) => {
  console.log('start ', new Date());

  const write = () => {
    let drained = true;
    do {
      limit--;
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

console.log(dataprocess())

// module.exports.dataGenerator = dataGenerator;

// const sql = fs.readFileSync('')

