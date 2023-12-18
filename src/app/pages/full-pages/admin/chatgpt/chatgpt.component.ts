import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ApiServiceService } from 'app/shared/services/api-service.service';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2';

@Component({
  selector: 'app-chatgpt',
  templateUrl: './chatgpt.component.html',
  styleUrls: ['./chatgpt.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class ChatgptComponent implements OnInit {

  messages: { sender: string; text: string; isMe: boolean  }[] = [];
  newMessage: string = 'https://academyofexcellencepreschool.com/';
  user:any
  message_data: any;
  json_data:any
  website_url:any
  provider={
    fullname:'',
    email: '',
    phone_number: '',
    location:{type:"Point",coordinates:[]},
    address: '',
    roles: 'purpleprovider',
    websiteUrl:''
    // averageGoogleRating:'' ,
    // averageYelpRating:'' ,
    // bottomGoogleReviews : [],
    // facebookNumberOfFollowers:'',
    // facebookNumberOfLikes:'' ,
    // facebookURL:'' ,
    // googleReviewsURL:'' ,
    // instagramProfileLink:'' ,
    // mostRecentGoogleReviews:'', 
    // numberOfGoogleReviews:'' ,
    // numberOfInstagramFollowers:'' ,
    // numberOfYelpRatings:'' ,
    // topGoogleReviews : [],
    // yelpBottomReviews :  [],
    // yelpMostRecentReviews : [], 
    // yelpTopReviews :  [], 
    // yelpProfileURL:''
  }
  showButton: boolean = false;
  constructor(public apiService:ApiServiceService,private ngZone: NgZone,private cdr: ChangeDetectorRef,
              private route:Router,public toastr: ToastrService,private modalService: NgbModal,) {
                this.user = JSON.parse(localStorage.getItem('user'))
               }
  ngOnInit(): void {

  }
  sendMessage() {
    
    if (this.newMessage.trim() !== '') {
      const exactMsg = `${this.newMessage} Please find name, email, phoneNumber and Locations (with lat lng), - from Open AI API in json format with fields as it is "fullname, email, phone_number, location:{coordinates:[lat,lng]}, address "`
      // const exactMsg2 =`${this.newMessage}  Google Reviews URL,Number of Google Reviews,Average Google Rating,3 Top (Highest rated) Google reviews,3 Bottom (Lowest rated) Google reviews,3 Most Recent Google Reviews, Facebook URL,Facebook Number of Followers,Facebook Number of likes,Yelp Profile URL,Number of Yelp ratings,Average Yelp rating, 3 Yelp Top (Highest rated) reviews,3 Yelp Bottom (Lowest rated) reviews,3 Yelp Most Recent Reviews,Instagram Profile Link,Number of Instagram Followers  and i need fields as it is "fullname, email, phone_number, location, address, roles, averageGoogleRating, averageYelpRating, bottomGoogleReviews, facebookNumberOfFollowers, facebookNumberOfLikes, facebookURL, googleReviewsURL, instagramProfileLink, mostRecentGoogleReviews, numberOfGoogleReviews, numberOfInstagramFollowers, numberOfYelpRatings, topGoogleReviews, yelpBottomReviews, yelpMostRecentReviews, yelpTopReviews, yelpProfileURL from Open AI API in json format"`
      this.website_url = this.newMessage
      this.messages.push({ sender: 'You', text: this.newMessage, isMe: true });
      this.apiService.chatgptSearch('6578625ec5e9c2b1c8909c58',this.user._id,exactMsg).subscribe((res:any)=>{
        if(res?.isSuccess){
          this.showButton = true;
          // this.ngZone.run(() => {
            const data = res?.data[0]?.message?.content;
            this.json_data = data
            this.messages.push({ sender: 'ChatGpt', text:  data.match(/\{.*\}/s)&&data.match(/\{.*\}/s).length?this.generateHTML(JSON.parse(data.match(/\{.*\}/s)[0])):data , isMe: false });
            
            this.newMessage = ''; 
          // });

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
  async setAddress(addressData) {
      this.provider.location= {type:"Point",coordinates:[addressData[0].lng,addressData[0].lat]}
      this.provider.address= addressData[1].formatted_address
  }
  confirmAdd(data) {
    swal.fire({
      title: 'Are you sure?',
      text: `${this.json_data} Would you like to add new data to enhance your experience! `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2F8BE6',
      cancelButtonColor: '#F55252',
      confirmButtonText: 'Yes, add!',
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger ml-1'
      },
      buttonsStyling: false,
    }).then( (result)=> {
      if (result.value) {
        this.details(data)
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
  openModal(content,id,data) {
    this.setProvider()
    const modalOptions: NgbModalOptions = {
      size: 'lg', // 'sm', 'lg', or 'xl'
      backdrop: 'static',
    };
    const modalRef = this.modalService.open(content,modalOptions);
    modalRef.result.then((result) => {

    }, (reason) => {
    });
  }
  details(data){
   try {
   
    this.provider.websiteUrl = this.website_url
      this.apiService.addUser(this.provider).subscribe((res:any)=>{
        if(res?.isSuccess === true){
          this.showButton = false
        //   let body={
        //     name: this.provider.fullname,
        //     user: this.user._id,
        //     working_hour: '2 Hours',
        //     task_type:'missing data',
        //     status:'pending',
        //     missing_fields: {
        //       description: '',
        //       task_date: '',
        //       notes: '',
        //       admin_notes: '',
        //       budget: '',
        //     },
        //     add_fields: { name: this.provider.fullname,}
        // }
        // this.apiService.addTask(body).subscribe((res:any)=>{

        // })
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
