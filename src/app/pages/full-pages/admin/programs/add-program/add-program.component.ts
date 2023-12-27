import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Program } from 'app/shared/models/program.model';
@Component({
  selector: 'app-add-program',
  templateUrl: './add-program.component.html',
  styleUrls: ['./add-program.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddProgramComponent implements OnInit {

  activeTab = "Program Info";
  firstFormGroupSubmitted = false;
  changePasswordFormSubmitted = false;
  infoFormSubmitted = false;
  alertVisible = true;

  countries = [
      { value: "USA", name: 'USA' },
      { value: "UK", name: 'UK'},
      { value: "Canada", name: 'Canada' },
  ];

  selectedLanguages = ["English", "Spanish"];
  languages = [
      { value: "English", name: 'English' },
      { value: "Spanish", name: 'Spanish'},
      { value: "French", name: 'French' },
      { value: "Russian", name: 'Russian' },
      { value: "German", name: 'German'},
      { value: "Hindi", name: 'Hindi' },
      { value: "Arabic", name: 'Arabic' },
      { value: "Sanskrit", name: 'Sanskrit'},
  ];

  selectedMusic = ["Jazz", "Hip Hop"];
  music = [
      { value: "Rock", name: 'Rock' },
      { value: "Jazz", name: 'Jazz'},
      { value: "Disco", name: 'Disco' },
      { value: "Pop", name: 'Pop' },
      { value: "Techno", name: 'Techno'},
      { value: "Folk", name: 'Folk' },
      { value: "Hip Hop", name: 'Hip Hop' },
  ];

  selectedMovies = ["The Dark Knight", "Perl Harbour"];
  movies = [
      { value: "Avatar", name: 'Avatar' },
      { value: "The Dark Knight", name: 'The Dark Knight'},
      { value: "Harry Potter", name: 'Harry Potter' },
      { value: "Iron Man", name: 'Iron Man' },
      { value: "Spider Man", name: 'Spider Man'},
      { value: "Perl Harbour", name: 'Perl Harbour' },
      { value: "Airplane!", name: 'Airplane!' },
  ];

  category_List=[
    {name:'Test',_id:'test'}
  ]
  months_List=[]
  years_List=[]
  maxnumber_student_List=[
    {name:"Maximum number of kids a single class/session/lesson can accommodate"},
    {name:"No Capacity info"},
  ]
  firstFormGroup = new UntypedFormGroup({
    displayname: new UntypedFormControl('hermione007', [Validators.required]),
    email: new UntypedFormControl('granger007@hogward.com', [Validators.required]),
    program_description: new UntypedFormControl('', [Validators.required]),
    category: new UntypedFormControl('', [Validators.required]),
    subcategory: new UntypedFormControl('', [Validators.required]),
    agegroup: new UntypedFormControl('', [Validators.required]),
    skilllevel: new UntypedFormControl('', [Validators.required]),
  });

  changePasswordForm = new UntypedFormGroup({
    parentalSupervision: new UntypedFormControl('', [Validators.required]),
    maxNumberStudent: new UntypedFormControl('', [Validators.required]),
    capacity: new UntypedFormControl('', [Validators.required]),
    programType: new UntypedFormControl('', [Validators.required]),
    privateGroup: new UntypedFormControl('', [Validators.required]),
    sessionPremies: new UntypedFormControl('', [Validators.required]),
  });

  infoForm = new UntypedFormGroup({
    offersDiscounts: new UntypedFormControl('', [Validators.required]),
    specialAdditionalInfo: new UntypedFormControl('', [Validators.required]),
    bookingCancel: new UntypedFormControl('', [Validators.required]),

    bdate: new UntypedFormControl('', [Validators.required]),
    bio: new UntypedFormControl(''),
    phone: new UntypedFormControl('', [Validators.required]),
    website: new UntypedFormControl('')
  });

  socialForm = new UntypedFormGroup({
    twitter: new UntypedFormControl(''),
    facebook: new UntypedFormControl(''),
    googlePlus: new UntypedFormControl(''),
    linkedin: new UntypedFormControl(''),
    instagram: new UntypedFormControl(''),
    quora: new UntypedFormControl('')
  });
program_model={
  name:'',
  emails:[],
  description:'',
  earlyDrop_off_LatePick_up: {
    ealryDrop: false,
    earlyTime: '',
    lateDrop: false,
    lateTime: ''
  },
  categoryId:'',
  subCategory:'',
  ageGroup:{ month: [], year: [] },
  skillGroup: '',
  isFreeTrial: false,
  parentalSupervisionRequired:'',

}
minCapacity: number = 0;
maxCapacity: number = 0;
days: any =
  {
    sunday: false,
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
  }

activityRecurring = {
  activityRecurring: false,
  day: [],
}

program: any = new Program;
  constructor( private modalService: NgbModal,) { }

  ngOnInit() {
    this. ageRange()

    this.firstFormGroup = new FormGroup({
      name: new FormControl(['',]),
      type: new FormControl(['',]),
      categoryId: new FormControl(['',]),
      phoneNumber: new FormControl(['']),
      // subCategory: new FormControl(),
      subCategory: new FormControl(['',]),
      inpersonOrVirtual: new FormControl(['',]),
      indoorOroutdoor: new FormControl(['',]),
      description: new FormControl(['',]),
      specialInstructions: new FormControl(['',]),
      email: new FormControl(['', Validators.email]),
      presenter: new FormControl(['',]),
      ageGroup: new FormControl(['',]),
      startDate: new FormControl(['',]),
      endDate: new FormControl(['',]),
      startTime: new FormControl(['',]),
      endTime: new FormControl(['',]),
      isDateNotMention: new FormControl(false),
      isDayNotMention: new FormControl(false),
      isTimeNotMention: new FormControl(false),
      isproRated: new FormControl(false),
      dayss: new FormControl(['',]),
      isFree: new FormControl(false),
      isFreeTrial: new FormControl(false),
      days: new FormControl(['',]),
      pricePerParticipant: new FormControl(['',]),
      priceForSiblings: new FormControl(['',]),
      perTimePeriod: new FormControl(['',]),
      timePeriodDuration: new FormControl(['',]),
      extractionDate: new FormControl(['',]),
      adultAssistanceIsRequried: new FormControl(false),
      addresses: new FormControl(['',]),
      hours: new FormControl(['',]),
      joiningLink: new FormControl(['',]),
      location: new FormControl(['']),
      instructors: new FormControl(['']),
      locationOfActivity: new FormControl(['', this.program.privateOrGroup == 'private' && this.program.inpersonOrVirtual == 'Inperson' ? Validators.required : '']),
      city: new FormControl(['']),
      source: new FormControl(['',]),
      sourceUrl: new FormControl(['',]),
      cycle: new FormControl(['']),
      isExpired: new FormControl([false]),
      zip: new FormControl(['']),
      activeStatus: new FormControl(['']),
      per_hour_rate: new FormControl(['']),
      privateOrGroup: new FormControl(['']),
      offerDiscount: new FormControl(['']),
      last_reviewed: new FormControl(['']),
      program_last_reviewed: new FormControl(['']),
      cycle_time: new FormControl(['']),
      isParentJoin: new FormControl([false]),
      maxTravelDistance: new FormControl([Number]),
      totalSessionClasses: new FormControl([Number]),
      isParentGuardianRequire: new FormControl([false]),
      extractor_notes: new FormControl(['']),
      program_extractor_notes: new FormControl(['']),
      // proof_reader_notes: new FormControl(['']),
      isOpenForBooking: new FormControl(true),
      isChildCare: new FormControl([false]),
      isPriceNotMention: new FormControl([false]),
      ealryDrop: new FormControl([false]),
      lateDrop: new FormControl([false]),
      parentalSupervisionRequired: new FormControl(['']),
      maxNumberOfStudents: new FormControl(['']),
      skillGroup: new FormControl(['']),
      pricing: new FormControl(['']),
      pricePerUnit: new FormControl(['']),
      actualPrice: new FormControl(['']),
    });

  }

  ageRange(){
    for(let i =2; i<18; i++){
      this.years_List.push(i)
    }
    for(let i =0; i<24; i++){
      this.months_List.push(i)
    }
  }

  setActiveTab(tab) {
    this.activeTab = tab;
  }

  get gf() {
    return this.firstFormGroup.controls;
  }

  get cpf() {
    return this.changePasswordForm.controls;
  }

  get inf() {
    return this.infoForm.controls;
  }

  onfirstFormGroupSubmit() {
    this.firstFormGroupSubmitted = true;
    if (this.firstFormGroup.invalid) {
      return;
    }
  }

  onChangePasswordFormSubmit() {
    this.changePasswordFormSubmitted = true;
    if (this.changePasswordForm.invalid) {
      return;
    }
  }

  onInfoFormSubmit() {
    this.infoFormSubmitted = true;
    if (this.infoForm.invalid) {
      return;
    }
  }

  onSocialFormSubmit() {
    if (this.socialForm.invalid) {
      return;
    }
  }
  openModalForPrice(content) {
   
    const modalOptions: NgbModalOptions = {
      size: 'lg', // 'sm', 'lg', or 'xl'
      backdrop: 'static',
    };
    const modalRef = this.modalService.open(content,modalOptions);
    modalRef.result.then((result) => { 

    }, (reason) => {
    });
  }
  getCategory(event){
    this.program_model.categoryId
  }
  getSubCategory(event){
    this.program_model.subCategory
  }
  getAgeMonth(event){
    this.program_model.ageGroup.month
  }
  getAgeYear(event){
    this.program_model.ageGroup.year
  }
  getSkillLevel(event){
    this.program_model.skillGroup
  }
  getFreeTrial(event: any) {
    this.program_model.isFreeTrial = event.target.checked;
    console.log('Is Free Trial:', this.program_model.isFreeTrial);
  }
  getEarlyDrop(event){
    this.program_model.earlyDrop_off_LatePick_up.ealryDrop = event.target.checked;
    console.log('early drop:', this.program_model.earlyDrop_off_LatePick_up.ealryDrop);
  }
  getLateDrop(event){
    this.program_model.earlyDrop_off_LatePick_up.lateDrop = event.target.checked;
    console.log('late drop:', this.program_model.earlyDrop_off_LatePick_up.lateDrop);
  }
  submit(){
    console.log('=>>>',this.program_model)
  }
}

// =================

// {
//   "time": {},
//   "date": {
//       "from": "2023-12-26T09:00:26.184Z",
//       "to": "2023-12-26T09:00:26.184Z"
//   },
//   "ageGroup": {
//       "month": [
//           20
//       ],
//       "year": []
//   },
//   "bookingCancelledIn": {
//       "days": "5",
//       "hours": "2"
//   },
//   "duration": {},
//   "isFree": false,
//   "isFreeTrial": true,
//   "isproRated": true,
//   "isDateNotMention": false,
//   "isTimeNotMention": false,
//   "isDayNotMention": false,
//   "isDayFlexible": false,
//   "isTimeFlexible": false,
//   "isDateFlexible": false,
//   "adultAssistanceIsRequried": false,
//   "capacity": {
//       "min": 0,
//       "max": 9
//   },
//   "emails": [],
//   "categoryId": [
//       "60b47687bb70a952280bfa7b"
//   ],
//   "tags": [],
//   "days": {
//       "sunday": false,
//       "monday": false,
//       "tuesday": false,
//       "wednesday": false,
//       "thursday": false,
//       "friday": false,
//       "saturday": false
//   },
//   "timelinePics": [],
//   "extraPrices": [
//       {
//           "pricePerUnit": "week",
//           "pricePerParticipant": "70",
//           "noOfUnits": 1,
//           "pricePerHour": "30",
//           "priceProrated": true,
//           "setDefault": true
//       }
//   ],
//   "categoryIds": [],
//   "subCategoryIds": [
//       "6284897d3c0c6e0c3949b891"
//   ],
//   "category": [],
//   "pricePeriod": {},
//   "realTime": {
//       "from": 0,
//       "to": 0
//   },
//   "isExpired": false,
//   "isPrivateLession": false,
//   "isParentJoin": false,
//   "isParentGuardianRequire": false,
//   "isOpenForBooking": true,
//   "isChildCare": false,
//   "isPriceNotMention": false,
//   "multiLocations": [
//       "6321d3f99a05f82338b976ec"
//   ],
//   "earlyDrop_off_LatePick_up": {
//       "ealryDrop": true,
//       "earlyTime": "10:30",
//       "lateDrop": false,
//       "lateTime": ""
//   },
//   "pricePerUnit": {
//       "unit": "week",
//       "actualPrice": "30"
//   },
//   "type": "Class",
//   "privateOrGroup": "group",
//   "city": "Jersey City",
//   "parentalSupervisionRequired": "Parent attendance required",
//   "maxNumberOfStudents": "Maximum number of kids a single class/session/lesson can accommodate",
//   "indoorOroutdoor": "Indoor",
//   "pricing": "Price available",
//   "name": "test",
//   "providerEmail": "6321d3f99a05f82338b976ee",
//   "description": "test test",
//   "specialInstructions": " fhfgh fhfgh fghfghn",
//   "extractor_notes": " rgeg  g edgg link",
//   "offerDiscount": "test tershfghfgbh dgh",
//   "pricePerParticipant": "70",
//   "exceptionDates": [],
//   "activityRecurring": {
//       "activityRecurring": false,
//       "day": []
//   },
//   "userId": "6186620b8e5bb757115d5222",
//   "program_last_reviewed": "26-12-2023",
//   "extractionDate": "2023-12-26T09:00:26.184Z"
// }
