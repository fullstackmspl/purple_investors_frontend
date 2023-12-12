import { Component, ViewChild, OnInit, ElementRef, NgZone } from '@angular/core';
import { Validators,  FormGroup, FormBuilder } from '@angular/forms';

// import custom validator to validate that password and confirm password fields match
import { MustMatch } from '../../../shared/directives/must-match.validator';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiServiceService } from 'app/shared/services/api-service.service';
import { MapsAPILoader } from '@agm/core';
import { typePropertyIsNotAllowedMsg } from '@ngrx/store/src/models';

@Component({
  selector: 'app-register-page',
  templateUrl:'./register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})

export class RegisterPageComponent implements OnInit {
  userFormSubmitted=false;
  userForm: FormGroup;
  @ViewChild("search")
  public searchElementRef: ElementRef;
  address: string;
  latitude: number;
  longitude: number;
  zoom: number;
  private geoCoder;
  gender_List =[
    {name:'male'},
    {name:'female'}
  ]
  role_List =[
    {name:'SuperAdmin' ,_id:'superadmin'},
    {name:'Admin' ,_id:'admin'},
    {name:'MTurkers' ,_id:'mturkers'},
  ]
  select_gender = null
  select_role = null

  constructor(private formBuilder: FormBuilder,
    public toastr: ToastrService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    public apiService:ApiServiceService,
    private route:Router,
    ) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required],
      gender: ['', [Validators.required]],
      phone_number: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue],
      phone_code: ['+91', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  get rf() {
    return this.userForm.controls;
  }


  //  On submit click, reset field value
  // onSubmit() {
  //   this.userFormSubmitted = true;
  //   if (this.userForm.invalid) {
  //     return;
  //   }

  //   this.router.navigate(['/pages/login']);
  // }
  submit(){
    let body={
      fullname: this.userForm.value.fullname,
      email: this.userForm.value.email,
      dob: this.userForm.value.dob,
      gender: this.select_gender,
      phone_number: this.userForm.value.phone_number,
      password: this.userForm.value.password,
      roles: this.select_role
    }
      this.apiService.addUser(body).subscribe((res:any)=>{
        if(res?.isSuccess === true){
          this.toastr.success('user registered successfull!')
          this.route.navigate(['/login']);
        }
        else this.toastr.error(res?.error)
      })

  }
  getGenderId(event){
    this.select_gender
  }
  getRoleId(event){
    this.select_role
  }
  // locationAutoComplete() {
  //   this.mapsAPILoader.load().then(() => {
  //     this.geoCoder = new google.maps.Geocoder;
  
  //     let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef?.nativeElement);
  //     autocomplete.addListener('place_changed', () => {
  //       this.ngZone.run(() => {
  //         let place: google.maps.places.PlaceResult = autocomplete.getPlace();
  //         this.address = place.formatted_address;
  //         console.log('address', this.address)
  //         // verify result
  //         if (place.geometry === undefined || place.geometry === null) {
  //           return;
  //         }
  
  //         // set latitude, longitude and zoom
  //         this.latitude = place.geometry.location.lat();
  //         this.longitude = place.geometry.location.lng();
  //         this.zoom = 12;
  //         // if(this.emp_id){
  //         //   this.address = place.formatted_address;
  //         //   this.latitude = place.geometry.location.lat();
  //         //   this.longitude = place.geometry.location.lng();
  //         //   this.employee.address = this.address
  //         //   this.employee.lat = this.latitude
  //         //   this.employee.lng = this.longitude

  //         // }
  //         console.log("lat lng",this.latitude,this.longitude)
  //       });
  //     });
  //   });
  // }
 
}
