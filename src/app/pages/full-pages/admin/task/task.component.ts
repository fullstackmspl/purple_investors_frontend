import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { DatatableComponent, ColumnMode } from '@swimlane/ngx-datatable';
import { ApiServiceService } from 'app/shared/services/api-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TaskComponent implements OnInit {


  @ViewChild(DatatableComponent) table: DatatableComponent;

  taskForm:FormGroup

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
  task_model={
    name: '',
    description: '',
    task_date: new Date(),
    notes: '',
    admin_notes: '',
    working_hour: '',
    budget: ''
  }

  row_id:any
  row_name:any
  row_data:any
  task_list=[
    {name:'pending'},
    {name:'in-review'},
    {name:'completed'}
  ]
  users_list=[]
  selected_user=null
  provider={
    // fullname:'',
    // email: '',
    // phone_number: '',
    // dob:'',
    // gender:'',
    // location:{type:"Point",coordinates:[]},
    // address: '',
    roles: 'purpleprovider',
    // averageGoogleRating:'' ,
    // averageYelpRating:'' ,
    bottomGoogleReviews : [],
    // facebookNumberOfFollowers:'',
    // facebookNumberOfLikes:'' ,
    // facebookURL:'' ,
    // googleReviewsURL:'' ,
    // instagramProfileLink:'' ,
    mostRecentGoogleReviews:'', 
    // numberOfGoogleReviews:'' ,
    // numberOfInstagramFollowers:'' ,
    // numberOfYelpRatings:'' ,
    topGoogleReviews : [],
    yelpBottomReviews :  [],
    yelpMostRecentReviews : [], 
    yelpTopReviews :  [], 
    // yelpProfileURL:''
  }
  constructor( public apiService:ApiServiceService,
               private modalService: NgbModal,
               public toastr: ToastrService,
               private spinner: NgxSpinnerService,private formBuilder : FormBuilder) {
                }

  ngOnInit(): void {
    this.getAllTask()
    this.getAllUsers()
    this.taskForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', ],
      task_date: ['', ],
      notes: ['', ],
      admin_notes: ['', ],
      working_hour: ['', ],
      budget: ['', ]
    });

  }
  get rf() {
    return this.taskForm.controls;
  }
  getAllTask(){
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
    this.apiService.getAllTask(this.limitRef,this.page.pageNumber + 1).subscribe((res: any) => {
      this.spinner.hide();
      this.rows = res?.data?.data
      this.page.totalPages = res?.data?.TotalCount

    })
  }

  pageChangeData(page:any){
    this.apiService.getAllTask(this.limitRef,page.offset +1).subscribe((res: any) => {
      this.rows = res?.data?.user
      this.rows.reverse()
      this.page.totalPages = res?.data?.TotalCount
    })
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
  openModal(content,id,data) {
    if(id){
      this.row_id = id
      this.row_name = data.name
      // ============================
      this.task_model.name = data.name
      this.task_model.description = data.description
      this.task_model.task_date = data.task_date
      this.task_model.working_hour = data.working_hour
      this.task_model.budget = data.budget
      this.task_model.notes = data.notes
      this.task_model.admin_notes = data.admin_notes


    }
    const modalOptions: NgbModalOptions = {
      size: 'lg', // 'sm', 'lg', or 'xl'
      backdrop: 'static',
    };
    const modalRef = this.modalService.open(content,modalOptions);
    modalRef.result.then((result) => {

      this.row_id = null
    }, (reason) => {
      this.row_id = null
    });
  }

  addTask(){
    let body={
      name: this.taskForm.value.name,
      description: this.taskForm.value.description,
      task_date: new Date(),
      notes: this.taskForm.value.notes,
      admin_notes: this.taskForm.value.admin_notes,
      working_hour: this.taskForm.value.working_hour,
      budget: this.taskForm.value.budget

    }
     if(!this.row_id){
      this.apiService.addTask(body).subscribe((res:any)=>{
        if(res?.isSuccess === true){
          this.toastr.success('task added successfull!')
          this.modalService.dismissAll()
          this.getAllTask();
        }
        else this.toastr.error(res?.error)
      })
    }
    if(this.row_id){
      this.apiService.updateTask(this.row_id,this.task_model).subscribe((res:any)=>{
        if(res?.isSuccess === true){
          this.toastr.success('task update successfull!')
          this.modalService.dismissAll()
          this.getAllTask();
        }
        else this.toastr.error(res?.error)
      })
    }
  }
  deleteTask(){
    if(this.row_id){
      this.apiService.deleteTask(this.row_id).subscribe((res:any)=>{
        if(res?.statusCode ===200){
          swal.fire({
            icon: "success",
            title: 'Deleted!',
            text: `${res?.message}`,
            customClass: {
              confirmButton: 'btn btn-success'
            },
          })
          this.getAllTask()
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
   confirmDelete(id:any) {
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
        this.deleteTask()
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
  openModalView(content,data) {
    this.row_data = data
    const modalOptions: NgbModalOptions = {
      size: 'lg', // 'sm', 'lg', or 'xl'
      backdrop: 'static',
    };
    const modalRef = this.modalService.open(content,modalOptions);
    modalRef.result.then((result) => {

    }, (reason) => {
    });
  }
  updateStatus(id,status){
    let body ={
      status:status
    }
    if(id){
      this.apiService.updateTask(id,body).subscribe((res:any)=>{
        if(res?.isSuccess === true){
          this.toastr.success('status update successfull!')
          this.modalService.dismissAll()
          this.getAllTask();
        }
        else this.toastr.error(res?.error)
      })
    }
  }
  getAllUsers(){
    this.apiService.getAllUsers(this.limitRef,this.page.pageNumber + 1).subscribe((res: any) => {
      this.users_list = res?.data?.data
    })
  }
  getSelectedUserId(event){
    this.selected_user
  }
  openModalForAssignTo(content,id,rowId) {
    this.selected_user =id
    this.row_id =rowId
    const modalOptions: NgbModalOptions = {
      size: 'md', // 'sm', 'lg', or 'xl'
      backdrop: 'static',
    };
    const modalRef = this.modalService.open(content,modalOptions);
    modalRef.result.then((result) => { 

      this.selected_user = null
    }, (reason) => {
      this.selected_user = null
    });
  }
  updateAssignTo(){
    if(this.row_id){
      let body={
        user :this.selected_user
      }
      this.apiService.updateTask(this.row_id,body).subscribe((res:any)=>{
        if(res?.isSuccess === true){
          this.toastr.success('task assign to update successfull!')
          this.modalService.dismissAll()
          this.getAllTask();
        }
        else this.toastr.error(res?.error)
      })
    }
  }
  openModalContentProvider(content,data){
    this.row_id = data?.user[0]?._id
    this.row_data =  data?.missing_fields
    // console.log('data =>',data?.missing_fields)
    console.log('data',this.row_data)


    // this.provider.address = data?.address
    // this.provider.location = data?.location
    // this.provider.fullname = data?.fullname
    // this.provider.email = data?.email
    // this.provider.phone_number = data?.phone_number
    // this.provider.dob = '2000-01-01'
    // this.provider.gender = 'male'
    // this.provider.roles ='purpleprovider'
    // this.provider.averageGoogleRating = data?.averageGoogleRating
    // this.provider.averageYelpRating = data?.averageYelpRating
    this.provider.bottomGoogleReviews = data?.bottomGoogleReviews
    // this.provider.facebookNumberOfFollowers = data?.facebookNumberOfFollowers
    // this.provider.facebookNumberOfLikes = data?.facebookNumberOfLikes
    // this.provider.facebookURL = data?.facebookURL
    // this.provider.googleReviewsURL = data?.googleReviewsURL
    // this.provider.instagramProfileLink = data?.instagramProfileLink
    this.provider.mostRecentGoogleReviews = data?.mostRecentGoogleReviews
    // this.provider.numberOfGoogleReviews = data?.numberOfGoogleReviews
    // this.provider.numberOfInstagramFollowers = data?.numberOfInstagramFollowers
    // this.provider.numberOfYelpRatings = data?.numberOfYelpRatings
    this.provider.topGoogleReviews = data?.topGoogleReviews
    this.provider.yelpTopReviews = data?.yelpTopReviews
    this.provider.yelpBottomReviews = data?.yelpBottomReviews
    this.provider.yelpMostRecentReviews = data?.yelpMostRecentReviews
    // this.provider.yelpProfileURL = data?.yelpProfileURL
    const modalOptions: NgbModalOptions = {
      size: 'lg', // 'sm', 'lg', or 'xl'
      backdrop: 'static',
    };
    const modalRef = this.modalService.open(content,modalOptions);
    modalRef.result.then((result) => { 

      this.row_id = null
    }, (reason) => {
      this.row_id = null
    });
  }
  // submit(){
  //   // console.log('id', this.row_id);
  //   // console.log('provider', this.provider);
  //   this.apiService.updateUser(this.row_id,this.provider).subscribe((res:any)=>{
  //     if(res?.isSuccess === true){
  //       this.toastr.success('provider update successfull')
  //       this.spinner.hide()
  //       this.modalService.dismissAll()
  //       this.getAllUsers()
  //     }
  //     else this.toastr.error(res?.error)
      
  //   })
  
  // }
  closeModal(){
    this.spinner.hide()
    this.modalService.dismissAll()
  }
}

