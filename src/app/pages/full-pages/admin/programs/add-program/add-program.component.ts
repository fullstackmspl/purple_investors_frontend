import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-program',
  templateUrl: './add-program.component.html',
  styleUrls: ['./add-program.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddProgramComponent implements OnInit {

  activeTab = "general";
  generalFormSubmitted = false;
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
  months_List=[
    {name:'0',_id:'0'},
    {name:'1',_id:'1'},
    {name:'2',_id:'2'},
    {name:'3',_id:'3'},
    {name:'4',_id:'4'},
    {name:'5',_id:'5'},
    {name:'6',_id:'6'},
    {name:'7',_id:'7'},
    {name:'8',_id:'8'},
    {name:'9',_id:'9'},
    {name:'10',_id:'10'},
    {name:'11',_id:'11'},
    {name:'12',_id:'12'},
    {name:'13',_id:'13'},
    {name:'14',_id:'14'},
    {name:'15',_id:'15'},
    {name:'16',_id:'16'},
    {name:'17',_id:'17'},
    {name:'18',_id:'18'},
    {name:'19',_id:'19'},
    {name:'20',_id:'20'},
    {name:'21',_id:'21'},
    {name:'22',_id:'22'},
    {name:'23',_id:'23'},
  ]
  years_List=[
    {name:'2',_id:'2'},
    {name:'3',_id:'3'},
    {name:'4',_id:'4'},
    {name:'5',_id:'5'},
    {name:'6',_id:'6'},
    {name:'7',_id:'7'},
    {name:'8',_id:'8'},
    {name:'9',_id:'9'},
    {name:'10',_id:'10'},
    {name:'11',_id:'11'},
    {name:'12',_id:'12'},
    {name:'13',_id:'13'},
    {name:'14',_id:'14'},
    {name:'15',_id:'15'},
    {name:'16',_id:'16'},
    {name:'17',_id:'17'},
  ]
  maxnumber_student_List=[
    {name:"Maximum number of kids a single class/session/lesson can accommodate"},
    {name:"No Capacity info"},

  ]
  generalForm = new UntypedFormGroup({
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

  constructor( private modalService: NgbModal,) { }

  ngOnInit() {
  }

  setActiveTab(tab) {
    this.activeTab = tab;
  }

  get gf() {
    return this.generalForm.controls;
  }

  get cpf() {
    return this.changePasswordForm.controls;
  }

  get inf() {
    return this.infoForm.controls;
  }

  onGeneralFormSubmit() {
    this.generalFormSubmitted = true;
    if (this.generalForm.invalid) {
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

}

