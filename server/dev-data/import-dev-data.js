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

const generate = (min, max) => Math.floor(Math.random() * (max - min) + min);
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
const deleteData = async () => {
  try {
    await User.deleteMany();

    console.log('All data successfully deleted');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

const countries = [
  'Sri Lanka',
  'India',
  'Pakistan',
  'Bangladesh',
  'China',
  'Japan',
  'South Africa',
  'Maldives',
  'USA',
  'UK',
  'Russia',
];

// const prepareData = () => {
//   const updatedUsers = users.map((user, index) => {
//     delete user.profileDescription;
//     delete user.movies;
//     delete user.music;
//     delete user.politics;
//     delete user.socialMedia;
//     delete user.sports;
//     delete user.maritalStatus;
//     user.height = user.height[0] + user.height[1] / 10;
//     user.country = countries[generate(0, countries.length)];
//     user.profilePhoto = `pic${index}.jpg`;
//     user.userDescription = `Hello world, I'm ${user.firstname} from ${user.country}. I'm looking for a partner with whom I can share my life and feelings with. Don't be creepy. Feel free to send me a message. Good bless you people.`;
//     user.verified = true;
//     return user;
//   });
//   console.log(users);
//   fs.writeFileSync('./updatedFinalUsers.json', JSON.stringify(updatedUsers));
//   process.exit();
// };

// prepareData();
// deleteData();

const importData = async () => {
  try {
    const users = await User.find({});
    const userIds = users.map(user => user._id);
    const userFile = JSON.parse(
      fs.readFileSync('./userLookingFor.json', 'utf-8')
    );
    const updated = userFile.map((user, index) => {
      return { ...user, userId: userIds[index] };
    });
    fs.writeFileSync(
      './updatedPassions.json',
      JSON.stringify(updated),
      'utf-8'
    );
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

importData();
// const userLookingFor = users.map(user => {
//   const { movies, music, politics, socialMedia, sports, profileDescription } =
//     user;
//   return { movies, music, politics, socialMedia, sports, profileDescription };
// });

// console.log(userLookingFor);
// fs.writeFileSync(
//   './userLookingFor.json',
//   JSON.stringify(userLookingFor),
//   'utf-8'
// );
// const lookingForData = async () => {
//   try {
//     await User.create(users, { validateBeforeSave: false });
//     console.log('Data successfully loaded!');
//     process.exit();
//   } catch (err) {
//     console.log(err);
//   }
// };

// importData();

// const divide = () => {
//   for (i = 0; i < 66; i++) {
//     const min = i * 100;
//     const max = min + 100;
//     const arr = users.slice(min, max);
//     fs.writeFileSync(`dataset-${i}.json`, JSON.stringify(arr), 'utf-8');
//   }
//   process.exit();
// };

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
