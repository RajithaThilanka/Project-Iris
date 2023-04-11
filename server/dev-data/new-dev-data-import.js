const mongoose = require('mongoose');
const fs = require('fs');

const User = require(`../models/userModel`);
const Answer = require('../models/answerModel');
const Date = require('../models/dateModel');

const dotenv = require('dotenv');

dotenv.config({ path: '../config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

const Chat = require('../models/chatModel');
const Message = require('../models/messageModel');
const LookingFor = require('../models/lookingForModel');
const Connection = require('../models/connectionsModel');
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB Connection successful'));

// const deleteDevData = async () => {
//   try {
//     // await Chat.deleteMany();
//     // await Message.deleteMany();
//     // await User.deleteMany();
//     // await LookingFor.deleteMany();
//     await Chat.deleteMany();
//     await Message.deleteMany();
//     await Connection.deleteMany();
//     await Date.deleteMany();
//     // await Answer.deleteMany();
//   } catch (error) {
//     console.log(error);
//   }
// };

// deleteDevData();
const generate = (min, max) => Math.floor(Math.random() * (max - min) + min);
// const urlsArr = [
//   'https://www.youtube.com/embed/a4M5HT3Poxo',
//   'https://www.youtube.com/embed/91lyHjYHgHQ',
//   'https://www.youtube.com/embed/-lkEOEEKYD0',
//   'https://www.youtube.com/embed/QDX-1M5Nj7s',
//   'https://www.youtube.com/embed/dOxlEwX9lbA',
//   'https://www.youtube.com/embed/6YaH04MZRmg',
// ];
// const users = JSON.parse(fs.readFileSync('./fianlLooking.json', 'utf-8'));
// const topUsers = JSON.parse(fs.readFileSync('./top.json', 'utf-8'));
// console.log(users.length);

// const newUsers = users.map((user, i) => {
//   const photoId1 = generate(0, 73);
//   const photoId2 = generate(0, 73);

//   const profilePicId = generate(0, 73);
//   return {
//     ...user,
//     profilePhoto: `user${profilePicId}.JPEG`,
//     active: true,
//     verified: true,
//     password: '$2a$12$m3NYg1ZMKVvoRKsrZ4W4g.rVsIvgrGomMiKFFlQDKAAZVyD2MBDSO',
//     passwordConfirm:
//       '$2a$12$m3NYg1ZMKVvoRKsrZ4W4g.rVsIvgrGomMiKFFlQDKAAZVyD2MBDSO',
//     isClustered: true,
//     callTag: user.lastname + ' ' + user.firstname[0] + '.',
//     index: i + 10,
//     suspended: false,
//     photos: [`user${photoId1}.JPEG`, `user${photoId2}.JPEG`],
//     urls: [
//       urlsArr[generate(0, urlsArr.length - 1)],
//       urlsArr[generate(0, urlsArr.length - 1)],
//       urlsArr[generate(0, urlsArr.length - 1)],
//     ],
//   };
// });

const ids = [
  '642fd8b46e6dd7ec95536eb1',
  '642fd8406e6dd7ec955355e9',
  '642fd8596e6dd7ec95535b15',
  '642fd8a46e6dd7ec95536baf',
  '642fd8406e6dd7ec955355c6',
  '642fd8106114eb4bc066411f',
  '642fd8106114eb4bc0664120',
  '642fd8a46e6dd7ec95536a70',
  '642fd8906e6dd7ec955366ef',
  '642fd8596e6dd7ec95535ca3',
  '642fd86d6e6dd7ec95535e20',
  '642fd8906e6dd7ec955365bf',
  '642fd8b46e6dd7ec95536e48',
  '642fd8596e6dd7ec95535ae5',
  '642fd8596e6dd7ec9553597e',
  '642fd8106114eb4bc066411c',
  '642fd8906e6dd7ec9553682d',
  '642fd8b46e6dd7ec95536cd1',
  '642fd8906e6dd7ec955365c9',
  '642fd8406e6dd7ec9553576d',
  '642fd87c6e6dd7ec955361e0',
  '642fd8a46e6dd7ec955369c7',
  '642fd86d6e6dd7ec95535e00',
  '642fd8406e6dd7ec955356c8',
  '642fd8b46e6dd7ec95536cdd',
  '642fd8906e6dd7ec95536758',
  '642fd8906e6dd7ec95536570',
  '642fd8406e6dd7ec95535552',
  '642fd8596e6dd7ec95535a90',
  '642fd8906e6dd7ec955366ce',
  '642fd8406e6dd7ec9553572b',
  '642fd86d6e6dd7ec95535e61',
  '642fd8406e6dd7ec9553554f',
  '642fd8a46e6dd7ec95536bd5',
  '642fd8406e6dd7ec95535555',
  '642fd8406e6dd7ec9553554d',
];

const names = [
  'Olivia',
  'Emma',
  'Charlotte',

  'Evelyn',
  'Harper',
  'Luna',
  'Camila',
  'Gianna',

  'Sofia',

  'Scarlett',
  'Emily',

  'Nora',
  'Hazel',
  'Madison',
  'Ellie',

  'Nova',
  'Isla',
  'Grace',
  'Violet',

  'Riley',
  'Zoey',
  'Willow',
  'Emilia',
  'Stella',
  'Zoe',

  'Addison',
  'Leah',
  'Lucy',
  'Eliana',
  'Ivy',
  'Everly',
  'Lillian',
  'Paisley',
  'Elena',

  'Maya',
  'Natalie',
  'Kinsley',
  'Delilah',
  'Claire',
  'Audrey',
  'Aaliyah',
  'Ruby',
  'Brooklyn',
  'Alice',
  'Aubrey',
  'Autumn',
  'Leilani',
  'Savannah',
  'Valentina',
  'Kennedy',
  'Madelyn',
  'Josephine',
  'Bella',
  'Skylar',
  'Genesis',
  'Sophie',
  'Hailey',
  'Sadie',
  'Natalia',
  'Quinn',
  'Caroline',
  'Allison',
  'Gabriella',

  'Serenity',
  'Nevaeh',
  'Cora',
  'Ariana',
  'Emery',
  'Lydia',
  'Jade',
  'Eva',
  'Adeline',
  'Madeline',
  'Piper',
  'Rylee',
  ,
  'Athena',
  'Peyton',
  'Everleigh',
  'Vivian',
  'Clara',
  'Raelynn',
  'Liliana',
  'Samantha',
  'Iris',
  'Ayla',
  'Eloise',
  'Lyla',
  'Eliza',
  'Hadley',
  'Melody',
  'Julia',
  'Parker',

  'Isabelle',
  'Brielle',
  'Adalynn',
  'Arya',
  'Eden',
  'Remi',
  'Mackenzie',
];
const updateData = () => {
  ids.forEach(async id => {
    const updated = await User.findByIdAndUpdate(id, {
      profilePhoto: `pic${generate(84, 193)}.jpg`,
      photos: [
        `pic${generate(84, 193)}.jpg`,
        `pic${generate(84, 193)}.jpg`,
        `pic${generate(84, 193)}.jpg`,
      ],
      gender: 'female',
      firstname: names[generate(0, names.length)],
      lastname: names[generate(0, names.length)],
    });
  });
};

updateData();
