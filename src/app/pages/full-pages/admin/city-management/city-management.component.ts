import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { DatatableComponent, ColumnMode } from '@swimlane/ngx-datatable';
import { ApiServiceService } from 'app/shared/services/api-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2';

@Component({
  selector: 'app-city-management',
  templateUrl: './city-management.component.html',
  styleUrls: ['./city-management.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CityManagementComponent implements OnInit {

 
  @ViewChild(DatatableComponent) table: DatatableComponent;

  cityForm:FormGroup

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
  city_model={
    country: '',
    state: '',
    city: '',
    zipcode: '',
  }
 
  row_id:any
  row_name:any
  constructor( public apiService:ApiServiceService,
               private modalService: NgbModal,
               public toastr: ToastrService,
               private spinner: NgxSpinnerService,private formBuilder : FormBuilder) { 
                }

  ngOnInit(): void {
    this.getAllCity()
    this.cityForm = this.formBuilder.group({
      country: ['', Validators.required],
      state: ['', [Validators.required, Validators.email]],
      city: ['', Validators.required],
      zipcode: ['', [Validators.required]],
    });
   
  }
  get rf() {
    return this.cityForm.controls;
  }
  getAllCity(){
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
    this.apiService.getAllCity(this.limitRef,this.page.pageNumber + 1).subscribe((res: any) => {
      this.spinner.hide();
      this.rows = res?.data?.user
      this.rows.reverse()
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
  openModal(content,id,data) {
    if(id){
      this.row_id = id
      this.row_name = data.city
      // ============================
      this.city_model.country = data.country
      this.city_model.state = data.state
      this.city_model.city = data.city
      this.city_model.zipcode = data.zipcode
     
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

  addCity(){
    let body={
      country: this.cityForm.value.country,
      state: this.cityForm.value.state,
      city: this.cityForm.value.city,
      zipcode: this.cityForm.value.zipcode,
      
    }
     if(!this.row_id){
      this.apiService.addCity(body).subscribe((res:any)=>{
        if(res?.isSuccess === true){
          this.toastr.success('city added successfull!')
          this.modalService.dismissAll()
          this.getAllCity();
        }
        else this.toastr.error(res?.error)
      })
    }
    if(this.row_id){
      this.apiService.updateCity(this.row_id,this.city_model).subscribe((res:any)=>{
        if(res?.isSuccess === true){
          this.toastr.success('city update successfull!')
          this.modalService.dismissAll()
          this.getAllCity();
        }
        else this.toastr.error(res?.error)
      })
    }
  }
  deleteCity(){
    if(this.row_id){
      this.apiService.deleteCity(this.row_id).subscribe((res:any)=>{
        if(res?.statusCode ===200){
          swal.fire({
            icon: "success",
            title: 'Deleted!',
            text: `${res?.message}`,
            customClass: {
              confirmButton: 'btn btn-success'
            },
          })
          this.getAllCity()
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
        this.deleteCity()      
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
  

}
 
 