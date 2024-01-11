import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { DatatableComponent, ColumnMode } from '@swimlane/ngx-datatable';
import { ApiServiceService } from 'app/shared/services/api-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';

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
  constructor( public apiService:ApiServiceService,
               private modalService: NgbModal,
               public toastr: ToastrService,
               private router:Router,
               private spinner: NgxSpinnerService,private formBuilder : FormBuilder,
               private cdr: ChangeDetectorRef) { 
                this.user = JSON.parse(localStorage.getItem('user'))
                }

  ngOnInit(): void {
    this.getAllUsers()
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
    this.apiService.getAllProviders().subscribe((res: any) => {
      this.spinner.hide();
      this.rows = res?.data?.data
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
  }
  details(data){
    try {
    
      console.log('pro',this.provider)
      //  this.apiService.addUser(this.provider).subscribe((res:any)=>{
      //    if(res?.isSuccess === true){
      //      this.toastr.success('provider registered successfull!')
      //      this.modalService.dismissAll()
      //    }
      //    else this.toastr.error(res?.error)
      //    this.modalService.dismissAll();
      //  })
     
    } catch (error) {
     console.error('Error parsing JSON:', error);
    }
   }
//  openModalForProvider(content,id,data) {
//   this.spinner.show(undefined,
//     {
//       type: 'ball-triangle-path',
//       size: 'medium',
//       bdColor: 'rgba(0, 0, 0, 0.8)',
//       color: '#fff',
//       fullScreen: true
//     });
  
//   if (this.newMessage.trim() !== '') {
//     // const exactMsg = `${this.newMessage} Please find name, email, phoneNumber and Locations (with lat lng), - from Open AI API in json format with fields as it is "fullname, email, phone_number, location:{coordinates:[lat,lng]}, address "`
//     const exactMsg2 =`${this.newMessage}  Google Reviews URL,Number of Google Reviews,Average Google Rating,3 Top (Highest rated) Google reviews,3 Bottom (Lowest rated) Google reviews,3 Most Recent Google Reviews, Facebook URL,Facebook Number of Followers,Facebook Number of likes,Yelp Profile URL,Number of Yelp ratings,Average Yelp rating, 3 Yelp Top (Highest rated) reviews,3 Yelp Bottom (Lowest rated) reviews,3 Yelp Most Recent Reviews,Instagram Profile Link,Number of Instagram Followers  and i need fields as it is "fullname, email, phone_number, location, address, roles, averageGoogleRating, averageYelpRating, bottomGoogleReviews, facebookNumberOfFollowers, facebookNumberOfLikes, facebookURL, googleReviewsURL, instagramProfileLink, mostRecentGoogleReviews, numberOfGoogleReviews, numberOfInstagramFollowers, numberOfYelpRatings, topGoogleReviews, yelpBottomReviews, yelpMostRecentReviews, yelpTopReviews, yelpProfileURL from Open AI API in json format"`
//     this.messages.push({ sender: 'You', text: this.newMessage, isMe: true });
//     this.apiService.chatgptSearch('6578625ec5e9c2b1c8909c58',this.user._id,exactMsg2).subscribe((res:any)=>{
//       if(res?.isSuccess){
//         this.spinner.hide()
//         // this.ngZone.run(() => {
//           const data = res?.data[0]?.message?.content;
//           this.json_data = data
//           this.messages.push({ sender: 'ChatGpt', text:  data.match(/\{.*\}/s)&&data.match(/\{.*\}/s).length?this.generateHTML(JSON.parse(data.match(/\{.*\}/s)[0])):data , isMe: false });
//           this.newMessage = ''; 
//         // });
//         this.setProvider()
//           this.cdr.detectChanges();
//       }
//       else this.toastr.error(res?.error)
//     })
//   }
    
//     const modalOptions: NgbModalOptions = {
//       size: 'lg', // 'sm', 'lg', or 'xl'
//       backdrop: 'static',
//     };
//     const modalRef = this.modalService.open(content,modalOptions);
//     modalRef.result.then((result) => {

//     }, (reason) => {
//     });
//   }
goToPrograms(user) {
  this.router.navigate(['/programs-list', user._id]);
}

openModalForProvider(content, id,row_data) {
  this.row_id = id

  if(!row_data.websiteUrl || row_data.websiteUrl === undefined){
    this.toastr.error('website url missing!')
  }

  if(row_data.websiteUrl !== undefined){
    this.spinner.show(undefined, {
      type: 'ball-triangle-path',
      size: 'medium',
      bdColor: 'rgba(0, 0, 0, 0.8)',
      color: '#fff',
      fullScreen: true
    });
    // if (this.newMessage.trim() !== '') {
      const exactMsg2 = `${row_data?.websiteUrl} please find exact all data fields in string format such as Google Reviews URL,Number of Google Reviews,Average Google Rating,3 Top (Highest rated) Google reviews,3 Bottom (Lowest rated) Google reviews,3 Most Recent Google Reviews, Facebook URL,Facebook Number of Followers,Facebook Number of likes,Yelp Profile URL,Number of Yelp ratings,Average Yelp rating, 3 Yelp Top (Highest rated) reviews,3 Yelp Bottom (Lowest rated) reviews,3 Yelp Most Recent Reviews,Instagram Profile Link,Number of Instagram Followers  and i need fields as it is "fullname, email, phone_number, location, address, roles, averageGoogleRating, averageYelpRating, bottomGoogleReviews, facebookNumberOfFollowers, facebookNumberOfLikes, facebookURL, googleReviewsURL, instagramProfileLink, mostRecentGoogleReviews, numberOfGoogleReviews, numberOfInstagramFollowers, numberOfYelpRatings, topGoogleReviews, yelpBottomReviews, yelpMostRecentReviews, yelpTopReviews, yelpProfileURL from Open AI API in json format"`;
  
      this.messages.push({ sender: 'You', text: this.newMessage, isMe: true });
  
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
              this.messages.push({
                sender: 'ChatGpt',
                text: data.match(/\{.*\}/s) && data.match(/\{.*\}/s).length ? this.generateHTML(JSON.parse(data.match(/\{.*\}/s)[0])) : data,
                isMe: false
              });
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
      this.getAllUsers()
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
        this.getAllUsers()
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
  // console.log('address =>>',addressData)
  this.provider.location= {type:"Point",coordinates:[addressData[0].lng,addressData[0].lat]}
  this.provider.address= addressData[1].formatted_address

if(!Array.isArray(addressData?.coordinates)){
  addressData = {...addressData,coordinates:Object.values(addressData.coordinates)}
}
this.provider.location = addressData || null;


}

}