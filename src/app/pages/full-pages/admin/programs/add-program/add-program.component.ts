import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Activity } from 'app/shared/models/activity.model';
import { Program } from 'app/shared/models/program.model';
import { ApiServiceService } from 'app/shared/services/api-service.service';
import { WondrflyApiService } from 'app/shared/services/wondrfly-api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

@Component({
  selector: 'app-add-program',
  templateUrl: './add-program.component.html',
  styleUrls: ['./add-program.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddProgramComponent implements OnInit {
  ageYears: any[] = [];
  extraPrices: any[] = [];
  activeTab = "Program Info";
  activity: any = new Activity;
  activityRecurring = {
    activityRecurring: false,
    day: [],
  }
  days ={
    sunday: false,
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
  }
  city_List: any[]=[];
  firstFormGroupSubmitted = false;
  secondFormSubmitted = false;
  infoFormSubmitted = false;
  alertVisible = true;
  addProgramView=true
  public ColumnMode = ColumnMode;
  public columns = [
    { name: "Name", prop: "name" },
    { name: "Description", prop: "description" },
    { name: "Phone", prop: "phone_number" },
    { name: "Actions", prop: "Actions" },
  ];

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
  date_options_list=[
    {name:"Date is not available",value:"Dates are not available"},
    {name:"Dates are flexible",value:"Dates are flexible"},
    {name:"Dates available",value:"Dates available"},
  ]
  days_options_list=[
    {name:"Days provided"},
    {name:"Days are flexible"}, 
    {name:"No data available"}
  ]
  requiredRecipients:boolean
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
  Instructors_List=[

  ]
  inpersonOrvirtual_List=[
    {name:"In person only",value:"Inperson"},
    {name:"Online only",value:"Virtual"},
    {name:"In-person or Online",value:"In-person or Online"},
    {name:"No data available",value:"No data available"}
  ]
  isOpenForBooking_List=[
    {name:"Yes",value:"Yes"},
    {name:"No",value:"No"},
    {name:"No info",value:"No info"}
  ]
  category_List:any[]=[]
  months_List=[]
  years_List=[]
  maxnumber_student_List=[
    {name:"Maximum number of kids a single class/session/lesson can accommodate"},
    {name:"No Capacity info"},
  ]
  program_types=[
    {name:"Private Class"},
    {name:"Class"},
    {name:"Camp"},
    {name:"Party"},
  ]
  pricing_List=[
    {name:"Price available",value:'Price available'},
    {name:"Price can be discussed",value:'Price can be discussed'},
    {name:"It is a free program",value:'It is a free program'},
    {name:"No data available",value:'No data available'},
  ]
  id: any;
  programId: any;
  isEdit: boolean;
  activityList: any;
  startDate: any = new Date;
  endDate: any = new Date;
  last_reviewed: any = new Date;
  activityfirstFormGroupSubmitted: boolean;
  activitySecondFormGroupSubmitted: boolean;
  changePricing(val){
    this.program.pricing=val.value
    console.log(this.program.pricing)
  }
  price_unit_List=[
    {name:"Hour",value:'hour'},
    {name:"Class",value:'class'},
    {name:"Day",value:'day'},
    {name:"Week",value:'week'},
    {name:"Month",value:'month'},
    {name:"Package",value:'package'},
    {name:"Semester",value:'semester'},
    {name:"Year",value:'year'},
  ]
  private_vs_group=[
  {name:"Private",value:'private'},
  {name:"Group",value:'group'}
  ]
  session_premises=[
    {name:"Indoor",value:'Indoor'},
    {name:"Outdoor",value:'Outdoor'},
    {name:"Either",value:'Either'},
    {name:"No data available",value:'No data available'},
  ]
  PriceFormGroup = new FormGroup({
    pricePerUnit: new FormControl('',[Validators.required]),
    pricePerParticipant: new FormControl('',[Validators.required]),
    noOfUnits: new FormControl(1,[Validators.required]),
    pricePerHour: new FormControl(''),
    priceProrated: new FormControl(false),
    setDefault: new FormControl(true),
    // offerDiscount: new FormControl(['',]),
  });
  firstFormGroup = new FormGroup({
      name: new FormControl(['',]),
      description: new FormControl(['',]),
      email: new FormControl(['', Validators.email]),
  });
  activityfirstFormGroup = new FormGroup({
    name: new FormControl(['',]),
    description: new FormControl(['',]),
    email: new FormControl(['', Validators.email]),
});
activitySecondFormGroup = new FormGroup({
  name: new FormControl(['',]),
  description: new FormControl(['',]),
  email: new FormControl(['', Validators.email]),
});
  secondForm = new FormGroup({
    parentalSupervisionRequired: new FormControl('No data available', [Validators.required]),
    maxNumberOfStudents: new FormControl('No Capacity info', [Validators.required]),
    capacity: new FormControl(''),
    programType: new FormControl('', [Validators.required]),
    privateOrGroup: new FormControl('group', [Validators.required]),
    indoorOroutdoor: new FormControl('No data available', [Validators.required]),
  });

  infoForm = new FormGroup({
    offersDiscounts: new FormControl('', [Validators.required]),
    specialAdditionalInfo: new FormControl('', [Validators.required]),
    bookingCancel: new FormControl('', [Validators.required]),

    bdate: new FormControl('', [Validators.required]),
    bio: new FormControl(''),
    phone: new FormControl('', [Validators.required]),
    website: new FormControl('')
  });

  socialForm = new FormGroup({
    twitter: new FormControl(''),
    facebook: new FormControl(''),
    googlePlus: new FormControl(''),
    linkedin: new FormControl(''),
    instagram: new FormControl(''),
    quora: new FormControl('')
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

parental_supervision_required=[
  {
    name:"Parent attendance required",
    value:"Parent attendance required"
  },
  {
    name:"Parent attendance NOT required",
    value:"Parent attendance NOT required"
  },
  {
    name:"No data available",
    value:"No data available"
  },
]
program: any = new Program;
  tags: any[];
  capacity={
    min: 0,
    max: 0
  }
  constructor( private modalService: NgbModal,private wondrflyapiservice:WondrflyApiService,
    private apiservice:ApiServiceService,private activatedRoute: ActivatedRoute,  private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router:Router) {
      this.activatedRoute.params.subscribe(params => {
        this.id = params['id'];
      });
      this.activatedRoute.queryParams
      .subscribe(async (params: any) => {
      if(params.id){
        this.isEdit=true;
        this.programId=params.id
        this.getProgramById(this.programId)
      }
      });
    this.getCategories()
    this.getTags()
   }
 getProgramById(id){
  this.apiservice.getProgramById(id).subscribe((res:any)=>{
    this.program=res.data
    this.program.subCategoryIds=this.program.subCategoryIds.map((item:any)=>item._id)
    this.program.categoryId=this.program.categoryId.map((item:any)=>item._id)
    this.extraPrices=this.program.extraPrices
    this.capacity=this.program.capacity
    this.program.email=this.program.emails[0]
    if(this.program.last_reviewed){
    this.program.last_reviewed=this.parseISODate(this.program.last_reviewed)
    }
    this.getActivities()
})
}
getActivities() {
  this.apiservice.getProgramsActivity(this.programId).subscribe((res: any) => {
    if (res.isSuccess) {
      this.activityList = res.data;
    }
  })
}
items=[]
public onSelect(item) {
  console.log('tag selected: value is ' + item,this.items);
}
getAllCity(){
  // this.spinner.show(undefined,
  //   {
  //     type: 'ball-triangle-path',
  //     size: 'medium',
  //     bdColor: 'rgba(0, 0, 0, 0.8)',
  //     color: '#fff',
  //     fullScreen: true
  //   });
  this.apiservice.getAllCity(1000,1).subscribe((res: any) => {
    // this.spinner.hide();
    this.city_List = res?.data?.user
  })
}
  ngOnInit() {
    this. ageRange()
    this.getAllCity()
    // this.firstFormGroup = new FormGroup({
    //   name: new FormControl(['',]),
    //   type: new FormControl(['',]),
    //   categoryId: new FormControl(['',]),
    //   phoneNumber: new FormControl(['']),
    //   // subCategory: new FormControl(),
    //   subCategory: new FormControl(['',]),
    //   inpersonOrVirtual: new FormControl(['',]),
    //   indoorOroutdoor: new FormControl(['',]),
    //   description: new FormControl(['',]),
    //   specialInstructions: new FormControl(['',]),
    //   email: new FormControl(['', Validators.email]),
    //   presenter: new FormControl(['',]),
    //   ageGroup: new FormControl(['',]),
    //   startDate: new FormControl(['',]),
    //   endDate: new FormControl(['',]),
    //   startTime: new FormControl(['',]),
    //   endTime: new FormControl(['',]),
    //   isDateNotMention: new FormControl(false),
    //   isDayNotMention: new FormControl(false),
    //   isTimeNotMention: new FormControl(false),
    //   isproRated: new FormControl(false),
    //   dayss: new FormControl(['',]),
    //   isFree: new FormControl(false),
    //   isFreeTrial: new FormControl(false),
    //   days: new FormControl(['',]),
    //   pricePerParticipant: new FormControl(['',]),
    //   priceForSiblings: new FormControl(['',]),
    //   perTimePeriod: new FormControl(['',]),
    //   timePeriodDuration: new FormControl(['',]),
    //   extractionDate: new FormControl(['',]),
    //   adultAssistanceIsRequried: new FormControl(false),
    //   addresses: new FormControl(['',]),
    //   hours: new FormControl(['',]),
    //   joiningLink: new FormControl(['',]),
    //   location: new FormControl(['']),
    //   instructors: new FormControl(['']),
    //   locationOfActivity: new FormControl(['', this.program.privateOrGroup == 'private' && this.program.inpersonOrVirtual == 'Inperson' ? Validators.required : '']),
    //   city: new FormControl(['']),
    //   source: new FormControl(['',]),
    //   sourceUrl: new FormControl(['',]),
    //   cycle: new FormControl(['']),
    //   isExpired: new FormControl([false]),
    //   zip: new FormControl(['']),
    //   activeStatus: new FormControl(['']),
    //   per_hour_rate: new FormControl(['']),
    //   privateOrGroup: new FormControl(['']),
    //   offerDiscount: new FormControl(['']),
    //   last_reviewed: new FormControl(['']),
    //   program_last_reviewed: new FormControl(['']),
    //   cycle_time: new FormControl(['']),
    //   isParentJoin: new FormControl([false]),
    //   maxTravelDistance: new FormControl([Number]),
    //   totalSessionClasses: new FormControl([Number]),
    //   isParentGuardianRequire: new FormControl([false]),
    //   extractor_notes: new FormControl(['']),
    //   program_extractor_notes: new FormControl(['']),
    //   // proof_reader_notes: new FormControl(['']),
    //   isOpenForBooking: new FormControl(true),
    //   isChildCare: new FormControl([false]),
    //   isPriceNotMention: new FormControl([false]),
    //   ealryDrop: new FormControl([false]),
    //   lateDrop: new FormControl([false]),
    //   parentalSupervisionRequired: new FormControl(['']),
    //   maxNumberOfStudents: new FormControl(['']),
    //   skillGroup: new FormControl(['']),
    //   pricing: new FormControl(['']),
    //   pricePerUnit: new FormControl(['']),
    //   actualPrice: new FormControl(['']),
    // });

  }
 addActivity(){
  this.activity.date.from = `${moment(this.startDate).format('YYYY-MM-DD')}T09:00:26.184Z`
  this.activity.date.to = `${moment(this.endDate).format('YYYY-MM-DD')}T09:00:26.184Z`
  this.activity.last_reviewed = moment(this.last_reviewed).format('DD-MM-YYYY');
 }
  ageRange(){
    for(let i =2; i<18; i++){
      this.years_List.push(i)
    }
    for(let i =0; i<24; i++){
      this.months_List.push(i)
    }
    
  }
  activatedAgeClass(age, type) {
    if (type == 'year') {
      const index = this.program.ageGroup?.year.indexOf(age);
      if (index >= 0) {
        return true;
      }
      return false
    }
    if (type == 'month') {
      const index = this.program.ageGroup?.month.indexOf(age);
      if (index >= 0) {
        return true;
      }
      return false
    }

  }
  changeAge(indx, type) {
    if (type == 'year') {
      const index = this.program.ageGroup.year.indexOf(this.years_List[indx]);
      if (index >= 0) {
        this.program.ageGroup.year.splice(index, 1);
      }
      else {
        this.program.ageGroup.year.push(this.years_List[indx]);
      }
    }
    if (type == 'month') {
      const index = this.program.ageGroup.month.indexOf(this.months_List[indx]);
      if (index >= 0) {
        this.program.ageGroup.month.splice(index, 1);
      }
      else {
        this.program.ageGroup.month.push(this.months_List[indx]);
      }
    }
    console.log(this.program.ageGroup)
  }
  setActiveTab(tab) {
    this.activeTab = tab;
  }

  get ff() {
    return this.firstFormGroup.controls;
  }
  get acff() {
    return this.activityfirstFormGroup.controls;
  }
  get acSf() {
    return this.activitySecondFormGroup.controls;
  }
  get sf() {
    return this.secondForm.controls;
  }

  get inf() {
    return this.infoForm.controls;
  }
  priceAdd(){
    // this.firstFormGroupSubmitted = true;

    if (this.PriceFormGroup.invalid) {
      return;
    }
     this.extraPrices.push(this.PriceFormGroup.value);
     console.log('extraPrices',this.extraPrices)
     this.modalService.dismissAll()
  }
  onfirstFormGroupSubmit() {
    this.firstFormGroupSubmitted = true;
    if (this.firstFormGroup.invalid) {
      return;
    }
    this.setActiveTab('Program Features')
  }
  onActivityfirstFormGroupSubmit() {
    this.activityfirstFormGroupSubmitted = true;
    if (this.activityfirstFormGroup.invalid) {
      return;
    }
    this.setActiveTab('Activity Schedule')
  }
  onActivitySecondFormGroupSubmit() {
    this.activitySecondFormGroupSubmitted = true;
    if (this.activitySecondFormGroup.invalid) {
      return;
    }
    this.setActiveTab('For Internal Use')
  }
  onSecondFormSubmit() {
    this.secondFormSubmitted = true;
    console.log('secondForm',this.secondForm.value)
    if (this.secondForm.invalid) {
      this.requiredRecipients=true
      return;
    }
    this.setActiveTab('Program Pricing')
  }

  onInfoFormSubmit() {
    this.infoFormSubmitted = true;
    if (this.infoForm.invalid) {
      return;
    }
  }

  onSocialFormSubmit() {
    // if (this.socialForm.invalid) {
    //   return;
    // }
    
  }
  parseISODate(isoDateString) {
    const date = new Date(isoDateString);
    
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1, // Months are zero-based
      day: date.getDate()
    };
  }
  addProgram() {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
    this.program.extraPrices = this.extraPrices;
    this.program.userId = this.id;
    this.program.user = this.id;
    this.program.capacity=this.capacity
    this.program.emails=[this.program.email]
    if(this.program.last_reviewed){
      const date = new Date(this.program.last_reviewed.year, this.program.last_reviewed.month - 1, this.program.last_reviewed.day);
      // Convert the date to ISO string
     const isoDate = date.toISOString();
     this.program.last_reviewed=isoDate
    }
    if(this.isEdit){
      this.apiservice.updateProgram(this.program).subscribe((res: any) => {
        // this.loader.close();
        if (res.isSuccess === true) {
          this.spinner.hide();
          // this.programId = res.data._id || res.data.id;
          // // this.session.setItem("ag_", this.programId)
          // this.snack.open('Program Added successfully', 'OK', { duration: 5000 });
          // // this.route.navigate(['tables/program', this.id]);
          // this.isActivityTable = true;
          // this.stepChange('ACTIVITIES');
          this.router.navigate(['/programs-list',this.id]);
        }
        else{
          this.toastr.error('Something went wrong!')
        }
      });
    }
    else{
      this.apiservice.addProgram(this.program).subscribe((res: any) => {
        // this.loader.close();
        if (res.isSuccess === true) {
          this.spinner.hide();
          this.programId = res.data._id || res.data.id;
          // // this.session.setItem("ag_", this.programId)
          // this.snack.open('Program Added successfully', 'OK', { duration: 5000 });
          // // this.route.navigate(['tables/program', this.id]);
          // this.isActivityTable = true;
          // this.stepChange('ACTIVITIES');
          this.router.navigate(['/programs-list',this.id]);
        }
        else{
          this.toastr.error('Something went wrong!')
        }
      });
    }
    // this.loader.close();
  }

  addPrice(price?,i?) {
    if(price){
      price.index=i
    }
    // let dialogRef: MatDialogRef<any> = this.dialog.open(AddBatchComponent, {
    //   width: '60%',
    //   height:'400px',
    //   data:price?{price:price,extraPrices:this.extraPrices}:{extraPrices:this.extraPrices},
    //   disableClose: true,
    // })
    // dialogRef.afterClosed()
    //   .subscribe(res => {
    //     if (res) {
    //       if(res.mode=='add'){
    //         this.extraPrices.push(res.data)
    //       }
    //       else if(res.mode=='edit'){
    //         this.extraPrices[res.index]=res.data
    //       }
    //     }
    //   });
  }
  deletePrice(i){
    this.extraPrices.splice(i,1)
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
    console.log(this.program.categoryId)
    this.program_model.categoryId
  }
  getDateOptions(event){
    console.log(this.activity.dateOption)
  }
  getCategories() {
    this.wondrflyapiservice.getCategory("true").subscribe(res => {
      this.category_List = res;
      this.category_List = this.category_List.filter((item) => item.isActivated === true);
    })
  }
  getTags() {
    this.tags = []
    this.wondrflyapiservice.getTags().subscribe((res: any) => {
      this.tags = res;
      this.tags = this.tags.filter((item) => item.isActivated === true);
    });
  }
  getSubCategory(event){
    console.log(this.program.subCategoryIds)
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
    this.program.isFreeTrial = event.target.checked;
    console.log('Is Free Trial:', this.program.isFreeTrial);
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
