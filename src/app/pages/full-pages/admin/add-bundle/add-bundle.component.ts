import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from 'app/shared/services/api-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-bundle',
  templateUrl: './add-bundle.component.html',
  styleUrls: ['./add-bundle.component.scss']
})
export class AddBundleComponent implements OnInit {
  @ViewChild('vform') validationForm: FormGroup;

  addBundleForm : FormGroup
  addBundleFormSubmitted=false;
  status_List =[
    {name:'active'},
    {name:'inactive'}

  ]
  selected_status = null
  constructor(private formBuilder : FormBuilder,
              public toastr: ToastrService,
              public apiService:ApiServiceService,
              private route:Router,) { }

  ngOnInit(): void {
    this.addBundleForm = this.formBuilder.group({
        name: ['', Validators.required],
        description: ['', ],
        keys: [{ "private_key":"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"}, ],
        status: ['', Validators.required],
        marketplace: ['', ],
        admin_notes: ['', ],
        notes: ['', ],
    })
  }
  get rf() {
    return this.addBundleForm.controls;
  }
  getStatusId(event){
    this.selected_status
  }
  submit(){
    let body ={
      name : this.addBundleForm.value.name,
      description : this.addBundleForm.value.description,
      keys : this.addBundleForm.value.keys,
      status : this.selected_status,
      marketplace : this.addBundleForm.value.marketplace,
      notes : this.addBundleForm.value.notes,
      admin_notes : this.addBundleForm.value.admin_notes
    }
    this.apiService.addBundle(body).subscribe((res:any)=>{
      if(res?.isSuccess === true){
        this.toastr.success('bundle added successfull!')
      }
      else this.toastr.error(res?.error)
    })
  }
  back(){}
}
