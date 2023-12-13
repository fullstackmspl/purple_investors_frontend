import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { DatatableComponent, ColumnMode } from '@swimlane/ngx-datatable';
import { ApiServiceService } from 'app/shared/services/api-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ListComponent implements OnInit {

  @ViewChild(DatatableComponent) table: DatatableComponent;

  userForm:FormGroup

  page = {
    pageNumber:0,
    offset: 0,
    pageSize: 10,
    totalPages:0
  };
  // row data
  public rows = [];
  public filterRows=[];
  public ColumnMode = ColumnMode;
  public limitRef = 100;
  public columns = [
    { name: "Name", prop: "name" },
    { name: "Email", prop: "email" },
    { name: "Phone", prop: "phone_number" },
    { name: "Actions", prop: "Actions" },
  ];


  imageUrl='';
  
  row_id:any
  row_name:any
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
  user_model = {
    fullname:'',
      email: '',
      dob: '',
      gender: '',
      phone_number: '',
      password: '',
      confirmPassword: '',
      phone_code: '+91',
      roles:''
  }
  constructor( public apiService:ApiServiceService,
               private modalService: NgbModal,
               public toastr: ToastrService,
               private spinner: NgxSpinnerService,private formBuilder : FormBuilder) { 
                }

  ngOnInit(): void {
    this.getAllUsers()
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
    });
  }
  get rf() {
    return this.userForm.controls;
  }
  getAllUsers(){
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
    this.apiService.getAllUsers(this.limitRef,this.page.pageNumber + 1).subscribe((res: any) => {
      this.spinner.hide();
      this.rows = res?.data?.data
      this.page.totalPages = res?.data?.TotalCount
     
    })
  }
  
  
  pageChangeData(page:any){
    // this.apiService.getTagsList(page.offset +1,page.pageSize).subscribe((res:any)=>{
    //   this.rows=res.data.items
    //   this.page.totalPages=res.data.totalCount
  
    // })
  }
  getTagsFilter(data:any){
    // let search=data
    // if(search){
    //   this.apiService.getTagSearch(search).subscribe((res:any)=>{
    //     this.rows=res.data
    //   })
    // }
    // else{
    //   this.getAllTag()
    // }
  }
  resetFilter(){
    // this.inputName.nativeElement.value=''
    // this.selected_tag_cat_id ='all'
    // this.getAllTag()
  }
  editTag(id:any){
  }
  deleteUser(){
    if(this.row_id){
      this.apiService.deleteUser(this.row_id).subscribe((res:any)=>{
        if(res?.statusCode ===200){
          swal.fire({
            icon: "success",
            title: 'Deleted!',
            text: `${res?.message}`,
            customClass: {
              confirmButton: 'btn btn-success'
            },
          })
          this.getAllUsers()
        }
        else{
          this.toastr.error(res.error)
        } 
        })
    }
    else{
      this.toastr.error('something went wrong !!')
    }
  }
   // ================== Delete Alert ========================
   ConfirmColor(id:any) {
    this.row_id=id
    swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2F8BE6',
      cancelButtonColor: '#F55252',
      confirmButtonText: 'Yes, delete it!',
      customClass: {
        confirmButton: 'btn btn-warning',
        cancelButton: 'btn btn-danger ml-1'
      },
      buttonsStyling: false,
    }).then( (result)=> {
      if (result.value) {  
        this.deleteUser()      
      } else if (result.dismiss === swal.DismissReason.cancel) {
        swal.fire({
          title: 'Cancelled',
          text: 'Your file is safe :)',
          icon: 'error',
          customClass: {
            confirmButton: 'btn btn-success'
          },
        })
      }
    });
  }
  
  // ==========================================
  openModal(content,id,data) {
    if(id){
      console.log('data', data);
      this.row_id = id
      this.row_name = data.fullname
      
      // ============================
      this.user_model.fullname = data.fullname
      this.user_model.email = data.email
      this.user_model.dob = data.dob
      this.user_model.phone_number = data.phone_number
      this.select_gender = data.gender
      this.user_model.gender = this.select_gender
      this.select_role = data.roles
      this.user_model.roles =  this.select_role
    }
    const modalOptions: NgbModalOptions = {
      size: 'lg', // 'sm', 'lg', or 'xl'
      backdrop: 'static',
    };
    const modalRef = this.modalService.open(content,modalOptions);
    modalRef.result.then((result) => {
      this.userForm.reset()
      this.select_gender = null
      this.select_role = null
      this.row_id = null
    }, (reason) => {
      this.userForm.reset()
      this.select_gender = null
      this.select_role = null
      this.row_id = null
    });
  }
  getGenderId(event){
    this.select_gender
  }
  getRoleId(event){
    this.select_role
  }
  addUser(){
      let body={
        fullname: this.userForm.value.fullname,
        email: this.userForm.value.email,
        dob: this.userForm.value.dob,
        gender: this.select_gender,
        phone_number: this.userForm.value.phone_number,
        password: this.userForm.value.password,
        roles: this.select_role
      }
       if(!this.row_id){
        this.apiService.addUser(body).subscribe((res:any)=>{
          if(res?.isSuccess === true){
            this.toastr.success('user registered successfull!')
            this.modalService.dismissAll()
            this.getAllUsers();
          }
          else this.toastr.error(res?.error)
        })
      }
      if(this.row_id){
        this.apiService.updateUser(this.row_id,this.user_model).subscribe((res:any)=>{
          if(res?.isSuccess === true){
            this.toastr.success('user update successfull!')
            this.modalService.dismissAll()
            this.getAllUsers();
          }
          else this.toastr.error(res?.error)
        })
      }
  }


}