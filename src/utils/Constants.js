import { createContext, useContext } from "react";
import {
  Bell,
  ChevronDown,
  ChevronUp,
  Download,
  Edit2,
  FileMinus,
  FilePlus,
  Frown,
  Linkedin,
  Mail,
  Phone,
  Search,
  Star,
  Trash,
  UserPlus,
  X,
} from "react-feather";

export const SessionContext = createContext();

export const useSession = () => useContext(SessionContext);

export const ICON_COLOR = "#860286";

export const GET_SAMPLE_DATA_URL =
  "https://mocki.io/v1/b9540d4f-fe18-4ba8-bf2b-2c107b1c92c1";

export const FeatherIcons = {
  star: Star,
  user: UserPlus,
  download: Download,
  mail: Mail,
  phone: Phone,
  frown: Frown,
  linkedIn: Linkedin,
  close: X,
  bell: Bell,
  chevron_up: ChevronUp,
  chevron_down: ChevronDown,
  file_plus: FilePlus,
  file_minus: FileMinus,
  edit: Edit2,
  trash: Trash,
  search: Search,
};

export const DROPDOWN_OPTIONS = [
  "All",
  "Today",
  "Tomorrow",
  "Yesterday",
  "This month",
  "Next month",
];

export const INPUT_FORM_DATA = {
  id: "",
  name: "",
  email: "",
  dob: undefined,
  phoneNo: undefined,
  relationship: "",
  image: "",
};

export const INITIAL_REDUCER_DATA = {
  dataSource: [],
  list: [],
  showContent: [],
  selected: DROPDOWN_OPTIONS[0],
  memberDetails: {},
};

export const REDUCER_DATA = {
  DATA_SOURCE: "set_data_source",
  LIST: "set_list",
  SHOW_CONTENT: "set_show_content",
  SELECTED: "set_selected",
  MEMBER_DETAIL: "set_member_details",
};

export const PROFILE_PIC_TEXT = {
  NEW: "Choose Profile Pic",
  RENAME: "Replace Profile Pic",
};

export const DATE_TYPE = {
  MM: "MM",
  MMDD: "MM-DD",
  DDMMMYYYY: "DD MMM YYYY",
  DAY: "day",
  MONTH: "month",
};

export const SAMPLE_DATA = [
  {
    id: "Sample1",
    name: "Zendaya",
    age: 27,
    dob: "1996-09-01",
    relation: "Celebrity",
    email: null,
    phoneNo: null,
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: "Sample2",
    name: "Timothée Chalamet",
    age: 28,
    dob: "1995-12-27",
    relation: "Celebrity",
    email: null,
    phoneNo: null,
    image: "https://randomuser.me/api/portraits/men/22.jpg",
  },
  {
    id: "Sample3",
    name: "Emma Watson",
    age: 34,
    dob: "1990-04-15",
    relation: "Celebrity",
    email: null,
    phoneNo: null,
    image: "https://randomuser.me/api/portraits/women/55.jpg",
  },
  {
    id: "Sample4",
    name: "Tom Holland",
    age: 28,
    dob: "1996-06-01",
    relation: "Celebrity",
    email: null,
    phoneNo: null,
    image: "https://randomuser.me/api/portraits/men/33.jpg",
  },
];

export const FEEDBACK = {
  MSG1: "Whether you enjoyed the app or see room for improvement, your input truly matters. Feel free to reach out via ",
  MSG2: "I'd love to hear from you. Thanks so much for checking it out!",
  MAIL: "mailto:prathee024@email.com",
  LINKEDIN: "https://www.linkedin.com/in/pratheeksha-poonja-4a62a9bb/",
};

export const RELATION_TYPE = [
  "Family",
  "Friend",
  "Colleague",
  "Classmate",
  "Neighbor",
  "Partner",
  "Spouse",
  "Parent",
  "Sibling",
  "Child",
  "Relative",
  "Acquaintance",
  "Celebrity",
  "Mentor",
  "Boss",
  "Client",
  "Others",
];

export const MESSAGES = {
  NO_BDAY_TONIGHT: "No candles to blow out ",
  BDAY_WISH: "Send birthday vibes",
  BELATED_WISH: "Send belated birthday wishes",
  FEEDBACK: "Share Your Thoughts",
  DROPDOWM_MSG: "Who's Celebrating Soon?:",
  CELEBRATE: "It's celebration time!",
  LINKEDIN_CONNECT: "Connect with me on LinkedIn",
  MAIL_CONNECT: "Get in touch via email",
  ADD_CONTACTS: "Add Contacts",
  LOAD_SAMPLE_DATA: "Load Sample Data",
  REMOVE_SAMPLE_DATA: "Remove Sample Data",
  WARN_MSG:
    "Data is retained exclusively for the duration of the current session.",
  ERR_NAME: "! Minimum of 3 characters",
  ERR_MAIL: "! Invalid email ID",
  ERR_DOB: "! Invalid date of birth",
  ERR_PHONENO: "! Right format: 123-456-7890",
  CELEBRATE_MSG: "It's Your Special Day - Celebrate Big!",
  BIRTHDAY_WISHES:
    "Wishing you a very happy birthday today! May your day be filled with love, laughter, and all the things that make you smile. Cheers to another amazing year!",
  BELATED_WISHES:
    "Better late than never! Wishing you all the joy and success you deserve this year. Happy belated birthday!",
  ADVANCE_WISHES:
    "I'm sending you my best wishes ahead of time because I want you to have the best celebration before it even starts. I hope your year ahead is as spectacular as you!",
};

export const BIRTHDAY_TIME = {
  TODAY: "Today",
  BELATED: "Belated",
  Advanced: "Advanced",
};
