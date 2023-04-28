const fs = require('fs');
const languages = [
  'Abkhazian',
  'Afar',
  'Afrikaans',
  'Akan',
  'Albanian',
  'Amharic',
  'Arabic',
  'Armenian',
  'Assamese',
  'Awadhi',
  'Aymara',
  'Azerbaijani',
  'Balochi',
  'Bashkir',
  'Basque',
  'Belarussian',
  'Bengali',
  'Bhojpuri',
  'Bhutani',
  'Bihari',
  'Bislama',
  'Breton',
  'Bulgarian',
  'Burmese',
  'Catalan',
  'Cebuano',
  'Chechen',
  'Chinese',
  'Corsican',
  'Croatian',
  'Czech',
  'Dakhini',
  'Danish',
  'Dutch',
  'English',
  'Esperanto',
  'Estonian',
  'Faeroese',
  'Fiji',
  'Finnish',
  'French',
  'Frisian',
  'Galician',
  'Georgian',
  'German',
  'Greek',
  'Greenlandic',
  'Guarani',
  'Gujarati',
  'Haitian Creole',
  'Hausa',
  'Hebrew',
  'Hindi',
  'Hungarian',
  'Icelandic',
  'Indonesian',
  'Interlingua',
  'Interlingue',
  'Inupiak',
  'Irish',
  'Italian',
  'Japanese',
  'Javanese',
  'Kabyle',
  'Kannada',
  'Kashmiri',
  'Kazakh',
  'Khmer',
  'Kinyarwanda',
  'Kirghiz',
  'Kirundi',
  'Konkani',
  'Korean',
  'Kurdish',
  'Laothian',
  'Latin',
  'Latvian',
  'Lingala',
  'Lithuanian',
  'Lombard',
  'Luxembourgish',
  'Macedonian',
  'Maithili',
  'Makhuwa',
  'Malagasy',
  'Malay',
  'Malayalam',
  'Maltese',
  'Maori',
  'Marathi',
  'Marwari',
  'Moldavian',
  'Mongolian',
  'Nauru',
  'Nepali',
  'Norwegian',
  'Occitan',
  'Oriya',
  'Oromo',
  'Pashto',
  'Persian',
  'Polish',
  'Portuguese',
  'Punjabi',
  'Quechua',
  'Rhaeto-Romance',
  'Rifian',
  'Romanian',
  'Russian',
  'Samoan',
  'Sangro',
  'Sanskrit',
  'Scottish Gaelic',
  'Serbian',
  'Serbo-Croatian',
  'Sesotho',
  'Setswana',
  'Shona',
  'Sindhi',
  'Sinhalese',
  'Siswati',
  'Slovak',
  'Slovenian',
  'Somali',
  'Spanish',
  'Sundanese',
  'Swahili',
  'Swedish',
  'Tagalog',
  'Tajik',
  'Tamazight',
  'Tamil',
  'Tatar',
  'Telugu',
  'Thai',
  'Tibetan',
  'Tigrinya',
  'Tonga',
  'Tsonga',
  'Tuareg',
  'Turkish',
  'Turkmen',
  'Twi',
  'Ukrainian',
  'Urdu',
  'Uyghur',
  'Uzbek',
  'Vietnamese',
  'Volapuk',
  'Welsh',
  'Wolof',
  'Xhosa',
  'Yiddish',
  'Yoruba',
  'Zulu',
];

const arr = JSON.parse(fs.readFileSync('./occupations.json', 'utf-8'));

arr.sort(function (a, b) {
  return ('' + a).localeCompare(b);
});

fs.writeFileSync('./occupations.json', JSON.stringify(arr), 'utf-8');
