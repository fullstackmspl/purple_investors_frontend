import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { DatatableComponent, ColumnMode } from '@swimlane/ngx-datatable';
import { setPageNumber } from 'app/App Store/actions/pageChange.actions';
import { AppState } from 'app/App Store/state';
import { ApiServiceService } from 'app/shared/services/api-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import swal from 'sweetalert2';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ProviderComponent implements OnInit {


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

  row_data:any
  isBasicEdit : boolean=false
  isAnalyticsEdit : boolean=false


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
    yelpProfileURL:''
  }
  messages: { sender: string; text: string; isMe: boolean  }[] = [];

  newMessage: string = 'https://academyofexcellencepreschool.com/';
  json_data:any
  user:any
  row_id:any
  cityId:string="6578546cc5e9c2b1c8909c24";
  filteredData: any;
  providerId: any;
  city_List =[]
  activePage = 1
  filter_List =[
    {name:'By Name' ,id:'byName'},
    {name:'Latest' ,id:'byDate'}
  ]
  selected_filter ='byName'
  status_List = [
    { name: 'Unverfied', _id: 'Unverfied' },
    { name: 'Verified', _id: 'Verified' },
    { name: 'Archived', _id: 'Archived' },
  ]
  activeTab:any
  users_list=[]
  input_option ={}
  task_Assign = null
  task_Review = null
  provider_name: any;
  searchVal
  @ViewChild('name') inputName

  pageNumberSubscription : Subscription
  pageNo
  constructor( public apiService:ApiServiceService,
               private modalService: NgbModal,
               public toastr: ToastrService,
               private router:Router,private activatedRoute: ActivatedRoute,
               private spinner: NgxSpinnerService,private formBuilder : FormBuilder,
               private cdr: ChangeDetectorRef, private store: Store<AppState>) { 
                this.user = JSON.parse(localStorage.getItem('user'))

                this.activatedRoute.queryParams
                .subscribe((params: any) => {
                  this.activeTab = params['status'];
                  this.pageNo = +params['page'];
                  if(this.pageNo>0){
                    this.setPage(this.pageNo);
                  }
                  else this.page.pageNumber = this.pageNo?this.pageNo-1:0
                })
                this.pageNumberSubscription = this.store.select(state => state.page.pageNumber)
                .subscribe(pageNumber => {
                  this.page.pageNumber = pageNumber;
                  if(pageNumber !==undefined){
                    this.page.pageNumber = pageNumber ?  pageNumber-1 :0
                  }
                });

                if(!this.activeTab) this.activeProviderTab('Unverfied',this.pageNo?this.pageNo:1)

                }

  ngOnInit(): void {
    this.setAndGetProviderbyStatus()
    this.getAllCity()
    this.getOnlyUsers()
  }
  setPage(pageNumber: number) {
    this.store.dispatch(setPageNumber({ pageNumber }));
  }
  activeProviderTab(tab,page) {
    if(page<1){ page =1}
    const activetab = tab;
    if (activetab !== '') {
      this.router.navigate(
        [],
        { relativeTo: this.activatedRoute, queryParams: { status: activetab ,  page : page },queryParamsHandling: 'merge' }
      );
    }

  }
  setAndGetProviderbyStatus() {
    this.activatedRoute.queryParams
      .subscribe((params: any) => {
        this.activeTab = params?.status;
        switch (this.activeTab) {
          case 'Unverfied':
            this.getAllUsers(this.activeTab);
            break;
          case 'Verified':
            this.getAllUsers(this.activeTab);
            break
          case 'Archived':
            this.getAllUsers(this.activeTab);
            break;

        }
      })
  }
  get rf() {
    return this.userForm.controls;
  }
  getAllUsers(status){
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
    this.apiService.getAllProviders(this.cityId,this.selected_filter,status,this.limitRef, this.page.pageNumber + 1).subscribe((res: any) => {
      this.spinner.hide();
      this.rows = res?.data?.data
      this.page.totalPages = res?.data?.TotalCount
     
    })
  }
  
  
  pageChangeData(page:any){
    this.activePage = page.offset + 1
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { page: page.offset +1 },
      queryParamsHandling: 'merge' // keep existing query params
    });
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
    this.apiService.getAllProviders(this.cityId,this.selected_filter,this.activeTab,this.limitRef,page.offset + 1).subscribe((res: any) => {
      this.spinner.hide();
      this.setPage(page.offset + 1)
      this.rows = res?.data?.data
      this.page.totalPages = res?.data?.TotalCount
     
    })
  }
 
  openModal(content,data) {
    this.row_data = data
    this.row_id = data._id
    this.provider = data
    const modalOptions: NgbModalOptions = {
      size: 'lg', // 'sm', 'lg', or 'xl'
      backdrop: 'static',
    };
    const modalRef = this.modalService.open(content,modalOptions);
    modalRef.result.then((result) => {
      this.row_id = null
      this.row_data = null
      this.provider = null
      this.isAnalyticsEdit = false
      this.isBasicEdit = false
    }, (reason) => {
      this.row_id = null
      this.row_data = null
      this.provider = null
      this.isAnalyticsEdit = false
      this.isBasicEdit = false
    });
  }
  async sendMessage() {
    if (this.newMessage.trim() !== '') {
      this.spinner.show(undefined,
        {
          type: 'ball-triangle-path',
          size: 'medium',
          bdColor: 'rgba(0, 0, 0, 0.8)',
          color: '#fff',
          fullScreen: true
        });
      // const exactMsg = `${this.newMessage} Please find name, email, phoneNumber and Locations (with lat lng), - from Open AI API in json format with fields as it is "fullname, email, phone_number, location:{coordinates:[lat,lng]}, address "`
      const exactMsg2 =`${this.newMessage} Please find Google Reviews URL as string,Number of Google Reviews as string,Average Google Rating as string,3 Top (Highest rated) Google reviews as string,3 Bottom (Lowest rated) Google reviews as string,3 Most Recent Google Reviews as string, Facebook URL,Facebook Number of Followers as string,Facebook Number of likes as string,Yelp Profile URL,Number of Yelp ratings as string,Average Yelp rating as string, 3 Yelp Top (Highest rated) reviews as string,3 Yelp Bottom (Lowest rated) reviews as string,3 Yelp Most Recent Reviews as string,Instagram Profile Link as string,Number of Instagram Followers as string  and i need fields as it is "fullname, email, phone_number, location, address, roles, averageGoogleRating, averageYelpRating, bottomGoogleReviews, facebookNumberOfFollowers, facebookNumberOfLikes, facebookURL, googleReviewsURL, instagramProfileLink, mostRecentGoogleReviews, numberOfGoogleReviews, numberOfInstagramFollowers, numberOfYelpRatings, topGoogleReviews, yelpBottomReviews, yelpMostRecentReviews, yelpTopReviews, yelpProfileURL from Open AI API in json format"`
      this.messages.push({ sender: 'You', text: this.newMessage, isMe: true });
      this.apiService.chatgptSearch('6578625ec5e9c2b1c8909c58',this.user._id,exactMsg2).subscribe((res:any)=>{
        if(res?.isSuccess){
          this.spinner.hide()
          // this.ngZone.run(() => {
            const data = res?.data[0]?.message?.content;
            this.json_data = data
            this.messages.push({ sender: 'ChatGpt', text:  data.match(/\{.*\}/s)&&data.match(/\{.*\}/s).length?this.generateHTML(JSON.parse(data.match(/\{.*\}/s)[0])):data , isMe: false });
            this.newMessage = ''; 
          // });
          this.setProvider()
            this.cdr.detectChanges();
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
    for (let key in this.provider) {
      if (this.provider.hasOwnProperty(key)) {
        this.provider[key]=this.convertToString(this.provider[key])
      }
  }
  }
  setProvider1(){
    let jsonString = this.json_data.match(/\{.*\}/s);
    this.provider = JSON.parse(jsonString)
    this.provider.roles = 'purpleprovider'
    for (let key in this.provider) {
      if (this.provider.hasOwnProperty(key)) {
        this.provider[key]=this.convertToString(this.provider[key])
      }
  }
  }

goToPrograms(user) {
  this.router.navigate(['/programs-list', user._id]);
}

openModalForProvider(content, id,row_data) {
  this.row_id = id

  if(!row_data.websiteUrl || row_data.websiteUrl === undefined){
    this.toastr.error('website url missing!')
  }

  if(row_data.websiteUrl !== undefined && row_data.type ==='chatgpt'){
    this.spinner.show(undefined, {
      type: 'ball-triangle-path',
      size: 'medium',
      bdColor: 'rgba(0, 0, 0, 0.8)',
      color: '#fff',
      fullScreen: true
    });
    // if (this.newMessage.trim() !== '') {
      const exactMsg2 = `${row_data?.websiteUrl} please find exact data in type string format such as Google Reviews URL,Number of Google Reviews,Average Google Rating,3 Top (Highest rated) Google reviews,3 Bottom (Lowest rated) Google reviews,3 Most Recent Google Reviews, Facebook URL,Facebook Number of Followers,Facebook Number of likes,Yelp Profile URL,Number of Yelp ratings,Average Yelp rating, 3 Yelp Top (Highest rated) reviews,3 Yelp Bottom (Lowest rated) reviews,3 Yelp Most Recent Reviews,Instagram Profile Link,Number of Instagram Followers  and i need fields as it is "fullname, email, phone_number, location, address, roles, averageGoogleRating, averageYelpRating, bottomGoogleReviews, facebookNumberOfFollowers, facebookNumberOfLikes, facebookURL, googleReviewsURL, instagramProfileLink, mostRecentGoogleReviews, numberOfGoogleReviews, numberOfInstagramFollowers, numberOfYelpRatings, topGoogleReviews, yelpBottomReviews, yelpMostRecentReviews, yelpTopReviews, yelpProfileURL from Open AI API in json format"`;
  
      // this.messages.push({ sender: 'You', text: this.newMessage, isMe: true });
  
      this.apiService
        .chatgptSearch('6578625ec5e9c2b1c8909c58', this.user._id, exactMsg2)
        .pipe(
          finalize(() => {
            // Hide spinner regardless of API success or failure
            this.spinner.hide();
          })
        )
        .subscribe(
          (res: any) => {
            if (res?.isSuccess) {
              const data = res?.data[0]?.message?.content;
              this.json_data = data;
              this.newMessage = '';
  
              this.setProvider();
              this.cdr.detectChanges();
              this.provider.address = row_data?.address
              // this.provider.location = row_data?.location
              this.provider.fullname = row_data?.fullname
              this.provider.email = row_data?.email
              this.provider.phone_number = row_data?.phone_number
              this.provider.dob = '2000-01-01'
              this.provider.gender = 'male'
              this.provider.roles ='purpleprovider'
              // Open NgbModal after API response
              const modalOptions: NgbModalOptions = {
                size: 'lg', // 'sm', 'lg', or 'xl'
                backdrop: 'static',
              };
              const modalRef = this.modalService.open(content, modalOptions);
              modalRef.result.then(
                (result) => {
                  // Modal closed
                  this.row_id = null
                  row_data = null
                },
                (reason) => {
                  // Modal dismissed
                  this.row_id = null
                  row_data = null
                }
              );
            } else {
              this.toastr.error(res?.error);
            }
          },
          (error) => {
            // Handle API error if needed
            this.toastr.error('website url missing!')
  
          }
        );
    // }
  }
  if(row_data.websiteUrl !== undefined && row_data.type ==='gemini'){
    this.spinner.show(undefined, {
      type: 'ball-triangle-path',
      size: 'medium',
      bdColor: 'rgba(0, 0, 0, 0.8)',
      color: '#fff',
      fullScreen: true
    });
    // if (this.newMessage.trim() !== '') {
      const exactMsg2 = `${row_data?.websiteUrl} please find exact data in type string format such as Google Reviews URL,Number of Google Reviews,Average Google Rating,3 Top (Highest rated) Google reviews,3 Bottom (Lowest rated) Google reviews,3 Most Recent Google Reviews, Facebook URL,Facebook Number of Followers,Facebook Number of likes,Yelp Profile URL,Number of Yelp ratings,Average Yelp rating, 3 Yelp Top (Highest rated) reviews,3 Yelp Bottom (Lowest rated) reviews,3 Yelp Most Recent Reviews,Instagram Profile Link,Number of Instagram Followers  and i need fields as it is "fullname, email, phone_number, location, address,averageGoogleRating, averageYelpRating, bottomGoogleReviews, facebookNumberOfFollowers, facebookNumberOfLikes, facebookURL, googleReviewsURL, instagramProfileLink, mostRecentGoogleReviews, numberOfGoogleReviews, numberOfInstagramFollowers, numberOfYelpRatings, topGoogleReviews, yelpBottomReviews, yelpMostRecentReviews, yelpTopReviews, yelpProfileURL from Vertex AI in json format"`;
  
      // this.messages.push({ sender: 'You', text: this.newMessage, isMe: true });
  
      this.apiService
        .geminiSearch(exactMsg2,this.user._id)
        .pipe(
          finalize(() => {
            // Hide spinner regardless of API success or failure
            this.spinner.hide();
          })
        )
        .subscribe(
          (res: any) => {
            if (res?.isSuccess) {
              const data = res?.data;
              this.json_data = data;
              this.newMessage = '';
              this.cdr.detectChanges();

              this.setProvider1();

              this.provider.address = row_data?.address
              // this.provider.location = row_data?.location
              this.provider.fullname = row_data?.fullname
              this.provider.email = row_data?.email
              this.provider.phone_number = row_data?.phone_number
              this.provider.dob = '2000-01-01'
              this.provider.gender = 'male'
              this.provider.roles ='purpleprovider'
              // Open NgbModal after API response
              const modalOptions: NgbModalOptions = {
                size: 'lg', // 'sm', 'lg', or 'xl'
                backdrop: 'static',
              };
              const modalRef = this.modalService.open(content, modalOptions);
              modalRef.result.then(
                (result) => {
                  // Modal closed
                  this.row_id = null
                  row_data = null
                },
                (reason) => {
                  // Modal dismissed
                  this.row_id = null
                  row_data = null
                }
              );
            } else {
              this.toastr.error(res?.error);
            }
          },
          (error) => {
            // Handle API error if needed
            this.toastr.error('website url missing!')
  
          }
        );
    // }
  }
}
convertToString(input) {
  if (Array.isArray(input)) {
    if (input.every(item => typeof item === 'object')) {
      return input.map(obj => Object.entries(obj).map(([key, value]) => `${key}:${value}`).join(',')).join(',');
    } else {
      return input.join(',');
    }
  } else if (typeof input === 'object' && input !== null) {
    return Object.entries(input)
      .map(([key, value]) => `${key}:${value}`)
      .join(',');
  } else {
    return String(input);
  }
}
submit(){
  // console.log('id', this.row_id);
  this.provider.yelpTopReviews =  this.provider.yelpTopReviews ? this.provider.yelpTopReviews : []
  this.provider.yelpMostRecentReviews=  this.provider.yelpMostRecentReviews? this.provider.yelpMostRecentReviews: []
  this.provider.yelpBottomReviews =  this.provider.yelpBottomReviews ? this.provider.yelpBottomReviews : []
  this.provider.topGoogleReviews =  this.provider.topGoogleReviews ? this.provider.topGoogleReviews : []
  this.provider.mostRecentGoogleReviews =  this.provider.mostRecentGoogleReviews ? this.provider.mostRecentGoogleReviews : []
  this.provider.bottomGoogleReviews =  this.provider.bottomGoogleReviews ? this.provider.bottomGoogleReviews : []

  this.apiService.updateUser(this.row_id,this.provider).subscribe((res:any)=>{
    if(res?.isSuccess === true){
      this.toastr.success('provider update successfull')
      this.spinner.hide()
      this.modalService.dismissAll()
      this.setAndGetProviderbyStatus()
    }
    else this.toastr.error(res?.error)
    
  })

}
updateBasicAnalyticProvider(){
  if(this.row_id){
    this.apiService.updateUser(this.row_id,this.provider).subscribe((res:any)=>{
      if(res?.isSuccess === true){
        this.toastr.success('provider update successfull')
        this.spinner.hide()
        this.modalService.dismissAll()
        this.setAndGetProviderbyStatus()
      }
      else this.toastr.error(res?.error)
      
    })
  }
}
closeModal(){
  this.spinner.hide()
  this.modalService.dismissAll()
}
async setAddress(addressData) {
  this.provider.location= {type:"Point",coordinates:[addressData[0].lng,addressData[0].lat]}
  this.provider.address= addressData[1].formatted_address

if(!Array.isArray(addressData?.coordinates)){
  addressData = {...addressData,coordinates:Object.values(addressData.coordinates)}
}
this.provider.location = addressData || null;


}
getAllCity() {
  this.apiService.getAllCity(1000,1).subscribe((res: any) => {
    this.city_List = res?.data?.user
  })
}
searchProvider(){
  this.apiService.getAllProviders(this.cityId,this.selected_filter,this.activeTab,this.limitRef,this.page.pageNumber+1).subscribe((res: any) => {
    this.spinner.hide();
    this.rows = res?.data?.data
    this.page.totalPages = res?.data?.TotalCount
   
  })
}
getFilterId(event){
  this.selected_filter
  this.getAllUsers(this.activeTab)
}
updateStatus(id, status_id) {

  let body = {
    status: status_id
  }
  if (id) {
    this.apiService.updateUser(id, body).subscribe((res: any) => {
      if (res.statusCode === 200) {
        this.toastr.success('status update successfully')
        this.setAndGetProviderbyStatus()
      }
      else {
        this.toastr.error(res.error)
      }
    })
  }
}
 // ================== Alert Add Task ========================
 confirmAddTask(data:any) {
  this.row_id = data._id
  
  swal.fire({
    title: 'Are you sure?',
    text: `You won't be able to add task for ${data.fullname} provider!`,
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
      // this.AddTask(this.row_id)
    } else  {
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
AddTask(){

  this.apiService.addTaskByProvider(this.row_id,this.task_Assign,this.task_Review).subscribe((res:any)=>{
    if(res?.isSuccess === true){
      this.modalService.dismissAll()
      this.toastr.success('Task added successfully')
      this.setAndGetProviderbyStatus()
    }
    else this.toastr.error(res?.error)
  })
}
getOnlyUsers(){
    this.apiService.getAllUsers(1000,1).subscribe((res: any) => {
      this.users_list = res?.data?.data
      let task_assign = this.users_list.filter((item)=> item.email === 'mike@gmail.com')
      let task_review = this.users_list.filter((item)=> item.fullname === 'Sophie')
      if(task_assign && task_review){
        this.task_Assign = task_assign[0]._id
        this.task_Review = task_review[0]._id
      }
    })
  }
taskAssign(){
  this.task_Assign
  console.log('this.task_Assign =>',this.task_Assign)
}
taskReview(){
  this.task_Review
  console.log('this.task_Review =>',this.task_Review)

}
taskModal(content,data){
  this.row_id = data._id
  this.provider_name = data.fullname
  const modalOptions: NgbModalOptions = {
    size: '550', // 'sm', 'lg', or 'xl'
    backdrop: 'static',
  };
  const modalRef = this.modalService.open(content,modalOptions);
  modalRef.result.then((result) => {
    this.task_Assign = null
    this.task_Review = null
    this.row_id = null
  }, (reason) => {
    this.task_Assign = null
    this.task_Review = null
    this.row_id = null
  });

}
providerSearch(search){
  this.spinner.show(undefined,
    {
      type: 'ball-triangle-path',
      size: 'medium',
      bdColor: 'rgba(0, 0, 0, 0.8)',
      color: '#fff',
      fullScreen: true
    });
  this.apiService.providerFilter(search).subscribe((res:any)=>{
    this.spinner.hide()
    this.rows = res?.data
      this.page.totalPages = res?.data?.length
  })
}
resetFilter(){
  this.inputName.nativeElement.value=''
  this.setAndGetProviderbyStatus()
}
}