import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { DatatableComponent, ColumnMode } from '@swimlane/ngx-datatable';
import { Queue } from 'app/shared/models/queue.model';
import { ApiServiceService } from 'app/shared/services/api-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';
import swal from 'sweetalert2';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class QueueComponent implements OnInit {


  @ViewChild(DatatableComponent) table: DatatableComponent;

  queueForm:FormGroup

  page = {
    pageNumber:0,
    offset: 0,
    pageSize: 100,
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
  queue_model :any= new Queue

  type_List=[
    {name:'Manual',_id:'manual'},
    {name:'Chatgpt',_id:'chatgpt'}
  ]
  select_type = 'manual'
  status_List=[
    {name:'Pending',_id:'pending'},
    {name:'Accepted',_id:'accepted'},
    {name:'Decline',_id:'decline'},
  ]
  select_status = 'pending'
  select_city=null
  city_List =[]
  public queueUrlView: boolean[] = [];
  queue_url_id:any

  messages: { sender: string; text: string; isMe: boolean  }[] = [];
  newMessage: string = '';
  user:any
  json_data:any
  website_url:any

  provider={
    fullname:'',
    email: '',
    phone_number: '',
    dob:'',
    gender:'',
    location:{type:"Point",coordinates:[]},
    address: '',
    roles: 'purpleprovider',
    averageGoogleRating:'' ,
    averageYelpRating:'' ,
    bottomGoogleReviews : [],
    facebookNumberOfFollowers:'',
    facebookNumberOfLikes:'' ,
    facebookURL:'' ,
    googleReviewsURL:'' ,
    instagramProfileLink:'' ,
    mostRecentGoogleReviews:[], 
    numberOfGoogleReviews:'' ,
    numberOfInstagramFollowers:'' ,
    numberOfYelpRatings:'' ,
    topGoogleReviews : [],
    yelpBottomReviews :  [],
    yelpMostRecentReviews : [], 
    yelpTopReviews :  [], 
    yelpProfileURL:'',
    websiteUrl:''
  }
  constructor( public apiService:ApiServiceService,
               private modalService: NgbModal,
               public toastr: ToastrService,
               private spinner: NgxSpinnerService,private formBuilder : FormBuilder,
               private cdr: ChangeDetectorRef) { 
                this.user = JSON.parse(localStorage.getItem('user'))
                }

  ngOnInit(): void {
    this.getAllQueue()
    this.getAllCity()
    this.queueForm = this.formBuilder.group({
      cityId: ['', Validators.required],
      url: ['', [Validators.required]],
      notes: ['',],
      admin_notes: ['',],
     
    });
  }
  get rf() {
    return this.queueForm.controls;
  }
  getAllCity(){
    this.apiService.getAllCity(this.limitRef,this.page.pageNumber + 1).subscribe((res: any) => {
      this.city_List = res?.data?.user
    })
  }
  getAllQueue(){
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
    this.apiService.getAllQueue(this.limitRef,this.page.pageNumber + 1).subscribe((res: any) => {
      this.spinner.hide();
      this.rows = res?.data?.items
      this.page.totalPages = res?.data?.totalCount
    })
  }
  
  
  pageChangeData(page:any){
    this.apiService.getAllQueue(this.limitRef,page.offset +1).subscribe((res: any) => {
      this.rows = res?.data?.data
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
  
  deleteQueue(){
    if(this.row_id){
      this.apiService.deleteQueue(this.row_id).subscribe((res:any)=>{
        if(res?.statusCode ===200){
          swal.fire({
            icon: "success",
            title: 'Deleted!',
            text: `${res?.message}`,
            customClass: {
              confirmButton: 'btn btn-success'
            },
          })
          this.getAllQueue()
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
        this.deleteQueue()      
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
  openModal(content,rowdata,data,urlId) {
    if(rowdata){
      this.row_id = rowdata?._id
      this.queue_url_id = urlId
      this.row_name = rowdata.cityId[0].city
      // this.queue_model.admin_notes = data.admin_notes
      // this.queue_model.notes = data.notes
      // this.select_type = data.type
      // this.queue_model.type = this.select_type
      this.select_city = rowdata.cityId[0]?._id
      this.queue_model.cityId = this.select_city
      this.select_status = data.status
      this.queue_model.urls=[{url:data.url,status:data.status}]
     

      // this.queue_model.urls = data.url?.map(item => ({ url: item.url, status: item.status })) || [];
      // this.queue_model.urls = this.queue_model.urls.map(item => item.url).join(',');

      // ============================
    }
    const modalOptions: NgbModalOptions = {
      size: 'lg', // 'sm', 'lg', or 'xl'
      backdrop: 'static',
    };
    const modalRef = this.modalService.open(content,modalOptions);
    modalRef.result.then((result) => {
      this.queueForm.reset()
      this.row_id = null
    }, (reason) => {
      this.queueForm.reset()
      this.row_id = null
    });
  }
 
  addUser(){
    let urlArray = this.queueForm.value.url.split(',');
    urlArray = urlArray.map((u) => ({ url: u.trim(), status: this.select_status }));
      let body={
        cityId: this.select_city,
        urls: urlArray,
        notes: this.queueForm.value.notes,
        admin_notes: this.queueForm.value.admin_notes,
        type: this.select_type,
      }      

       if(!this.row_id){
        this.apiService.addQueue(body).subscribe((res:any)=>{
          if(res?.isSuccess === true){
            this.toastr.success('queue add successfull!')
            this.modalService.dismissAll()
            this.getAllQueue();
          }
          else this.toastr.error(res?.error)
        })
      }
      if(this.row_id){
        let urlArray = this.queue_model.urls.split(',');
        urlArray = urlArray.map((u) => ({ url: u.trim(), status: this.select_status }));
        this.queue_model.urls = urlArray
        this.apiService.updateQueue(this.row_id,this.queue_model).subscribe((res:any)=>{
          if(res?.isSuccess === true){
            this.toastr.success('queue update successfull!')
            this.modalService.dismissAll()
            this.getAllQueue();
          }
          else this.toastr.error(res?.error)
        })
      }
  }
  getStatusId(event){
    this.select_status
  }
  getTypeId(event){
    this.select_type
  }
  getCityId(event){
    this.select_city
  }
  updateStatus(id,urlId, status_id){

    let body={
      urls: {
        status: status_id
      }
    }
   if(id){
    this.apiService.updateQueueUrl(id,urlId,body).subscribe((res:any)=>{
      if(res.statusCode === 200){
        this.toastr.success('status update successfully')
        this.getAllQueue()
      }
      else{
        this.toastr.error(res.error)
      }
    })
   }
  }
  updateUrl(){
    // let urlArray = this.queue_model.urls.split(',');
    // urlArray = urlArray.map((u) => ({ url: u.trim(), status: this.select_status }));
    // this.queue_model.urls = urlArray
    let body ={
      urls: {
        url: this.queue_model.urls[0].url,
        status: this.select_status
      }
    }
   if(this.row_id){
    // this.apiService.updateQueueUrl(this.row_id,this.queue_url_id,body).subscribe((res:any)=>{
    //   if(res.statusCode === 200){
    //     this.toastr.success('update successfully')
    //     this.modalService.dismissAll()
    //     this.getAllQueue()
    //   }
    //   else{
    //     this.toastr.error(res.error)
    //   }
    // })
    this.queue_model.cityId = this.select_city
    this.apiService.updateQueue(this.row_id,this.queue_model).subscribe((res:any)=>{
      if(res?.isSuccess === true){
        this.toastr.success('queue update successfull!')
        this.modalService.dismissAll()
        this.getAllQueue();
      }
      else this.toastr.error(res?.error)
    })
   }
  }

  openModalForProvider(content,url) {
    this.newMessage = url
  
    this.spinner.show(undefined, {
      type: 'ball-triangle-path',
      size: 'medium',
      bdColor: 'rgba(0, 0, 0, 0.8)',
      color: '#fff',
      fullScreen: true
    });
    const modalOptions: NgbModalOptions = {
      size: 'lg', // 'sm', 'lg', or 'xl'
      backdrop: 'static',
    };
  
    if (!!this.newMessage.trim() ) {
      const exactMsg = `${this.newMessage} Please find name, email, phoneNumber and Locations (with lat lng), - from Open AI API in json format with fields as it is "fullname, email, phone_number, location:{coordinates:[lat,lng]}, address "`
     
      this.messages.push({ sender: 'You', text: this.newMessage, isMe: true });
      this.apiService.chatgptSearch('6578625ec5e9c2b1c8909c58',this.user._id,exactMsg).subscribe((res:any)=>{
        if(res?.isSuccess){
          this.spinner.hide()
          // this.ngZone.run(() => {
            const data = res?.data[0]?.message?.content;
            this.json_data = data
            this.setProvider()

            this.messages.push({ sender: 'ChatGpt', text:  data.match(/\{.*\}/s)&&data.match(/\{.*\}/s).length?this.generateHTML(JSON.parse(data.match(/\{.*\}/s)[0])):data , isMe: false });
            this.newMessage = ''; 
          // });
            this.cdr.detectChanges();
            const modalRef = this.modalService.open(content,modalOptions);
            modalRef.result.then((result) => {
              
            }, (reason) => {
            });
        }
        else this.toastr.error(res?.error)
      })
      
    }
  }
  generateHTML(data): string {
    let html = '<div>';

    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        let value = data[key];

        if (typeof value === 'object') {
          // Handle location separately
          if (key === 'location' && value.coordinates && value.coordinates.length === 2) {
            html += `<div><strong>${key}:</strong>: {lng: ${value.coordinates[0]}, lat: ${value.coordinates[1]}}</div>`;
          } else {
            html += `<div><strong>${key}:</strong>: ${this.generateHTML(value)}</div>`;
          }
        } else {
          html += `<div><strong>${key}:</strong> ${value}</div>`;
        }
      }
    }

    html += '</div>';
    return html;
  }

  setProvider(){
    let jsonString = this.json_data.match(/\{.*\}/s)[0];
    this.provider = JSON.parse(jsonString)
    this.provider.roles = 'purpleprovider'

  }
  async setAddress(addressData) {
      // console.log('address =>>',addressData)
      this.provider.location= {type:"Point",coordinates:[addressData[0].lng,addressData[0].lat]}
      this.provider.address= addressData[1].formatted_address

    if(!Array.isArray(addressData?.coordinates)){
      addressData = {...addressData,coordinates:Object.values(addressData.coordinates)}
    }
    this.provider.location = addressData || null;

    
  }
  details(data){
    try {
    
     this.provider.websiteUrl = this.website_url
       this.apiService.addUser(this.provider).subscribe((res:any)=>{
         if(res?.isSuccess === true){
           this.toastr.success('provider registered successfull!')
           this.modalService.dismissAll()
         }
         else this.toastr.error(res?.error)
         this.modalService.dismissAll();
       })
     
    } catch (error) {
     console.error('Error parsing JSON:', error);
    }
   }
  
}