const mongoose = require('mongoose');
const fs = require('fs');

const User = require(`../models/userModel`);
const Answer = require('../models/answerModel');

const dotenv = require('dotenv');

dotenv.config({ path: '../config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

const Chat = require('../models/chatModel');
const Message = require('../models/messageModel');
const LookingFor = require('../models/lookingForModel');
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB Connection successful'));

const deleteDevData = async () => {
  try {
    // await Chat.deleteMany();
    // await Message.deleteMany();
    // await User.deleteMany();
    await LookingFor.deleteMany();
    // await Answer.deleteMany();
  } catch (error) {
    console.log(error);
  }
};

// deleteDevData();
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
// const deleteData = async () => {
//   try {
//     await User.deleteMany();

//     console.log('All data successfully deleted');
//     process.exit();
//   } catch (err) {
//     console.log(err);
//   }
// };

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

// const importData = async () => {
//   try {
//     const users = await User.find({});
//     const userIds = users.map(user => user._id);
//     const userFile = JSON.parse(
//       fs.readFileSync('./userLookingFor.json', 'utf-8')
//     );
//     const updated = userFile.map((user, index) => {
//       return { ...user, userId: userIds[index] };
//     });
//     fs.writeFileSync(
//       './updatedPassions.json',
//       JSON.stringify(updated),
//       'utf-8'
//     );
//     process.exit();
//   } catch (err) {
//     console.log(err);
//   }
// };

// importData();
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

const ids = JSON.parse(fs.readFileSync('./userIds.json', 'utf-8'));
const looking = JSON.parse(fs.readFileSync('./new.json', 'utf-8'));
// const updated = users.map((u, index) => {
//   return {
//     ...u,
//     profilePhoto: `http://localhost:5000/images/${u.profilePhoto}`,
//   };
// });
// // console.log(passions);
// fs.writeFileSync('./test.json', JSON.stringify(updated), 'utf-8');
const import_data = async () => {
  // await User.create(users, { validateBeforeSave: false });
  const updatedLooking = looking.map((p, i) => {
    return { ...p, userId: { $oid: `${ids[i]}` } };
  });
  fs.writeFileSync('./new.json', JSON.stringify(updatedLooking), 'utf-8');
  // await LookingFor.updateMany(
  //   {},
  //   {
  //     userId: mongoose.Types.ObjectId(this.userId),
  //   }
  // );
  console.log('done');
  // let users = await User.find({});
  // users = users.slice(10);
  // const ids = users.map((u, i) => {
  //   return u._id;
  // });
  // fs.writeFileSync('./userIds.json', JSON.stringify(ids), 'utf-8');
};
//     console.log('Data successfully loaded!');
// deleteDevData();
import_data();

// "_id": { "$oid":"dbfe53c3c4d568240378b0c6"}
