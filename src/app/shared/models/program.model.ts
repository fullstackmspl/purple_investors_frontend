export class Program {
  id: string;
  _id: string;
  isFav: boolean;
  name: string;
  description: string;
  type: string;
  email: string;
  price: string;
  location: string;
  code: string;
  programId: string;
  createdOn: Date;
  updatedOn: Date;
  time: any = {};
  date: any = {}
  addedBy: { createdOn: Date };
  lastModifiedBy: { updatedOn: Date };
  ageGroup: any = { month: [], year: [] };
  bookingCancelledIn: any = {};
  duration: any = {};
  isFree: boolean = false;
  isFreeTrial: boolean = false;
  isproRated: boolean = false;
  isPublished: boolean;
  isDateNotMention: boolean = false;
  isTimeNotMention: boolean = false;
  isDayNotMention: boolean = false;
  isDayFlexible: boolean = false;
  isTimeFlexible: boolean = false;
  isDateFlexible: boolean = false;
  dateOption: string
  dayOption: string
  timeOption: string
  pricePerParticipant: string;
  priceForSiblings: string;
  specialInstructions: string;
  adultAssistanceIsRequried: boolean = false;
  capacity: any = {min:0, max: 0};
  emails = [];
  sessions: any[];
  status: string;
  programCoverPic: string;
  userId: string;
  addresses: [];
  categoryId: any[] = [];
  tags: any = [];
  days: any = [];
  extraPrices: any[] = [];
  user: string;
  joiningLink: string;
  presenter: string;
  lat: string;
  lng: string;
  categoryIds: any[] = [];
  phoneNumber: string;
  programImage: any;
  indoorOroutdoor: string;
  subCategoryIds: any[] = [];
  source: [];
  sourceUrl: [];
  cycle: string
  activeStatus: string;
  city: string;
  category: any = [];
  alias: string;
  perTimePeriod: string
  pricePeriod: any = {}
  inpersonOrVirtual: string;
  extractionDate: Date;
  proofreaderRating: string;
  realTime: any = {
      from: 0,
      to: 0
  }
  isExpired: boolean = false;
  per_hour_rate: any;
  last_reviewed: Date;
  cycle_time: number;
  proof_reader_notes: string;
  extractor_notes: string;
  isPrivateLession: boolean = false;
  daysLeft: string;
  instructor: string;
  isParentJoin: boolean = false;
  offerDiscount: string;
  maxTravelDistance: number;
  totalSessionClasses: number;
  isParentGuardianRequire: boolean = false;
  isOpenForBooking: boolean = true;
  isChildCare: boolean = false;
  isPriceNotMention: boolean = false;
  multiLocations: any[] = [];
  providerEmail: string;
  privateOrGroup:string='group'
  earlyDrop_off_LatePick_up: any =  {
    ealryDrop: false,
    earlyTime: '',
    lateDrop: false,
    lateTime: ''
  };
  parentalSupervisionRequired: string;
  maxNumberOfStudents: string='No Capacity info';
  skillGroup: string;
  pricing: string;
  pricePerUnit = {
      unit: '',
      actualPrice: 0
  };
}