const fs = require('fs');

const users = JSON.parse(fs.readFileSync('./final5.json', 'utf-8'));
const generate = (min, max) => Math.floor(Math.random() * (max - min) + min);
const languages = [
  'English',
  'Mandarin',
  'Hindi',
  'Spanish',
  'French',
  'Arabic',
  'Bengali',
  'Russian',
  'Portuguese',
  'Indonesian',
  'Urdu',
  'German',
];
const jobs = [
  'Accountant',
  'Actor',
  'Architect',
  'Astronomer',
  'Author',
  'Baker',
  'Bricklayer',
  'Driver',
  'Butcher',
  'Carpenter',
  'Chef',
  'Cleaner',
  'Dentist',
  'Designer',
  'Doctor',
  'Dustman',
  'Electrician',
  'Engineer',
  'Model',
];

const g = ['male', 'female'];
const mStatus = [
  'single',
  'married',
  'widowed',
  'separated',
  'divorced',
  'complicated',
];
const ethnicities = [
  'indian',
  'pakistani',
  'bangladeshi',
  'chinese',
  'sinhalese',
  'african',
  'english',
  'welsh',
  'scottish',
  'irish',
  'roman',
  'arab',
  'american',
  'canadian',
];
const education = ['highschool', 'college', 'bachelor', 'graduate'];
const updatedUsers = users.map(user => {
  //   const x = Math.floor(Math.random() * 30 + 18);
  //   const y = Math.floor(Math.random() * 80 + 31);
  //   const z = Math.round(Math.random());

  //   const feetMin = Math.floor(Math.random() * 8 + 4);
  //   const feetMax = Math.floor(Math.random() * 9 + 11);
  //   const inchMin = Math.floor(Math.random() * 10);
  //   const inchMax = Math.floor(Math.random() * 10);

  let year = generate(1980, 2003);
  let month = generate(1, 12);
  let day = generate(1, 30);

  const m = generate(0, mStatus.length);
  const e = generate(0, education.length);
  const eth = generate(0, ethnicities.length);
  const j = generate(0, jobs.length);

  if (Math.trunc(month / 10) === 0) {
    month = '0' + month;
  }
  if (Math.trunc(day / 10) === 0) {
    day = '0' + day;
  }
  delete user.lookingFor;
  delete user.selectedInterests;
  return {
    ...user,
    // lookingFor: {
    //   gender: g[z],
    //   ageRange: {
    //     minAge: x,
    //     maxAge: y,
    //   },
    //   height: {
    //     minHeight: [feetMin, inchMin],
    //     maxHeight: [feetMax, inchMax],
    //   },
    // },
    dob: `${year}-${month}-${day}`,
    maritalStatus: mStatus[m],
    educationLevel: education[e],
    ethnicity: ethnicities[eth],
    password: user.firstname + '123',
    passwordConfirm: user.firstname + '123',
    occupation: jobs[j],
  };
});

fs.writeFileSync('./final6.json', JSON.stringify(updatedUsers), 'utf-8');
