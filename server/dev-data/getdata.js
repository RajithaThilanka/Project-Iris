// import { completedata } from "./final8.json"

// console.log(completedata.profileDescription)

import { json } from './final8.json';
import { writeFileSync } from 'fs';

const data = json.profileDescription;
writeFileSync("profileDescription.txt", data);
// console.log(json);