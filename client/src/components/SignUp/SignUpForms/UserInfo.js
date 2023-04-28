import {
  Box,
  Button,
  FilledInput,
  FormControl,
  FormHelperText,
  FormLabel,
  InputAdornment,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { signupUserInfo } from "../../../api/AuthRequests";

import { getCountries } from "../../../api/CountryRequest";

import MultipleSelectChip from "../../UIComponents/MultipleSelectChip";
import { StyledFormControlLabel } from "../../UIComponents/Radio";

function UserInfo() {
  const {
    state: { id },
  } = useLocation();

  const [formData, setData] = useState({
    gender: "male",
    country: "",
    dob: "",
    languages: [],
    occupation: "",
    educationLevel: "",
    monthlyIncome: "",
    hasChildren: false,
    religion: "",
    ethnicity: "",
    ft: 0,
    in: 0,
    userId: id,
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setData({ ...formData, height: formData.ft + formData.in * 0.0833333 });

    try {
      const {
        data: {
          data: { data },
        },
      } = await signupUserInfo(formData);
      navigate(`/auth/signup/profileview-info`, {
        replace: true,
        state: {
          id: data._id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    const getAllCountries = async () => {
      try {
        const { data } = await getCountries();
        let c = data;
        c.sort(function (a, b) {
          return ("" + a.name.common).localeCompare(b.name.common);
        });
        setCountries(c);
      } catch (err) {
        console.log(err);
      }
    };
    getAllCountries();
  }, []);

  const languages = [
    "Abkhazian",
    "Afar",
    "Afrikaans",
    "Akan",
    "Albanian",
    "Amharic",
    "Arabic",
    "Armenian",
    "Assamese",
    "Awadhi",
    "Aymara",
    "Azerbaijani",
    "Balochi",
    "Bashkir",
    "Basque",
    "Belarussian",
    "Bengali",
    "Bhojpuri",
    "Bhutani",
    "Bihari",
    "Bislama",
    "Breton",
    "Bulgarian",
    "Burmese",
    "Catalan",
    "Cebuano",
    "Chechen",
    "Chinese",
    "Corsican",
    "Croatian",
    "Czech",
    "Dakhini",
    "Danish",
    "Dutch",
    "English",
    "Esperanto",
    "Estonian",
    "Faeroese",
    "Fiji",
    "Finnish",
    "French",
    "Frisian",
    "Galician",
    "Georgian",
    "German",
    "Greek",
    "Greenlandic",
    "Guarani",
    "Gujarati",
    "Haitian Creole",
    "Hausa",
    "Hebrew",
    "Hindi",
    "Hungarian",
    "Icelandic",
    "Indonesian",
    "Interlingua",
    "Interlingue",
    "Inupiak",
    "Irish",
    "Italian",
    "Japanese",
    "Javanese",
    "Kabyle",
    "Kannada",
    "Kashmiri",
    "Kazakh",
    "Khmer",
    "Kinyarwanda",
    "Kirghiz",
    "Kirundi",
    "Konkani",
    "Korean",
    "Kurdish",
    "Laothian",
    "Latin",
    "Latvian",
    "Lingala",
    "Lithuanian",
    "Lombard",
    "Luxembourgish",
    "Macedonian",
    "Maithili",
    "Makhuwa",
    "Malagasy",
    "Malay",
    "Malayalam",
    "Maltese",
    "Maori",
    "Marathi",
    "Marwari",
    "Moldavian",
    "Mongolian",
    "Nauru",
    "Nepali",
    "Norwegian",
    "Occitan",
    "Oriya",
    "Oromo",
    "Pashto",
    "Persian",
    "Polish",
    "Portuguese",
    "Punjabi",
    "Quechua",
    "Rhaeto-Romance",
    "Rifian",
    "Romanian",
    "Russian",
    "Samoan",
    "Sangro",
    "Sanskrit",
    "Scottish Gaelic",
    "Serbian",
    "Serbo-Croatian",
    "Sesotho",
    "Setswana",
    "Shona",
    "Sindhi",
    "Sinhalese",
    "Siswati",
    "Slovak",
    "Slovenian",
    "Somali",
    "Spanish",
    "Sundanese",
    "Swahili",
    "Swedish",
    "Tagalog",
    "Tajik",
    "Tamazight",
    "Tamil",
    "Tatar",
    "Telugu",
    "Thai",
    "Tibetan",
    "Tigrinya",
    "Tonga",
    "Tsonga",
    "Tuareg",
    "Turkish",
    "Turkmen",
    "Twi",
    "Ukrainian",
    "Urdu",
    "Uyghur",
    "Uzbek",
    "Vietnamese",
    "Volapuk",
    "Welsh",
    "Wolof",
    "Xhosa",
    "Yiddish",
    "Yoruba",
    "Zulu",
  ];
  const occupations = [
    "  Child, Family, and School Social Worker",
    "Cytogenetic Technologist",
    "Cytotechnologist",
    "Dental Hygienist",
    "Dentist, All Other Specialist",
    "Dentist, General",
    "Dermatologist",
    "Diagnostic Medical Sonographer",
    "Librarians",
    "Library Science Teachers, Postsecondary",
    "Library Technician",
    "Accountant",
    "Accountants and Auditor",
    "Actor",
    "Acupuncturists",
    "Acute Care Nurses",
    "Adapted Physical Education Specialists",
    "Adhesive Bonding Machine Operators and Tenders",
    "Administrative Law Judges, Adjudicators, and Hearing Officers",
    "Administrative Services Managers",
    "Adult Basic and Secondary Education and Literacy Teachers and Instructors",
    "Advanced Practice Psychiatric Nurses",
    "Advertising and Promotions Managers",
    "Advertising Sales Agents",
    "Aerospace Engineer",
    "Aerospace Engineering and Operations Technician",
    "Agent and Business Manager of Artists, Performers, and Athletes",
    "Agricultural and Food Science Technicians",
    "Agricultural Engineer",
    "Agricultural Equipment Operators",
    "Agricultural Inspectors",
    "Agricultural Sciences Teachers, Postsecondary",
    "Agricultural Technicians",
    "Agricultural Workers, All Other",
    "Air Crew Member",
    "Air Crew Officer",
    "Aircraft Launch and Recovery Officers",
    "Aircraft Launch and Recovery Specialists",
    "Aircraft Mechanics and Service Technicians",
    "Aircraft Structure, Surfaces, Rigging, and Systems Assemblers",
    "Allergists and Immunologists",
    "Amusement and Recreation Attendants",
    "Anesthesiologist Assistants",
    "Anesthesiologists",
    "Animal Breeders",
    "Animal Control Workers",
    "Animal Scientists",
    "Animal Trainers",
    "Anthropologists",
    "Anthropologists and Archeologists",
    "Anthropology and Archeology Teachers, Postsecondary",
    "Appraiser",
    "Appraisers and Assessors of Real Estate",
    "Aquacultural Managers",
    "Arbitrators, Mediators, and Conciliators",
    "Archeologists",
    "Architect",
    "Architectural and Civil Drafter",
    "Architectural and Engineering Managers",
    "Architectural Drafter",
    "Architecture Teachers, Postsecondary",
    "Archivists",
    "Area, Ethnic, and Cultural Studies Teachers, Postsecondary",
    "Armored Assault Vehicle Crew Members",
    "Armored Assault Vehicle Officers",
    "Arrangers",
    "Art Director",
    "Art Therapists",
    "Art, Drama, and Music Teachers, Postsecondary",
    "Artillery and Missile Crew Members",
    "Artillery and Missile Officers",
    "Artist or Related Worker",
    "Assemblers and Fabricators, All Other",
    "Assessors",
    "Astronomers",
    "Athlete",
    "Athletic Trainers",
    "Atmospheric and Space Scientists",
    "Atmospheric, Earth, Marine, and Space Sciences Teachers, Postsecondary",
    "Audio and Video Equipment Technician",
    "Audio-Visual and Multimedia Collections Specialists",
    "Audiologists",
    "Auditor",
    "Automotive Body and Related Repairers",
    "Automotive Engineer",
    "Automotive Engineering Technician",
    "Automotive Glass Installers and Repairers",
    "Automotive Master Mechanics",
    "Automotive Service Technicians and Mechanics",
    "Automotive Specialty Technicians",
    "Avionics Technicians",
    "Baggage Porters and Bellhops",
    "Bailiffs",
    "Bakers",
    "Barbers",
    "Baristas",
    "Bartenders",
    "Bicycle Repairers",
    "Bill and Account Collectors",
    "Billing and Posting Clerks",
    "Billing, Cost, and Rate Clerks",
    "Biochemical Engineer",
    "Biochemists and Biophysicists",
    "Biofuels Processing Technicians",
    "Biofuels Production Managers",
    "Biofuels/Biodiesel Technology and Product Development Managers",
    "Bioinformatics Scientists",
    "Bioinformatics Technicians",
    "Biological Science Teachers, Postsecondary",
    "Biological Scientists, All Other",
    "Biological Technicians",
    "Biologists",
    "Biomass Plant Technicians",
    "Biomass Power Plant Managers",
    "Biomedical Engineer",
    "Biostatisticians",
    "Boilermaker",
    "Bookkeeping, Accounting, and Auditing Clerks",
    "Brickmason and Blockmason",
    "Broadcast News Analyst",
    "Broadcast Technician",
    "Brokerage Clerks",
    "Brownfield Redevelopment Specialists and Site Managers",
    "Budget Analyst",
    "Building Cleaning Worker",
    "Bus and Truck Mechanics and Diesel Engine Specialists",
    "Business Continuity Planner",
    "Business Intelligence Analyst",
    "Business Operations Specialist",
    "Business Teachers, Postsecondary",
    "Butchers and Meat Cutters",
    "Buyers and Purchasing Agent",
    "Cabinetmakers and Bench Carpenters",
    "Camera and Photographic Equipment Repairers",
    "Camera Operator",
    "Cardiovascular Technologists and Technicians",
    "Career/Technical Education Teachers, Middle School",
    "Career/Technical Education Teachers, Secondary School",
    "Cargo and Freight Agents",
    "Carpenter",
    "Carpet Installer",
    "Cartographers and Photogrammetrist",
    "Cashiers",
    "Cement Mason and Concrete Finisher",
    "Chefs and Head Cooks",
    "Chemical Engineer",
    "Chemical Equipment Operators and Tenders",
    "Chemical Plant and System Operators",
    "Chemical Technicians",
    "Chemistry Teachers, Postsecondary",
    "Chemists",
    "Chief Executives",
    "Chief Sustainability Officers",
    "Childcare Workers",
    "Chiropractors",
    "Choreographer",
    "City and Regional Planning Aides",
    "Civil Drafter",
    "Civil Engineer",
    "Civil Engineering Technician",
    "Claims Adjuster, Examiners, and Investigator",
    "Claims Examiner of Property and Casualty Insurance",
    "Cleaner",
    "Cleaning, Washing, and Metal Pickling Equipment Operators and Tenders",
    "Climate Change Analysts",
    "Clinical Data Manager",
    "Clinical Nurse Specialists",
    "Clinical Psychologists",
    "Clinical Research Coordinators",
    "Clinical, Counseling, and School Psychologists",
    "Coach",
    "Coating, Painting, and Spraying Machine Setters, Operators, and Tenders",
    "Coil Winders, Tapers, and Finishers",
    "Coin, Vending, and Amusement Machine Servicers and Repairers",
    "Combined Food Preparation and Serving Workers, Including Fast Food",
    "Command and Control Center Officers",
    "Command and Control Center Specialists",
    "Commercial and Industrial Designer",
    "Commercial Divers",
    "Communications Equipment Operators, All Other",
    "Communications Teachers, Postsecondary",
    "Community and Social Service Specialist",
    "Community Health Worker",
    "Compensation and Benefits Managers",
    "Compensation, Benefits, and Job Analysis Specialist",
    "Compliance Managers",
    "Compliance Officer",
    "Computer and Information Research Scientist",
    "Computer and Information Systems Managers",
    "Computer Hardware Engineer",
    "Computer Network Architect",
    "Computer Network Support Specialist",
    "Computer Numerically Controlled Machine Tool Programmers, Metal and Plastic",
    "Computer Occupation",
    "Computer Operators",
    "Computer Programmer",
    "Computer Science Teachers, Postsecondary",
    "Computer Systems Analyst",
    "Computer Systems Engineer/Architect",
    "Computer User Support Specialist",
    "Computer-Controlled Machine Tool Operators, Metal and Plastic",
    "Computer, Automated Teller, and Office Machine Repairers",
    "Concierges",
    "Conservation Scientists",
    "Construction and Building Inspector",
    "Construction and Related Worker",
    "Construction Carpenter",
    "Construction Laborer",
    "Construction Managers",
    "Continuous Mining Machine Operator",
    "Control and Valve Installers and Repairers, Except Mechanical Door",
    "Cooks, All Other",
    "Cooks, Fast Food",
    "Cooks, Institution and Cafeteria",
    "Cooks, Private Household",
    "Cooks, Restaurant",
    "Cooks, Short Order",
    "Cooling and Freezing Equipment Operators and Tenders",
    "Copy Writer",
    "Coroner",
    "Correctional Officers and Jailers",
    "Correspondence Clerks",
    "Correspondent",
    "Cost Estimator",
    "Costume Attendants",
    "Counseling Psychologists",
    "Counselor",
    "Counter and Rental Clerks",
    "Counter Attendants, Cafeteria, Food Concession, and Coffee Shop",
    "Couriers and Messengers",
    "Court Clerks",
    "Court Reporters",
    "Court, Municipal, and License Clerks",
    "Craft Artist",
    "Creative Writer",
    "Credit Analyst",
    "Credit Authorizers",
    "Credit Authorizers, Checkers, and Clerks",
    "Credit Checkers",
    "Credit Counselor",
    "Criminal Investigators and Special Agents",
    "Criminal Justice and Law Enforcement Teachers, Postsecondary",
    "Critical Care Nurses",
    "Crossing Guards",
    "Crushing, Grinding, and Polishing Machine Setters, Operators, and Tenders",
    "Curators",
    "Customer Service Representatives",
    "Customs Broker",
    "Cutters and Trimmers, Hand",
    "Cutting and Slicing Machine Setters, Operators, and Tenders",
    "Cutting, Punching, and Press Machine Setters, Operators, and Tenders, Metal and Plastic",
    "Dancer",
    "Data Entry Keyers",
    "Data Warehousing Specialist",
    "Database Administrator",
    "Database Architect",
    "Demonstrators and Product Promoters",
    "Dental Assistants",
    "Dental Laboratory Technicians",
    "Derrick Operator, Oil and Gas",
    "Designer",
    "Desktop Publishers",
    "Detectives and Criminal Investigators",
    "Dietetic Technicians",
    "Dietitians and Nutritionists",
    "Dining Room and Cafeteria Attendants and Bartender Helpers",
    "Director",
    "Director, Religious Activities and Education",
    "Dishwashers",
    "Dispatchers, Except Police, Fire, and Ambulance",
    "Distance Learning Coordinators",
    "Document Management Specialist",
    "Door-To-Door Sales Workers, News and Street Vendors, and Related Workers",
    "Drafter",
    "Drilling and Boring Machine Tool Setters, Operators, and Tenders, Metal and Plastic",
    "Drywall and Ceiling Tile Installer",
    "Earth Driller, Except Oil and Gas",
    "Economics Teachers, Postsecondary",
    "Economists",
    "Editor",
    "Education Administrators, All Other",
    "Education Administrators, Elementary and Secondary School",
    "Education Administrators, Postsecondary",
    "Education Administrators, Preschool and Childcare Center/Program",
    "Education Teachers, Postsecondary",
    "Education, Training, and Library Workers, All Other",
    "Educational, Guidance, School, and Vocational Counselor",
    "Electric Motor, Power Tool, and Related Repairers",
    "Electrical and Electronic Engineering Technician",
    "Electrical and Electronic Equipment Assemblers",
    "Electrical and Electronics Drafter",
    "Electrical and Electronics Installers and Repairers, Transportation Equipment",
    "Electrical and Electronics Repairers, Commercial and Industrial Equipment",
    "Electrical and Electronics Repairers, Powerhouse, Substation, and Relay",
    "Electrical Drafter",
    "Electrical Engineer",
    "Electrical Engineering Technician",
    "Electrical Engineering Technologist",
    "Electrical Power-Line Installers and Repairers",
    "Electrician",
    "Electro-Mechanical Technician",
    "Electromechanical Engineering Technologist",
    "Electromechanical Equipment Assemblers",
    "Electronic Drafter",
    "Electronic Equipment Installers and Repairers, Motor Vehicles",
    "Electronic Home Entertainment Equipment Installers and Repairers",
    "Electronics Engineering Technician",
    "Electronics Engineering Technologist",
    "Electronics Engineers",
    "Elementary School Teachers, Except Special Education",
    "Elevator Installer and Repairer",
    "Eligibility Interviewers, Government Programs",
    "Embalmers",
    "Emergency Management Directors",
    "Emergency Medical Technicians and Paramedics",
    "Endoscopy Technicians",
    "Energy Auditor",
    "Energy Brokers",
    "Energy Engineer",
    "Engine and Other Machine Assemblers",
    "Engineer",
    "Engineering Teachers, Postsecondary",
    "Engineering Technicians",
    "English Language and Literature Teachers, Postsecondary",
    "Entertainer",
    "Entertainment Attendants and Related Workers, All Other",
    "Environmental Compliance Inspector",
    "Environmental Economists",
    "Environmental Engineer",
    "Environmental Engineering Technician",
    "Environmental Restoration Planners",
    "Environmental Science and Protection Technicians, Including Health",
    "Environmental Science Teachers, Postsecondary",
    "Environmental Scientists and Specialists, Including Health",
    "Epidemiologists",
    "Equal Opportunity Representatives and Officer",
    "Etchers and Engravers",
    "Executive Secretaries and Executive Administrative Assistants",
    "Exercise Physiologists",
    "Explosives Workers, Ordnance Handling Experts, and Blasters",
    "Extraction Workers, All Other",
    "Extruding and Drawing Machine Setters, Operators, and Tenders, Metal and Plastic",
    "Extruding and Forming Machine Setters, Operators, and Tenders, Synthetic and Glass Fibers",
    "Extruding, Forming, Pressing, and Compacting Machine Setters, Operators, and Tenders",
    "Fabric and Apparel Patternmakers",
    "Fabric Menders, Except Garment",
    "Fallers",
    "Family and General Practitioners",
    "Farm and Home Management Advisors",
    "Farm and Ranch Managers",
    "Farm Equipment Mechanics and Service Technicians",
    "Farm Labor Contractor",
    "Farmers, Ranchers, and Other Agricultural Managers",
    "Farmworkers and Laborers, Crop",
    "Farmworkers and Laborers, Crop, Nursery, and Greenhouse",
    "Farmworkers, Farm, Ranch, and Aquacultural Animals",
    "Fashion Designer",
    "Fence Erectors",
    "Fiberglass Laminators and Fabricators",
    "File Clerks",
    "Film and Video Editor",
    "Financial Analyst",
    "Financial Clerks, All Other",
    "Financial Examiner",
    "Financial Managers",
    "Financial Managers, Branch or Department",
    "Financial Quantitative Analyst",
    "Financial Specialist",
    "Fire Inspectors",
    "Fire Inspectors and Investigators",
    "Fire Investigators",
    "Fire-Prevention and Protection Engineer",
    "Firefighters",
    "First-Line Supervisor of Housekeeping",
    "First-Line Supervisors of Agricultural Crop and Horticultural Workers",
    "First-Line Supervisors of Air Crew Members",
    "First-Line Supervisors of All Other Tactical Operations Specialists",
    "First-Line Supervisors of Animal Husbandry and Animal Care Workers",
    "First-Line Supervisors of Aquacultural Workers",
    "First-Line Supervisors of Construction Trades and Extraction Workers",
    "First-Line Supervisors of Correctional Officers",
    "First-Line Supervisors of Farming, Fishing, and Forestry Workers",
    "First-Line Supervisors of Fire Fighting and Prevention Workers",
    "First-Line Supervisors of Food Preparation and Serving Workers",
    "First-Line Supervisors of Landscaping, Lawn Service",
    "First-Line Supervisors of Logging Workers",
    "First-Line Supervisors of Mechanics, Installers, and Repairers",
    "First-Line Supervisors of Non-Retail Sales Workers",
    "First-Line Supervisors of Office and Administrative Support Workers",
    "First-Line Supervisors of Personal Service Workers",
    "First-Line Supervisors of Police and Detectives",
    "First-Line Supervisors of Production and Operating Workers",
    "First-Line Supervisors of Protective Service Workers, All Other",
    "First-Line Supervisors of Retail Sales Workers",
    "First-Line Supervisors of Weapons Specialists/Crew Members",
    "Fish and Game Wardens",
    "Fishers and Related Fishing Workers",
    "Fitness and Wellness Coordinators",
    "Fitness Trainers and Aerobics Instructors",
    "Floor Layers, Except Carpet, Wood, and Hard Tiles",
    "Floor Sanders and Finishers",
    "Floral Designer",
    "Food and Tobacco Roasting, Baking, and Drying Machine Operators and Tenders",
    "Food Batchmakers",
    "Food Cooking Machine Operators and Tenders",
    "Food Preparation and Serving Related Workers, All Other",
    "Food Preparation Workers",
    "Food Processing Workers, All Other",
    "Food Science Technicians",
    "Food Scientists and Technologists",
    "Food Servers, Nonrestaurant",
    "Food Service Managers",
    "Foreign Language and Literature Teachers, Postsecondary",
    "Forensic Science Technicians",
    "Forest and Conservation Technicians",
    "Forest and Conservation Workers",
    "Forest Fire Fighting and Prevention Supervisors",
    "Forest Fire Inspectors and Prevention Specialists",
    "Forest Firefighters",
    "Foresters",
    "Forestry and Conservation Science Teachers, Postsecondary",
    "Forging Machine Setters, Operators, and Tenders, Metal and Plastic",
    "Foundry Mold and Coremakers",
    "Fraud Examiner, Investigator and Analyst",
    "Freight Forwarders",
    "Fuel Cell Engineer",
    "Fuel Cell Technician",
    "Fundraiser",
    "Funeral Attendants",
    "Funeral Service Managers",
    "Furnace, Kiln, Oven, Drier, and Kettle Operators and Tenders",
    "Furniture Finishers",
    "Gaming and Sports Book Writers and Runners",
    "Gaming Cage Workers",
    "Gaming Change Persons and Booth Cashiers",
    "Gaming Dealers",
    "Gaming Managers",
    "Gaming Service Workers, All Other",
    "Gaming Supervisors",
    "Gaming Surveillance Officers and Gaming Investigators",
    "Gas Plant Operators",
    "Gem and Diamond Workers",
    "General and Operations Managers",
    "Genetic Counselors",
    "Geneticists",
    "Geodetic Surveyor",
    "Geographers",
    "Geographic Information Systems Technician",
    "Geography Teachers, Postsecondary",
    "Geological and Petroleum Technicians",
    "Geological Sample Test Technicians",
    "Geophysical Data Technicians",
    "Geoscientists, Except Hydrologists and Geographers",
    "Geospatial Information Scientists and Technologist",
    "Geothermal Production Managers",
    "Geothermal Technicians",
    "Glass Blowers, Molders, Benders, and Finishers",
    "Glaziers",
    "Government Property Inspector and Investigator",
    "Graders and Sorters, Agricultural Products",
    "Graduate Teaching Assistants",
    "Graphic Designer",
    "Green Marketers",
    "Grinding and Polishing Workers, Hand",
    "Grinding, Lapping, Polishing, and Buffing Machine Tool Setters, Operators, and Tenders, Metal and Plastic",
    "Grounds Maintenance Worker",
    "Hairdressers, Hairstylists, and Cosmetologists",
    "Hazardous Materials Removal Workers",
    "Health and Safety Engineers",
    "Health Diagnosing and Treating Practitioners, All Other",
    "Health Educator",
    "Health Specialties Teachers, Postsecondary",
    "Health Technologists and Technicians, All Other",
    "Healthcare Practitioners and Technical Workers, All Other",
    "Healthcare Social Worker",
    "Healthcare Support Workers, All Other",
    "Hearing Aid Specialists",
    "Heat Treating Equipment Setters, Operators, and Tenders, Metal and Plastic",
    "Heating and Air Conditioning Mechanics and Installers",
    "Heating, Air Conditioning, and Refrigeration Mechanics and Installers",
    "Helpers--Brickmasons, Blockmasons, Stonemasons, and Tile and Marble Setters",
    "Helpers--Carpenters",
    "Helpers--Electricians",
    "Helpers--Extraction Workers",
    "Helpers--Installation, Maintenance, and Repair Workers",
    "Helpers--Painters, Paperhangers, Plasterers, and Stucco Masons",
    "Helpers--Pipelayers, Plumbers, Pipefitters, and Steamfitters",
    "Helpers--Production Workers",
    "Helpers--Roofers",
    "Helpers, Construction Trades, All Other",
    "Highway Maintenance Workers",
    "Historians",
    "History Teachers, Postsecondary",
    "Histotechnologists and Histologic Technicians",
    "Home Appliance Repairers",
    "Home Economics Teachers, Postsecondary",
    "Home Health Aides",
    "Hospitalists",
    "Hosts and Hostesses, Restaurant, Lounge, and Coffee Shop",
    "Hotel, Motel, and Resort Desk Clerks",
    "Housekeeping Cleaner",
    "Human Factors Engineer and Ergonomist",
    "Human Resources Assistants, Except Payroll and Timekeeping",
    "Human Resources Managers",
    "Human Resources Specialist",
    "Hunters and Trappers",
    "Hydroelectric Plant Technicians",
    "Hydroelectric Production Managers",
    "Hydrologists",
    "Illustrator",
    "Immigration and Customs Inspectors",
    "Industrial Ecologists",
    "Industrial Engineer",
    "Industrial Engineering Technician",
    "Industrial Engineering Technologist",
    "Industrial Machinery Mechanics",
    "Industrial Production Managers",
    "Industrial Safety and Health Engineer",
    "Industrial-Organizational Psychologists",
    "Infantry",
    "Infantry Officers",
    "Informatics Nurse Specialist",
    "Information and Record Clerks, All Other",
    "Information Security Analyst",
    "Information Technology Project Manager",
    "Inspectors, Testers, Sorters, Samplers, and Weighers",
    "Installation, Maintenance, and Repair Workers, All Other",
    "Instructional Coordinators",
    "Instructional Designers and Technologists",
    "Insulation Worker, Mechanical",
    "Insulation Workers, Floor, Ceiling, and Wall",
    "Insurance Adjuster, Examiner, and Investigator",
    "Insurance Appraiser",
    "Insurance Claims and Policy Processing Clerks",
    "Insurance Claims Clerks",
    "Insurance Policy Processing Clerks",
    "Insurance Sales Agents",
    "Insurance Underwriter",
    "Intelligence Analysts",
    "Interior Designer",
    "Internists, General",
    "Interpreter and Translator",
    "Interviewers, Except Eligibility and Loan",
    "Investment Fund Managers",
    "Investment Underwriter",
    "Janitorial Worker",
    "Jewelers",
    "Jewelers and Precious Stone and Metal Workers",
    "Judges, Magistrate Judges, and Magistrates",
    "Judicial Law Clerks",
    "Kindergarten Teachers, Except Special Education",
    "Labor Relations Specialist",
    "Landscape Architect",
    "Landscaping and Groundskeeping Worker",
    "Lathe and Turning Machine Tool Setters, Operators, and Tenders, Metal and Plastic",
    "Laundry and Dry-Cleaning Workers",
    "Law Teachers, Postsecondary",
    "Lawyers",
    "Layout Workers, Metal and Plastic",
    "Legal Secretaries",
    "Legal Support Workers, All Other",
    "Legislators",
    "Library Assistants, Clerical",
    "License Clerks",
    "Licensed Practical and Licensed Vocational Nurses",
    "Licensing Examiners and Inspector",
    "Life Scientists, All Other",
    "Life, Physical, and Social Science Technicians, All Other",
    "Lifeguards, Ski Patrol, and Other Recreational Protective Service Workers",
    "Loan Counselor",
    "Loan Interviewers and Clerks",
    "Loan Officer",
    "Locker Room, Coatroom, and Dressing Room Attendants",
    "Locksmiths and Safe Repairers",
    "Lodging Managers",
    "Log Graders and Scalers",
    "Logging Equipment Operators",
    "Logging Workers, All Other",
    "Logisticians",
    "Logistics Analyst",
    "Logistics Engineer",
    "Logistics Managers",
    "Loss Prevention Managers",
    "Low Vision Therapists, Orientation and Mobility Specialists, and Vision Rehabilitation Therapists",
    "Machinists",
    "Magnetic Resonance Imaging Technologists",
    "Maid",
    "Mail Clerks and Mail Machine Operators, Except Postal Service",
    "Maintenance and Repair Workers, General",
    "Maintenance Workers, Machinery",
    "Makeup Artists, Theatrical and Performance",
    "Management Analyst",
    "Managers, All Other",
    "Manicurists and Pedicurists",
    "Manufactured Building and Mobile Home Installers",
    "Manufacturing Engineer",
    "Manufacturing Engineering Technologist",
    "Manufacturing Production Technician",
    "Mapping Technician",
    "Marine Architect",
    "Marine Engineer",
    "Marine Engineers and Naval Architect",
    "Market Research Analysts and Marketing Specialist",
    "Marketing Managers",
    "Marking Clerks",
    "Marriage and Family Therapist",
    "Massage Therapists",
    "Materials Engineer",
    "Materials Scientists",
    "Mathematical Science Teachers, Postsecondary",
    "Mathematical Scientist",
    "Mathematical Technician",
    "Mathematician",
    "Meat, Poultry, and Fish Cutters and Trimmers",
    "Mechanical Door Repairers",
    "Mechanical Drafter",
    "Mechanical Engineer",
    "Mechanical Engineering Technician",
    "Mechanical Engineering Technologist",
    "Mechatronics Engineer",
    "Media and Communication Equipment Worker",
    "Medical and Clinical Laboratory Technicians",
    "Medical and Clinical Laboratory Technologists",
    "Medical and Health Services Managers",
    "Medical Appliance Technicians",
    "Medical Assistants",
    "Medical Equipment Preparers",
    "Medical Equipment Repairers",
    "Medical Records and Health Information Technicians",
    "Medical Scientists, Except Epidemiologists",
    "Medical Secretaries",
    "Medical Transcriptionists",
    "Meeting, Convention, and Event Planner",
    "Mental Health and Substance Abuse Social Worker",
    "Mental Health Counselor",
    "Merchandise Displayer",
    "Metal Workers and Plastic Workers, All Other",
    "Metal-Refining Furnace Operators and Tenders",
    "Meter Readers, Utilities",
    "Methane/Landfill Gas Collection System Operators",
    "Methane/Landfill Gas Generation System Technicians",
    "Microbiologists",
    "Microsystems Engineer",
    "Middle School Teachers, Except Special and Career/Technical Education",
    "Midwives",
    "Military Enlisted Tactical Operations and Air/Weapons Specialists and Crew Members, All Other",
    "Military Officer Special and Tactical Operations Leaders, All Other",
    "Milling and Planing Machine Setters, Operators, and Tenders, Metal and Plastic",
    "Millwrights",
    "Mine Cutting and Channeling Machine Operator",
    "Mining and Geological Engineers",
    "Mining Machine Operator",
    "Mixing and Blending Machine Setters, Operators, and Tenders",
    "Mobile Heavy Equipment Mechanics, Except Engines",
    "Model Makers, Metal and Plastic",
    "Model Makers, Wood",
    "Models",
    "Molders, Shapers, and Casters, Except Metal and Plastic",
    "Molding and Casting Workers",
    "Molding, Coremaking, and Casting Machine Setters, Operators, and Tenders, Metal and Plastic",
    "Molecular and Cellular Biologists",
    "Morticians, Undertakers, and Funeral Directors",
    "Motion Picture Projectionists",
    "Motorboat Mechanics and Service Technicians",
    "Motorcycle Mechanics",
    "Movie Director",
    "Multimedia Artist and Animator",
    "Multiple Machine Tool Setters, Operators, and Tenders, Metal and Plastic",
    "Municipal Clerks",
    "Municipal Fire Fighting and Prevention Supervisors",
    "Municipal Firefighters",
    "Museum Technicians and Conservators",
    "Music Composer",
    "Music Director",
    "Music Director and Composer",
    "Music Therapists",
    "Musical Instrument Repairers and Tuners",
    "Musician",
    "Musician and Singer",
    "Nannies",
    "Nanosystems Engineer",
    "Nanotechnology Engineering Technician",
    "Nanotechnology Engineering Technologist",
    "Natural Sciences Managers",
    "Naturopathic Physicians",
    "Network and Computer Systems Administrator",
    "Neurodiagnostic Technologists",
    "Neurologists",
    "Neuropsychologists and Clinical Neuropsychologists",
    "New Accounts Clerks",
    "Non-Destructive Testing Specialist",
    "Nonfarm Animal Caretakers",
    "Nuclear Engineer",
    "Nuclear Equipment Operation Technicians",
    "Nuclear Medicine Physicians",
    "Nuclear Medicine Technologists",
    "Nuclear Monitoring Technicians",
    "Nuclear Power Reactor Operators",
    "Nuclear Technicians",
    "Nurse Anesthetists",
    "Nurse Midwives",
    "Nurse Practitioners",
    "Nursery and Greenhouse Managers",
    "Nursery Workers",
    "Nursing Assistants",
    "Nursing Instructors and Teachers, Postsecondary",
    "Obstetricians and Gynecologists",
    "Occupational Health and Safety Specialists",
    "Occupational Health and Safety Technicians",
    "Occupational Therapists",
    "Occupational Therapy Aides",
    "Occupational Therapy Assistants",
    "Office and Administrative Support Workers, All Other",
    "Office Clerks, General",
    "Office Machine Operators, Except Computer",
    "Online Merchant",
    "Operating Engineers and Other Construction Equipment Operator",
    "Operations Research Analyst",
    "Ophthalmic Laboratory Technicians",
    "Ophthalmic Medical Technicians",
    "Ophthalmic Medical Technologists",
    "Ophthalmologists",
    "Opticians, Dispensing",
    "Optometrists",
    "Oral and Maxillofacial Surgeons",
    "Order Clerks",
    "Order Fillers, Wholesale and Retail Sales",
    "Orderlies",
    "Orthodontists",
    "Orthoptists",
    "Orthotists and Prosthetists",
    "Outdoor Power Equipment and Other Small Engine Mechanics",
    "Packaging and Filling Machine Operators and Tenders",
    "Painter",
    "Painter, Construction and Maintenance",
    "Painters, Transportation Equipment",
    "Painting, Coating, and Decorating Workers",
    "Paper Goods Machine Setters, Operators, and Tenders",
    "Paperhanger",
    "Paralegals and Legal Assistants",
    "Park Naturalists",
    "Parking Enforcement Workers",
    "Parts Salespersons",
    "Pathologists",
    "Patient Representatives",
    "Patternmakers, Metal and Plastic",
    "Patternmakers, Wood",
    "Paving, Surfacing, and Tamping Equipment Operator",
    "Payroll and Timekeeping Clerks",
    "Pediatricians, General",
    "Performer",
    "Personal Care Aides",
    "Personal Care and Service Workers, All Other",
    "Personal Financial Advisor",
    "Pest Control Worker",
    "Pesticide Handlers and Sprayer",
    "Petroleum Engineer",
    "Petroleum Pump System Operators, Refinery Operators, and Gaugers",
    "Pharmacists",
    "Pharmacy Aides",
    "Pharmacy Technicians",
    "Philosophy and Religion Teachers, Postsecondary",
    "Phlebotomists",
    "Photographer",
    "Photographic Process Workers and Processing Machine Operators",
    "Photonics Engineer",
    "Photonics Technician",
    "Physical Medicine and Rehabilitation Physicians",
    "Physical Scientists, All Other",
    "Physical Therapist Aides",
    "Physical Therapist Assistants",
    "Physical Therapists",
    "Physician Assistants",
    "Physicians and Surgeons, All Other",
    "Physicists",
    "Physics Teachers, Postsecondary",
    "Pile-Driver Operator",
    "Pipe Fitter and Steamfitter",
    "Pipelayer",
    "Plant and System Operators, All Other",
    "Plasterer and Stucco Mason",
    "Plating and Coating Machine Setters, Operators, and Tenders, Metal and Plastic",
    "Plumber",
    "Plumber, Pipefitter, and Steamfitter",
    "Podiatrists",
    "Poet and Lyricist",
    "Police and Sheriff's Patrol Officers",
    "Police Detectives",
    "Police Identification and Records Officers",
    "Police Patrol Officers",
    "Police, Fire, and Ambulance Dispatchers",
    "Political Science Teachers, Postsecondary",
    "Political Scientists",
    "Postal Service Clerks",
    "Postal Service Mail Carriers",
    "Postal Service Mail Sorters, Processors, and Processing Machine Operators",
    "Postmasters and Mail Superintendents",
    "Postsecondary Teachers, All Other",
    "Potters, Manufacturing",
    "Pourers and Casters, Metal",
    "Power Distributors and Dispatchers",
    "Power Plant Operators",
    "Precious Metal Workers",
    "Precision Agriculture Technicians",
    "Precision Instrument and Equipment Repairers, All Other",
    "Prepress Technicians and Workers",
    "Preschool Teachers, Except Special Education",
    "Pressers, Textile, Garment, and Related Materials",
    "Preventive Medicine Physicians",
    "Print Binding and Finishing Workers",
    "Printing Press Operators",
    "Private Detectives and Investigators",
    "Probation Officers and Correctional Treatment Specialist",
    "Procurement Clerks",
    "Producer",
    "Product Safety Engineer",
    "Production Workers, All Other",
    "Production, Planning, and Expediting Clerks",
    "Program Director",
    "Proofreaders and Copy Markers",
    "Property, Real Estate, and Community Association Managers",
    "Prosthodontists",
    "Protective Service Workers, All Other",
    "Psychiatric Aides",
    "Psychiatric Technicians",
    "Psychiatrists",
    "Psychologists, All Other",
    "Psychology Teachers, Postsecondary",
    "Public Address System and Other Announcer",
    "Public Relations and Fundraising Managers",
    "Public Relations Specialist",
    "Purchasing Agent",
    "Purchasing Managers",
    "Quality Control Analysts",
    "Quality Control Systems Managers",
    "Radar and Sonar Technicians",
    "Radiation Therapists",
    "Radio and Television Announcer",
    "Radio Frequency Identification Device Specialist",
    "Radio Mechanics",
    "Radio Operator",
    "Radio, Cellular, and Tower Equipment Installers and Repairers",
    "Radiologic Technicians",
    "Radiologic Technologists",
    "Radiologists",
    "Rail Car Repairers",
    "Rail-Track Laying and Maintenance Equipment Operator",
    "Range Managers",
    "Real Estate",
    "Real Estate Brokers",
    "Real Estate Sales Agents",
    "Receptionists and Information Clerks",
    "Recreation and Fitness Studies Teachers, Postsecondary",
    "Recreation Workers",
    "Recreational Therapists",
    "Recreational Vehicle Service Technicians",
    "Recycling and Reclamation Workers",
    "Referee",
    "Refractory Materials Repairers, Except Brickmasons",
    "Refrigeration Mechanics and Installers",
    "Registered Nurses",
    "Regulatory Affairs Managers",
    "Regulatory Affairs Specialist",
    "Rehabilitation Counselor",
    "Reinforcing Iron and Rebar Worker",
    "Religious Worker",
    "Remote Sensing Scientists and Technologists",
    "Remote Sensing Technicians",
    "Reporter",
    "Reservation and Transportation Ticket Agents and Travel Clerks",
    "Residential Advisors",
    "Respiratory Therapists",
    "Respiratory Therapy Technicians",
    "Retail Loss Prevention Specialists",
    "Retail Salespersons",
    "Revenue Agent",
    "Riggers",
    "Risk Management Specialist",
    "Robotics Engineer",
    "Robotics Technician",
    "Rock Splitter, Quarry",
    "Rolling Machine Setters, Operators, and Tenders, Metal and Plastic",
    "Roof Bolter, Mining",
    "Roofer",
    "Rotary Drill Operator, Oil and Gas",
    "Rough Carpenter",
    "Roustabout, Oil and Gas",
    "Sales Agents, Financial Services",
    "Sales Agents, Securities and Commodities",
    "Sales and Related Workers, All Other",
    "Sales Engineers",
    "Sales Managers",
    "Sales Representatives, Services, All Other",
    "Sales Representatives, Wholesale and Manufacturing, Except Technical and Scientific Products",
    "Sales Representatives, Wholesale and Manufacturing, Technical and Scientific Products",
    "Sawing Machine Setters, Operators, and Tenders, Wood",
    "School Psychologists",
    "Scout",
    "Sculptor",
    "Search Marketing Strategist",
    "Secondary School Teachers, Except Special and Career/Technical Education",
    "Secretaries and Administrative Assistants, Except Legal, Medical, and Executive",
    "Securities and Commodities Traders",
    "Securities, Commodities, and Financial Services Sales Agents",
    "Security and Fire Alarm Systems Installers",
    "Security Guards",
    "Security Management Specialist",
    "Security Managers",
    "Segmental Paver",
    "Self-Enrichment Education Teachers",
    "Semiconductor Processors",
    "Separating, Filtering, Clarifying, Precipitating, and Still Machine Setters, Operators, and Tenders",
    "Septic Tank Servicer and Sewer Pipe Cleaners",
    "Service Unit Operator, Oil, Gas, and Mining",
    "Set and Exhibit Designer",
    "Sewers, Hand",
    "Sewing Machine Operators",
    "Shampooers",
    "Sheet Metal Worker",
    "Sheriffs and Deputy Sheriffs",
    "Shipping, Receiving, and Traffic Clerks",
    "Shoe and Leather Workers and Repairers",
    "Shoe Machine Operators and Tenders",
    "Signal and Track Switch Repairers",
    "Singer",
    "Skincare Specialists",
    "Slaughterers and Meat Packers",
    "Slot Supervisors",
    "Social and Community Service Managers",
    "Social and Human Service Assistant",
    "Social Science Research Assistants",
    "Social Sciences Teachers, Postsecondary, All Other",
    "Social Scientists and Related Workers, All Other",
    "Social Work Teachers, Postsecondary",
    "Social Worker",
    "Sociologists",
    "Sociology Teachers, Postsecondary",
    "Software Developer, Applications",
    "Software Developer, Systems Software",
    "Software Quality Assurance Engineer and Tester",
    "Soil and Plant Scientists",
    "Soil and Water Conservationists",
    "Solar Energy Installation Manager",
    "Solar Energy Systems Engineer",
    "Solar Photovoltaic Installer",
    "Solar Sales Representatives and Assessor",
    "Solar Thermal Installers and Technician",
    "Solderers and Brazers",
    "Sound Engineering Technician",
    "Spa Managers",
    "Special Education Teachers, All Other",
    "Special Education Teachers, Kindergarten and Elementary School",
    "Special Education Teachers, Middle School",
    "Special Education Teachers, Preschool",
    "Special Education Teachers, Secondary School",
    "Special Forces",
    "Special Forces Officers",
    "Speech-Language Pathologists",
    "Speech-Language Pathology Assistants",
    "Sports Competitor",
    "Sports Medicine Physicians",
    "Statement Clerks",
    "Stationary Engineers and Boiler Operators",
    "Statistical Assistants",
    "Statistician",
    "Stock Clerks and Order Fillers",
    "Stock Clerks- Stockroom, Warehouse, or Storage Yard",
    "Stock Clerks, Sales Floor",
    "Stone Cutters and Carvers, Manufacturing",
    "Stonemason",
    "Storage and Distribution Managers",
    "Structural Iron and Steel Worker",
    "Structural Metal Fabricators and Fitters",
    "Substance Abuse and Behavioral Disorder Counselor",
    "Supply Chain Managers",
    "Surgeons",
    "Surgical Assistants",
    "Surgical Technologists",
    "Survey Researchers",
    "Surveying and Mapping Technician",
    "Surveying Technician",
    "Surveyor",
    "Sustainability Specialist",
    "Switchboard Operators, Including Answering Service",
    "Tailors, Dressmakers, and Custom Sewers",
    "Talent Director",
    "Taper",
    "Tax Examiners and Collector",
    "Tax Preparer",
    "Teacher Assistants",
    "Teachers and Instructors, All Other",
    "Team Assemblers",
    "Technical Director/Manager",
    "Technical Writer",
    "Telecommunications Engineering Specialist",
    "Telecommunications Equipment Installers and Repairers, Except Line Installers",
    "Telecommunications Line Installers and Repairers",
    "Telemarketer",
    "Telephone Operators",
    "Tellers",
    "Terrazzo Workers and Finisher",
    "Textile Bleaching and Dyeing Machine Operators and Tenders",
    "Textile Cutting Machine Setters, Operators, and Tenders",
    "Textile Knitting and Weaving Machine Setters, Operators, and Tenders",
    "Textile Winding, Twisting, and Drawing Out Machine Setters, Operators, and Tenders",
    "Textile, Apparel, and Furnishings Workers, All Other",
    "Therapists, All Other",
    "Tile and Marble Setter",
    "Timing Device Assemblers and Adjusters",
    "Tire Builders",
    "Tire Repairers and Changers",
    "Title Examiners, Abstractors, and Searchers",
    "Tool and Die Makers",
    "Tool Grinders, Filers, and Sharpeners",
    "Tour Guides and Escorts",
    "Training and Development Managers",
    "Training and Development Specialist",
    "Transit and Railroad Police",
    "Transportation Engineer",
    "Transportation Managers",
    "Transportation Planners",
    "Transportation Security Screeners",
    "Transportation, Storage, and Distribution Managers",
    "Travel Agent",
    "Travel Guides",
    "Treasurers and Controllers",
    "Tree Trimmer and Pruner",
    "Tutors",
    "Umpire",
    "Upholsterers",
    "Urban and Regional Planners",
    "Urologists",
    "Ushers, Lobby Attendants, and Ticket Takers",
    "Validation Engineer",
    "Veterinarians",
    "Veterinary Assistants and Laboratory Animal Caretakers",
    "Veterinary Technologists and Technicians",
    "Video Game Designer",
    "Vocational Education Teachers, Postsecondary",
    "Waiters and Waitresses",
    "Watch Repairers",
    "Water and Wastewater Treatment Plant and System Operators",
    "Water Resource Specialists",
    "Water/Wastewater Engineer",
    "Weatherization Installer and Technician",
    "Web Administrator",
    "Web Developer",
    "Weighers, Measurers, Checkers, and Samplers, Recordkeeping",
    "Welders, Cutters, and Welder Fitters",
    "Welders, Cutters, Solderers, and Brazers",
    "Welding, Soldering, and Brazing Machine Setters, Operators, and Tenders",
    "Wholesale and Retail Buyer",
    "Wind Energy Engineer",
    "Wind Energy Operations Managers",
    "Wind Energy Project Manager",
    "Wind Turbine Service Technicians",
    "Window Trimmer",
    "Woodworkers, All Other",
    "Woodworking Machine Setters, Operators, and Tenders, Except Sawing",
    "Word Processors and Typists",
    "Writer",
    "Zoologists and Wildlife Biologists",
  ];

  const handleData = (event) => {
    if (event.target.name === "hasChildren") {
      event.target.value === "true"
        ? setData({ ...formData, [event.target.name]: true })
        : setData({ ...formData, [event.target.name]: false });
    } else if (event.target.name === "ft" || event.target.name === "in") {
      if (isNaN(+event.target.value)) return;
      setData({ ...formData, [event.target.name]: +event.target.value });
    } else {
      setData({ ...formData, [event.target.name]: event.target.value });
    }
  };
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="account-info-form">
        <Grid container spacing={3} py={1} px={3} margin={2}>
          <Grid sm={12} xs={12}>
            <div style={{ textAlign: "center" }}>
              <img
                style={{ borderRadius: "50%", width: "4rem", height: "4rem" }}
                src={serverPublic + "irislogo.png"}
                alt="logo"
              />
            </div>
          </Grid>
          <Grid sm={12} xs={12}>
            <h3 className="heading-tertiary signup-heading">
              Tell us about yourself
            </h3>
          </Grid>

          <Grid sm={3} xs={12}>
            <Stack spacing={2}>
              <FormLabel>Gender</FormLabel>
              <RadioGroup
                name="gender"
                sx={{ display: "flex", flexDirection: "row" }}
                onChange={handleData}
              >
                <StyledFormControlLabel
                  name="gender"
                  value="male"
                  label="male"
                  control={<Radio />}
                  checked={formData?.gender === "male"}
                />
                <StyledFormControlLabel
                  name="gender"
                  value="female"
                  label="female"
                  control={<Radio />}
                  checked={formData?.gender === "female"}
                />
              </RadioGroup>
            </Stack>
          </Grid>
          <Grid sm={3} xs={12}>
            <Stack spacing={1.5}>
              <FormLabel sx={{ marginLeft: "0.7rem" }} required>
                Height
              </FormLabel>
              <FormControl sx={{ m: 1 }} variant="filled">
                <FilledInput
                  name="ft"
                  endAdornment={
                    <InputAdornment position="end">ft</InputAdornment>
                  }
                  inputProps={{
                    "aria-label": "height-feet",
                  }}
                  onChange={handleData}
                  value={formData.ft}
                />
              </FormControl>
              <FormControl sx={{ m: 1 }} variant="filled">
                <FilledInput
                  name="in"
                  endAdornment={
                    <InputAdornment position="end">in</InputAdornment>
                  }
                  inputProps={{
                    "aria-label": "height-inch",
                  }}
                  onChange={handleData}
                  value={formData.in}
                />
              </FormControl>
            </Stack>
          </Grid>
          <Grid sm={6} xs={12}>
            <Stack spacing={2}>
              <FormLabel>Country</FormLabel>

              <FormControl sx={{ m: 1 }} fullWidth size="small" required>
                <Select
                  name="country"
                  onChange={handleData}
                  value={formData.country}
                >
                  <MenuItem value="">
                    <em>Not Specified</em>
                  </MenuItem>

                  {countries.map((country, index) => {
                    return (
                      <MenuItem
                        key={index}
                        value={country.name.common.toLowerCase()}
                      >
                        {country.name.common}
                      </MenuItem>
                    );
                  })}
                </Select>
                <FormHelperText>Required</FormHelperText>
              </FormControl>
            </Stack>
          </Grid>
          <Grid sm={6} xs={12}>
            <Stack spacing={1.5}>
              <FormLabel sx={{ marginLeft: "0.7rem" }}>Birthday</FormLabel>
              <TextField
                id="date"
                label="dob"
                name="dob"
                type="date"
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleData}
                value={formData.dob}
                required
              />
            </Stack>
          </Grid>
          <Grid sm={6} xs={12}>
            <Stack spacing={1.5}>
              <FormLabel>Languages you speak</FormLabel>
              <FormControl>
                <MultipleSelectChip
                  names={languages}
                  onChange={handleData}
                  value={formData.languages}
                  name="languages"
                />
              </FormControl>
            </Stack>
          </Grid>
          <Grid sm={6} xs={12}>
            <Stack spacing={2}>
              <FormLabel sx={{ marginLeft: "0.7rem" }}>What you do?</FormLabel>
              <FormControl sx={{ m: 1 }} fullWidth size="small" required>
                <Select
                  name="occupation"
                  onChange={handleData}
                  value={formData.occupation}
                >
                  <MenuItem value="">
                    <em>Not Specified</em>
                  </MenuItem>

                  {occupations.map((occupation, index) => {
                    return (
                      <MenuItem key={index} value={occupation}>
                        {occupation}
                      </MenuItem>
                    );
                  })}
                </Select>
                <FormHelperText>Required</FormHelperText>
              </FormControl>
            </Stack>
          </Grid>
          <Grid sm={6} xs={12}>
            <Stack spacing={2}>
              <FormLabel sx={{ marginLeft: "0.7rem" }}>Education</FormLabel>
              <FormControl sx={{ m: 1 }} fullWidth size="small" required>
                <Select
                  name="educationLevel"
                  onChange={handleData}
                  value={formData.educationLevel}
                >
                  <MenuItem value="">
                    <em>Not Specified</em>
                  </MenuItem>
                  <MenuItem key="high school" value="high school">
                    High school
                  </MenuItem>
                  <MenuItem key="college" value="college">
                    Some college
                  </MenuItem>
                  <MenuItem key="bachelor's degree" value="bachelor">
                    Bachelor's degree
                  </MenuItem>
                  <MenuItem key="graduate" value="graduate">
                    Graduate
                  </MenuItem>
                </Select>
                <FormHelperText>Required</FormHelperText>
              </FormControl>
            </Stack>
          </Grid>
          <Grid sm={6} xs={12}>
            <Stack spacing={2}>
              <FormLabel sx={{ marginLeft: "0.7rem" }}>Religion</FormLabel>
              <FormControl sx={{ m: 1 }} fullWidth size="small" required>
                <Select
                  name="religion"
                  onChange={handleData}
                  value={formData.religion}
                >
                  <MenuItem value="">
                    <em>Not Specified</em>
                  </MenuItem>
                  <MenuItem key="buddhist" value="buddhist">
                    Buddhist
                  </MenuItem>
                  <MenuItem key="hindu" value="hindu">
                    Hindu
                  </MenuItem>
                </Select>
                <FormHelperText>Required</FormHelperText>
              </FormControl>
            </Stack>
          </Grid>
          <Grid sm={6} xs={12}>
            <Stack spacing={2}>
              <FormLabel sx={{ marginLeft: "0.7rem" }}>Ethnicity</FormLabel>
              <FormControl sx={{ m: 1 }} fullWidth size="small" required>
                <Select
                  name="ethnicity"
                  onChange={handleData}
                  value={formData.ethnicity}
                >
                  <MenuItem key="sinhalese" value="sinhalese">
                    Sinhalese
                  </MenuItem>
                  <MenuItem key="tamil" value="tamil">
                    Tamil
                  </MenuItem>
                </Select>
                <FormHelperText>Required</FormHelperText>
              </FormControl>
            </Stack>
          </Grid>
          <Grid sm={6} xs={12}>
            <Stack spacing={2}>
              <FormLabel sx={{ marginLeft: "0.7rem" }}>
                Monthly Income
              </FormLabel>
              <FormControl sx={{ m: 1 }} fullWidth size="small" required>
                <Select
                  name="monthlyIncome"
                  onChange={handleData}
                  value={formData.monthlyIncome}
                >
                  <MenuItem
                    key="less than Rs.25,000"
                    value="less than Rs.25,000"
                  >
                    less than Rs.25,000
                  </MenuItem>
                  <MenuItem
                    key="between Rs.25,000 & Rs.50,000"
                    value="between Rs.25,000 & Rs.50,000"
                  >
                    between Rs.25,000 & Rs.50,000
                  </MenuItem>
                  <MenuItem
                    key="between Rs.50,000 & Rs.100,000"
                    value="between Rs.50,000 & Rs.100,000"
                  >
                    between Rs.50,000 & Rs.100,000
                  </MenuItem>
                  <MenuItem
                    key="between Rs.100,000 & Rs.150,000"
                    value="between Rs.100,000 & Rs.150,000"
                  >
                    between Rs.100,000 & Rs.150,000
                  </MenuItem>
                  <MenuItem
                    key="more than Rs.150,000',"
                    value="more than Rs.150,000',"
                  >
                    more than Rs.150,000',
                  </MenuItem>
                </Select>
                <FormHelperText>Required</FormHelperText>
              </FormControl>
            </Stack>
          </Grid>
          <Grid sm={6} xs={12}>
            <Stack spacing={2}>
              <FormLabel sx={{ marginLeft: "0.7rem" }}>
                Do you have children?
              </FormLabel>
              <RadioGroup
                name="hasChildren"
                onChange={handleData}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 2,
                  padding: "0 1rem",
                }}
              >
                <StyledFormControlLabel
                  name="hasChildren"
                  value={true}
                  label="yes"
                  control={<Radio />}
                  checked={formData.hasChildren === true}
                />
                <StyledFormControlLabel
                  name="hasChildren"
                  value={false}
                  label="no"
                  control={<Radio />}
                  checked={formData.hasChildren === false}
                />
              </RadioGroup>
            </Stack>
          </Grid>
          <Grid sm={12} xs={1}></Grid>
          <Grid sm={12} xs={1}></Grid>
          <Grid sm={4} xs={1}></Grid>
          <Grid sm={4} xs={6}>
            <Button variant="contained" fullWidth type="submit">
              Next
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default UserInfo;
