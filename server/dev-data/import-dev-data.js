const mongoose = require('mongoose');
const fs = require('fs');

const User = require(`../models/userModel`);

const dotenv = require('dotenv');

dotenv.config({ path: '../config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB Connection successful'));

// const updatedUsers = users.map(user => {
//   delete user.photos;
//   return { ...user, userDescription: 'Some random description' };
// });

// fs.writeFileSync('./final8.json', JSON.stringify(updatedUsers), 'utf-8');

// const assignIndex = async () => {
//   const updatedUsers = users.map((user, index) => {
//     return {
//       ...user,
//       index,
//     };
//   });
//   fs.writeFileSync('./final7.json', JSON.stringify(updatedUsers), 'utf-8');
// };
// const deleteData = async () => {
//   try {
//     await User.deleteMany();

//     console.log('All data successfully deleted');
//     process.exit();
//   } catch (err) {
//     console.log(err);
//   }
// };

const importData = async index => {
  try {
    const users = JSON.parse(
      fs.readFileSync(`./dataset-${index}.json`, 'utf-8')
    );
    await User.create(users, { validateBeforeSave: false });

    console.log('Data successfully loaded!');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

importData(0);

const divide = () => {
  for (i = 0; i < 66; i++) {
    const min = i * 100;
    const max = min + 100;
    const arr = users.slice(min, max);
    fs.writeFileSync(`dataset-${i}.json`, JSON.stringify(arr), 'utf-8');
  }
  process.exit();
};

// divide();

// for (i = 2; i <= 65; i++) {
//   console.log('beginning ' + i);
// importDataDev(31);
// 26
// console.log(`${i} completed`);
// console.log('called');
// }
// divide();
// console.log(users.length);
// deleteData();

// assignIndex();

// Add the user to the cluster when signing up
