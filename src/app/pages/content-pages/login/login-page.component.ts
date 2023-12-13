import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, UntypedFormGroup, UntypedFormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from 'app/shared/auth/auth.service';
import { MustMatch } from 'app/shared/directives/must-match.validator';
import { ApiServiceService } from 'app/shared/services/api-service.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent implements OnInit {

  loginFormSubmitted = false;
  isLoginFailed = false;

  loginForm : FormGroup

  constructor(private router: Router, private authService: AuthService,
    private spinner: NgxSpinnerService,private formBuilder: FormBuilder,
    public toastr: ToastrService,private route:Router,) {
  }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe:[true, ],
    });
  }
  get lf() {
    return this.loginForm.controls;
  }

  // On submit button click
  onSubmit() {
    this.loginFormSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });

    this.authService.signinUser(this.loginForm.value).subscribe((res:any)=>{
      if(res?.isSuccess === true){
        this.toastr.success('user logged in successfull!')
        this.route.navigate(['/dashboard']);
      }
      else this.toastr.error(res?.error)
    })
  }

}
