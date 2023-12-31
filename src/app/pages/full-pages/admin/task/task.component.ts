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
    budget: '',
    status:'',
  }

  row_id:any
  row_name:any
  row_data:any
  task_list=[
    {name:'open'},
    {name:'in-review'},
    {name:'completed'},
    {name:'rejected'}
  ]
  users_list=[]
  selected_user=null
  provider_data_missing:any
  provider_data_review:any
  task_id:any
  user:any
  taskType:any
  keysWithNoValue:any ={}
  task_users:any
  constructor( public apiService:ApiServiceService,
               private modalService: NgbModal,
               public toastr: ToastrService,
               private spinner: NgxSpinnerService,private formBuilder : FormBuilder) {
                this.user = JSON.parse(localStorage.getItem('user'))
                }

  ngOnInit(): void {
    if(this.user.roles ==='mturkers'){
      this.getAllTaskByUser()
    }
    if(this.user.roles !=='mturkers'){
      this.getAllTask()
    }
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
      this.rows.reverse()
      this.page.totalPages = res?.data?.TotalCount

    })
  }
  getAllTaskByUser(){
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
    this.apiService.getTaskByUserId(this.user._id,this.limitRef,this.page.pageNumber + 1).subscribe((res: any) => {
      this.spinner.hide();
      this.rows = res?.data?.items
      this.rows.reverse()
      this.page.totalPages = res?.data?.totalCount

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
          if(this.user.roles ==='mturkers'){
            this.getAllTaskByUser()
          }
          if(this.user.roles !=='mturkers'){
            this.getAllTask()
          }
        }
        else this.toastr.error(res?.error)
      })
    }
    if(this.row_id){
      this.task_model.status = 'in-review'
      this.apiService.updateTask(this.row_id,this.task_model).subscribe((res:any)=>{
        if(res?.isSuccess === true){
          this.toastr.success('task update successfull!')
          this.modalService.dismissAll()
          if(this.user.roles ==='mturkers'){
            this.getAllTaskByUser()
          }
          if(this.user.roles !=='mturkers'){
            this.getAllTask()
          }
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
          if(this.user.roles ==='mturkers'){
            this.getAllTaskByUser()
          }
          if(this.user.roles !=='mturkers'){
            this.getAllTask()
          }
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
  openModalForAssignTo(content,id,rowId,taskUser) {
    this.selected_user =id
    this.task_users = taskUser
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
      let body
      if(this.task_users === 'Task Assign'){
        body={
          user :this.selected_user
        }
      }
      if(this.task_users === 'Task Review'){
        body={
          reviewUserId :this.selected_user
        }
      }

      
      this.apiService.updateTask(this.row_id,body).subscribe((res:any)=>{
        if(res?.isSuccess === true){
          this.toastr.success(`${this.task_users} to update successfull!`)
          this.modalService.dismissAll()
          if(this.user.roles ==='mturkers'){
            this.getAllTaskByUser()
          }
          if(this.user.roles !=='mturkers'){
            this.getAllTask()
          }
        }
        else this.toastr.error(res?.error)
      })
    }
  }
  openModalTaskType(content,data,id,task_type) {
    if(task_type === 'Please add any missing data for email, phone, and locations for this form'){
      this.taskType = 'missing data'
      this.provider_data_missing = data?.missing_fields
    }
    if(task_type === 'Please proofread the business name, email, phone, and locations to ensure their correctness on this form'){
      this.taskType = 'review data'
      this.provider_data_review = data?.add_fields
    }
    this.row_id = data?.user[0]?._id
    this.task_id = id
    const modalOptions: NgbModalOptions = {
      size: 'md', // 'sm', 'lg', or 'xl'
      backdrop: 'static',
    };
    const modalRef = this.modalService.open(content,modalOptions);
    modalRef.result.then((result) => { 

    this.provider_data_missing = null
    this.provider_data_review = null
    this.row_id = null
    this.task_id=null

    }, (reason) => {
    this.provider_data_missing = null
    this.provider_data_review = null
    this.row_id = null
    this.task_id=null
    });
  }
  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
  updateMissingProvider(){
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
      
      this.keysWithNoValue = this.getKeysWithNoValue(this.provider_data_missing)
      let body: { missing_fields: any };
      if(this.keysWithNoValue && this.keysWithNoValue.length>0){
         body={
          missing_fields: this.keysWithNoValue,
        }
      }
      else{
         body ={
          missing_fields: {},
        }
      }
      
    this.apiService.updateTask(this.task_id,body).subscribe((res:any)=>{
      if(res?.isSuccess){
        this.apiService.updateUser(this.row_id,this.provider_data_missing?this.provider_data_missing:this.provider_data_review).subscribe((res:any)=>{
          if(res?.isSuccess){
            this.spinner.hide()
            this.toastr.success("provider update successfull!")
            this.modalService.dismissAll()
            if(this.user.roles ==='mturkers'){
              this.getAllTaskByUser()
            }
            if(this.user.roles !=='mturkers'){
              this.getAllTask()
            }
          }
          else{ 
            this.toastr.error(res?.error) 
            this.spinner.hide()
          }
          
        })
      }
      else{ 
        this.toastr.error(res?.error) 
        this.spinner.hide()
      }
    })
   
  }
  updateReviewProvider(){
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
      this.apiService.updateUser(this.row_id,this.provider_data_review).subscribe((res:any)=>{
        if(res?.isSuccess){
          this.spinner.hide()
          this.toastr.success("provider update successfull!")
          this.modalService.dismissAll()
          if(this.user.roles ==='mturkers'){
            this.getAllTaskByUser()
          }
          if(this.user.roles !=='mturkers'){
            this.getAllTask()
          }
        }
        else{ 
          this.toastr.error(res?.error) 
          this.spinner.hide()
        }
        
      })
  }
  getKeysWithNoValue(obj) {
    return Object.entries(obj)
      .filter(([key, value]) => value === '' || value === null || value === undefined)
      .map(([key, value]) => ({ key, value }));
  }

}

