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
  newMessage: string = '';
  user:any
  message_data: any;
  json_data:any
  provider={
    fullname:'',
    email: '',
    phone_number: '',
    location:{coordinates:[]},
    address: '',
    roles: 'purpleprovider',
  }
  constructor(public apiService:ApiServiceService,private ngZone: NgZone,private cdr: ChangeDetectorRef,
              private route:Router,public toastr: ToastrService,private modalService: NgbModal,) {
                this.user = JSON.parse(localStorage.getItem('user'))
               }
  ngOnInit(): void {

  }
  sendMessage() {
    if (this.newMessage.trim() !== '') {
      const exactMsg = `${this.newMessage} Please find name, email, phoneNumber and Locations (with lat lng), - from Open AI API in json format with fields as it is "fullname, email, phone_number, location:{coordinates:[lat,lng]}, address"`
      const exactMsg2 =`${this.newMessage}  Google Reviews URL,Number of Google Reviews,Average Google Rating,3 Top (Highest rated) Google reviews,3 Bottom (Lowest rated) Google reviews,3 Most Recent Google Reviews, Facebook URL,Facebook Number of Followers,Facebook Number of likes,Yelp Profile URL,Number of Yelp ratings,Average Yelp rating, 3 Yelp Top (Highest rated) reviews,3 Yelp Bottom (Lowest rated) reviews,3 Yelp Most Recent Reviews,Instagram Profile Link,Number of Instagram Followers  and i need fields as it is "fullname, email, phone_number, location, address, roles, averageGoogleRating, averageYelpRating, bottomGoogleReviews, facebookNumberOfFollowers, facebookNumberOfLikes, facebookURL, googleReviewsURL, instagramProfileLink, mostRecentGoogleReviews, numberOfGoogleReviews, numberOfInstagramFollowers, numberOfYelpRatings, topGoogleReviews, yelpBottomReviews, yelpMostRecentReviews, yelpTopReviews, yelpProfileURL"`
      this.messages.push({ sender: 'You', text: this.newMessage, isMe: true });
      this.apiService.chatgptSearch('6578625ec5e9c2b1c8909c58',this.user._id,exactMsg).subscribe((res:any)=>{
        if(res?.isSuccess){
          this.ngZone.run(() => {
            const data = res?.data[0]?.message?.content;
            this.json_data = data
            this.messages.push({ sender: 'ChatGpt', text:  data, isMe: false });
            this.newMessage = ''; 
          });

            this.cdr.detectChanges();
        }
        else this.toastr.error(res?.error)
      })
    }
  }
  setProvider(){
    let jsonString = this.json_data.replace(/^```json/, '').replace(/```$/, '');
    this.provider = JSON.parse(jsonString)
    this.provider.roles = 'purpleprovider'
    
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
    // let jsonString = data.replace(/^```json/, '').replace(/```$/, '');
    // this.json_data = JSON.parse( jsonString)
    // console.log('==>>',this.json_data)
    // let body={
    //   fullname: this.json_data.name,
    //   email: this.json_data.email,
    //   phone_number: this.json_data.phoneNumber ,
    //   location: {
    //     coordinates: [
    //       this.json_data.locations[0].lng,this.json_data.locations[0].lat
    //     ]
    //   },
    //   address:  this.json_data.locations[0].address,
    //   roles: 'purpleprovider',
    //   averageGoogleRating : this.json_data.averageGoogleRating,
    //   averageYelpRating : this.json_data.averageYelpRating,
    //   bottomGoogleReviews : [this.json_data.bottomGoogleReviews],
    //   facebookNumberOfFollowers : this.json_data.facebookNumberOfFollowers,
    //   facebookNumberOfLikes : this.json_data.facebookNumberOfLikes,
    //   facebookURL : this.json_data.facebookURL,
    //   googleReviewsURL : this.json_data.googleReviewsURL,
    //   instagramProfileLink : this.json_data.instagramProfileLink,
    //   mostRecentGoogleReviews :  this.json_data.mostRecentGoogleReviews,
    //   numberOfGoogleReviews :  this.json_data.numberOfGoogleReviews,
    //   numberOfInstagramFollowers : this.json_data.numberOfInstagramFollowers,
    //   numberOfYelpRatings : this.json_data.numberOfYelpRatings,
    //   topGoogleReviews : [this.json_data.topGoogleReviews],
    //   yelpBottomReviews :  [this.json_data.yelpBottomReviews],
    //   yelpMostRecentReviews : [this.json_data.yelpMostRecentReviews],
    //   yelpTopReviews :  [this.json_data.yelpTopReviews],
    //   yelpProfileURL : this.json_data.yelpProfileURL

    // }
    // console.log('==>>',body)
      this.apiService.addUser(this.provider).subscribe((res:any)=>{
        if(res?.isSuccess === true){
          let body={
            name: this.provider.fullname,
            description: '',
            task_date: '',
            notes: '',
            admin_notes: '',
            working_hour: '',
            budget: ''
        }
        this.apiService.addTask(body).subscribe((res:any)=>{

        })
          this.toastr.success('provider registered successfull!')
          this.modalService.dismissAll
        }
        else this.toastr.error(res?.error)
      })
    
   } catch (error) {
    console.error('Error parsing JSON:', error);
   }
  }

}
