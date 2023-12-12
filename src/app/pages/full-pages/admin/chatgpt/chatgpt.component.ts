import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from 'app/shared/services/api-service.service';
import { ToastrService } from 'ngx-toastr';

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
      this.messages.push({ sender: 'You', text: this.newMessage, isMe: true });
      this.apiService.chatgptSearch('6578625ec5e9c2b1c8909c58',this.user._id,this.newMessage).subscribe((res:any)=>{
        if(res?.isSuccess){
          this.ngZone.run(() => {
            const data = res?.data[0]?.message?.content;
            this.messages.push({ sender: 'ChatGpt', text:  data, isMe: false });
            this.newMessage = '';         });
            this.cdr.detectChanges();
         
        }
        else this.toastr.error(res?.error)
      })
    }
  }

}
