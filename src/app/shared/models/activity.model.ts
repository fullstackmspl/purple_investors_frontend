export class Activity {
  activityId: string;
  programId: string;
  alias: string;
  dateOption: string="Dates available";
  dayOption: string="Days provided";
  timeOption: string="Time Available";
  pricePerParticipant: string;
  priceForSiblings: string;
  specialInstructions: string;
  adultAssistanceIsRequried: boolean = false;
  perTimePeriod: string;
  pricePeriod: any = {};
  inpersonOrVirtual: string="No data available";
  extractionDate: Date;
  proofreaderRating: string;
  realTime: any = {
      from: 0,
      to: 0
  };
  isExpired: boolean = false;
  per_hour_rate: any;
  last_reviewed: string;
  cycle_time: number;
  proof_reader_notes: string;
  extractor_notes: string;
  isPrivateLession: boolean = false;
  daysLeft: string;
  instructors: any[] = [];
  isParentJoin: boolean = false;
  offerDiscount: string;
  maxTravelDistance: number;
  totalSessionClasses: number=0;
  isParentGuardianRequire: boolean = false;
  isOpenForBooking: string="Yes";
  isChildCare: boolean = false;
  isPriceNotMention: boolean = false;
  multiLocations: any[] = [];
  providerEmail: string;
  earlyDrop_off_LatePick_up: any = {};
  parentalSupervisionRequired: string;
  maxNumberOfStudents: string;
  skillGroup: string;
  pricing: string;
  pricePerUnit = {
      unit: '',
      actualPrice: 0
  };
  bookingCancelledIn = {
      hours: "",
      days: "",
  }
  time: any = {};
  date: any = {};
  duration: any = {};
  capacity: any = {
      min: 0,
      max: 0,
  };
  exceptionDates: any[] = [];
  activityRecurring: any;
  days: any = {
    sunday: false,
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
  };
  isDateNotMention: boolean;
  cancelBeforeHours: 0;
  cancelBeforeDays: 0;
  isFreeTrial: boolean;
  registrationStartDate: string;
  registrationEndDate: string;
}