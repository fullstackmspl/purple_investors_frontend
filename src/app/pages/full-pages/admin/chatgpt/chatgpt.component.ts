import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(public apiService:ApiServiceService,private ngZone: NgZone,private cdr: ChangeDetectorRef,
              private route:Router,public toastr: ToastrService) {
                this.user = JSON.parse(localStorage.getItem('user'))
               }
  ngOnInit(): void {

  }
  sendMessage() {
    if (this.newMessage.trim() !== '') {
      const exactMsg = `${this.newMessage} Please find name, email, phoneNumber and Locations - from Open AI API in json format`
      this.messages.push({ sender: 'You', text: this.newMessage, isMe: true });
      this.apiService.chatgptSearch('6578625ec5e9c2b1c8909c58',this.user._id,exactMsg).subscribe((res:any)=>{
        if(res?.isSuccess){
          this.ngZone.run(() => {
            const data = res?.data[0]?.message?.content;
            let jsonString = data.content.replace('```json', '').replace('```', '');

            console.log('=>>',JSON.parse(data))
            this.messages.push({ sender: 'ChatGpt', text:  data, isMe: false });
            this.newMessage = '';         });
            this.cdr.detectChanges();

        }
        else this.toastr.error(res?.error)
      })
    }
  }
  confirmAdd(data) {
    swal.fire({
      title: 'Are you sure?',
      text: "Would you like to add new data to enhance your experience!",
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
  details(data){
    console.log('=>>',JSON.parse(data))
    // let body={
    //   fullname: ,
    //   email: ,
    //   dob: ,
    //   gender:,
    //   phone_number: ,
    //   password:,
    //   roles: 'purpleprovider'
    // }

      // this.apiService.addUser(body).subscribe((res:any)=>{
      //   if(res?.isSuccess === true){
      //     this.toastr.success('provider registered successfull!')
      //   }
      //   else this.toastr.error(res?.error)
      // })
  }

}
