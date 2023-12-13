"use strict";(self.webpackChunkmatngular=self.webpackChunkmatngular||[]).push([[772],{9772:(K,f,l)=>{l.r(f),l.d(f,{ContentPagesModule:()=>V,createTranslateLoader:()=>P});var u=l(6895),t=l(4006),c=l(1175),h=l(6405),a=l(8111),e=l(4650);const T=function(){return["/"]};let y=(()=>{class o{}return o.\u0275fac=function(n){return new(n||o)},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-error-page"]],decls:14,vars:2,consts:[["id","error"],[1,"container-fluid"],[1,"row","auth-height","full-height-vh"],[1,"col-12","d-flex","align-items-center","justify-content-center"],[1,"row"],[1,"col-12","text-center"],["src","assets/img/gallery/error.png","alt","","height","300","width","400",1,"img-fluid","error-img","mt-2"],[1,"mt-4"],[1,"w-75","error-text","mx-auto","mt-4"],[1,"btn","btn-warning","my-2",3,"routerLink"]],template:function(n,r){1&n&&(e.TgZ(0,"section",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"div",5),e._UZ(6,"img",6),e.TgZ(7,"h1",7),e._uU(8,"404 - Page Not Found!"),e.qZA(),e.TgZ(9,"div",8)(10,"p"),e._uU(11,"The page you are looking for might have beel removed, had it's name changed, or is temporarily unavailable."),e.qZA()(),e.TgZ(12,"a",9),e._uU(13,"Back To Home"),e.qZA()()()()()()()),2&n&&(e.xp6(12),e.Q6J("routerLink",e.DdM(1,T)))},dependencies:[a.yS]}),o})();const q=["f"],F=function(){return["/pages/login"]};let U=(()=>{class o{constructor(n,r){this.router=n,this.route=r}onSubmit(){this.forogtPasswordForm.reset()}onLogin(){this.router.navigate(["login"],{relativeTo:this.route.parent})}onRegister(){this.router.navigate(["register"],{relativeTo:this.route.parent})}}return o.\u0275fac=function(n){return new(n||o)(e.Y36(a.F0),e.Y36(a.gz))},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-forgot-password-page"]],viewQuery:function(n,r){if(1&n&&e.Gf(q,5),2&n){let s;e.iGM(s=e.CRH())&&(r.forogtPasswordForm=s.first)}},decls:20,vars:2,consts:[["id","forgot-password"],[1,"row","auth-height","full-height-vh","m-0","d-flex","align-items-center","justify-content-center"],[1,"col-md-7","col-12"],[1,"card","overflow-hidden"],[1,"card-content"],[1,"card-body","auth-img"],[1,"row","m-0"],[1,"col-lg-6","d-none","d-lg-flex","justify-content-center","align-items-center","text-center","auth-img-bg","py-2"],["src","assets/img/gallery/forgot.png","alt","","width","260","height","230",1,"img-fluid"],[1,"col-lg-6","col-md-12","px-4","py-3"],[1,"mb-2","card-title"],[1,"card-text","mb-3"],["type","email","placeholder","Email",1,"form-control","mb-3"],[1,"d-flex","flex-sm-row","flex-column","justify-content-between"],[1,"btn","bg-light-primary","mb-2","mb-sm-0",3,"routerLink"],[1,"btn","btn-primary","ml-sm-1"]],template:function(n,r){1&n&&(e.TgZ(0,"section",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"div",5)(6,"div",6)(7,"div",7),e._UZ(8,"img",8),e.qZA(),e.TgZ(9,"div",9)(10,"h4",10),e._uU(11,"Recover Password"),e.qZA(),e.TgZ(12,"p",11),e._uU(13,"Please enter your email address and we'll send you instructions on how to reset your password."),e.qZA(),e._UZ(14,"input",12),e.TgZ(15,"div",13)(16,"a",14),e._uU(17,"Back To Login"),e.qZA(),e.TgZ(18,"button",15),e._uU(19,"Recover"),e.qZA()()()()()()()()()()),2&n&&(e.xp6(16),e.Q6J("routerLink",e.DdM(1,F)))},dependencies:[a.yS]}),o})();var A=l(866),v=l(2457);function L(o,i){if(1&o){const n=e.EpF();e.TgZ(0,"ngb-alert",27),e.NdJ("close",function(){e.CHM(n);const s=e.oxw();return e.KtG(s.isLoginFailed=!1)}),e.TgZ(1,"p",28),e._uU(2,"Login failed!"),e.qZA()()}}function J(o,i){1&o&&(e.TgZ(0,"div",29),e._UZ(1,"i",30),e._uU(2," This is required"),e.qZA())}function S(o,i){1&o&&(e.TgZ(0,"div",29),e._UZ(1,"i",30),e._uU(2," This is required "),e.qZA())}const _=function(o,i){return{"is-invalid":o,"is-valid":i}},M=function(){return["/pages/forgotpassword"]},Q=function(){return["/register"]};let R=(()=>{class o{constructor(n,r,s,d,g,p){this.router=n,this.authService=r,this.spinner=s,this.formBuilder=d,this.toastr=g,this.route=p,this.loginFormSubmitted=!1,this.isLoginFailed=!1}ngOnInit(){this.loginForm=this.formBuilder.group({email:["",[t.kI.required,t.kI.email]],password:["",[t.kI.required]],rememberMe:[!0]})}get lf(){return this.loginForm.controls}onSubmit(){this.loginFormSubmitted=!0,!this.loginForm.invalid&&(this.spinner.show(void 0,{type:"ball-triangle-path",size:"medium",bdColor:"rgba(0, 0, 0, 0.8)",color:"#fff",fullScreen:!0}),this.authService.signinUser(this.loginForm.value).subscribe(n=>{!0===n?.isSuccess?(this.toastr.success("user logged in successfull!"),this.route.navigate(["/dashboard"])):this.toastr.error(n?.error)}))}}return o.\u0275fac=function(n){return new(n||o)(e.Y36(a.F0),e.Y36(A.e),e.Y36(h.t2),e.Y36(t.qu),e.Y36(v._W),e.Y36(a.F0))},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-login-page"]],decls:36,vars:17,consts:[["id","login"],[1,"row","auth-height","full-height-vh","m-0"],[1,"col-12","d-flex","align-items-center","justify-content-center"],[1,"card","overflow-hidden"],[1,"card-content"],[1,"card-body","auth-img"],[1,"row","m-0"],[1,"col-lg-6","d-none","d-lg-flex","justify-content-center","align-items-center","auth-img-bg","p-3"],["src","assets/img/gallery/login.png","alt","","width","300","height","230",1,"img-fluid"],[1,"col-lg-6","col-12","px-4","py-3"],[1,"mb-2","card-title"],["type","light-danger","class","mb-2",3,"close",4,"ngIf"],[3,"formGroup","ngSubmit"],[1,"form-group"],["type","text","formControlName","email","placeholder","email","required","",1,"form-control",3,"ngClass"],["class","help-block mt-1 text-danger",4,"ngIf"],["type","password","formControlName","password","placeholder","Password","required","",1,"form-control",3,"ngClass"],[1,"d-sm-flex","justify-content-between","mb-3","font-small-2"],[1,"remember-me","mb-2","mb-sm-0"],[1,"checkbox","auth-checkbox"],["type","checkbox","formControlName","rememberMe","id","rememberMe",1,"form-control"],["for","rememberMe"],[1,"font-small-2","mb-3","font-weight-normal"],[3,"routerLink"],[1,"d-flex","justify-content-between","flex-sm-row","flex-column"],[1,"btn","bg-light-primary","mb-2","mb-sm-0",3,"routerLink"],[1,"btn","btn-primary",3,"disabled"],["type","light-danger",1,"mb-2",3,"close"],[1,"mb-0"],[1,"help-block","mt-1","text-danger"],[1,"ft-alert-circle","align-middle"]],template:function(n,r){1&n&&(e.TgZ(0,"section",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"div",5)(6,"div",6)(7,"div",7),e._UZ(8,"img",8),e.qZA(),e.TgZ(9,"div",9)(10,"h4",10),e._uU(11,"Login"),e.qZA(),e.TgZ(12,"p"),e._uU(13,"Welcome back, please login to your account."),e.qZA(),e.YNc(14,L,3,0,"ngb-alert",11),e.TgZ(15,"form",12),e.NdJ("ngSubmit",function(){return r.onSubmit()}),e.TgZ(16,"div",13),e._UZ(17,"input",14),e.YNc(18,J,3,0,"div",15),e.qZA(),e.TgZ(19,"div",13),e._UZ(20,"input",16),e.YNc(21,S,3,0,"div",15),e.qZA(),e.TgZ(22,"div",17)(23,"div",18)(24,"div",19),e._UZ(25,"input",20),e.TgZ(26,"label",21)(27,"span",22),e._uU(28,"Remember Me"),e.qZA()()()(),e.TgZ(29,"a",23),e._uU(30,"Forgot Password?"),e.qZA()(),e.TgZ(31,"div",24)(32,"a",25),e._uU(33,"Register"),e.qZA(),e.TgZ(34,"button",26),e._uU(35,"Login"),e.qZA()()()()()()()()()()()),2&n&&(e.xp6(14),e.Q6J("ngIf",r.isLoginFailed),e.xp6(1),e.Q6J("formGroup",r.loginForm),e.xp6(2),e.Q6J("ngClass",e.WLB(9,_,r.loginFormSubmitted&&r.lf.email.invalid,r.loginFormSubmitted&&!r.lf.email.invalid)),e.xp6(1),e.Q6J("ngIf",r.loginFormSubmitted&&(r.lf.email.invalid||(null==r.lf.email.errors?null:r.lf.email.errors.required))),e.xp6(2),e.Q6J("ngClass",e.WLB(12,_,r.loginFormSubmitted&&r.lf.password.invalid,r.loginFormSubmitted&&!r.lf.password.invalid)),e.xp6(1),e.Q6J("ngIf",r.loginFormSubmitted&&(r.lf.password.invalid||(null==r.lf.password.errors?null:r.lf.password.errors.required))),e.xp6(8),e.Q6J("routerLink",e.DdM(15,M)),e.xp6(3),e.Q6J("routerLink",e.DdM(16,Q)),e.xp6(2),e.Q6J("disabled",!r.loginForm.valid))},dependencies:[u.mk,u.O5,a.yS,t._Y,t.Fj,t.Wl,t.JJ,t.JL,t.Q7,t.sg,t.u,c.xm],styles:[".alert-light-danger[_ngcontent-%COMP%]{background-color:#feefd0!important;color:#f55252!important;border-color:#feefd0}"]}),o})();var b=l(3496),I=l(334),Z=l(6491);const k=["search"];function N(o,i){1&o&&(e.TgZ(0,"div",31),e._UZ(1,"i",32),e._uU(2," name is required "),e.qZA())}function Y(o,i){1&o&&(e.TgZ(0,"div",31),e._UZ(1,"i",32),e._uU(2," Email is required "),e.qZA())}function B(o,i){1&o&&(e.TgZ(0,"div",31),e._UZ(1,"i",32),e._uU(2," Please enter a valid email address "),e.qZA())}function E(o,i){1&o&&(e.TgZ(0,"div",31),e._UZ(1,"i",32),e._uU(2," phone is required "),e.qZA())}function j(o,i){1&o&&(e.TgZ(0,"div",31),e._UZ(1,"i",32),e._uU(2," dob is required "),e.qZA())}function G(o,i){1&o&&(e.TgZ(0,"div",31),e._UZ(1,"i",32),e._uU(2," password is required "),e.qZA())}function O(o,i){1&o&&(e.TgZ(0,"div",31),e._UZ(1,"i",32),e._uU(2," confirm Password is required "),e.qZA())}function W(o,i){1&o&&(e.TgZ(0,"div",31),e._UZ(1,"i",32),e._uU(2," confirm Password and Passowrd not same! "),e.qZA())}const m=function(o,i){return{"is-invalid":o,"is-valid":i}},C=function(){return{standalone:!0}},x=function(){return["/login"]},D=[{path:"",children:[{path:"error",component:y,data:{title:"Error Page"}},{path:"forgotpassword",component:U,data:{title:"Forgot Password Page"}},{path:"login",component:R,data:{title:"Login Page"}},{path:"register",component:(()=>{class o{constructor(n,r,s,d,g,p){this.formBuilder=n,this.toastr=r,this.mapsAPILoader=s,this.ngZone=d,this.apiService=g,this.route=p,this.userFormSubmitted=!1,this.gender_List=[{name:"male"},{name:"female"}],this.role_List=[{name:"SuperAdmin",_id:"superadmin"},{name:"Admin",_id:"admin"},{name:"MTurkers",_id:"mturkers"}],this.select_gender=null,this.select_role=null}ngOnInit(){this.userForm=this.formBuilder.group({fullname:["",t.kI.required],email:["",[t.kI.required,t.kI.email]],dob:["",t.kI.required],gender:["",[t.kI.required]],phone_number:["",[t.kI.required]],password:["",[t.kI.required]],confirmPassword:["",t.kI.required],acceptTerms:[!1,t.kI.requiredTrue],phone_code:["+91",t.kI.required]})}get rf(){return this.userForm.controls}submit(){this.apiService.addUser({fullname:this.userForm.value.fullname,email:this.userForm.value.email,dob:this.userForm.value.dob,gender:this.select_gender,phone_number:this.userForm.value.phone_number,password:this.userForm.value.password,roles:this.select_role}).subscribe(r=>{!0===r?.isSuccess?(this.toastr.success("user registered successfull!"),this.route.navigate(["/login"])):this.toastr.error(r?.error)})}getGenderId(n){}getRoleId(n){}}return o.\u0275fac=function(n){return new(n||o)(e.Y36(t.qu),e.Y36(v._W),e.Y36(b.W7),e.Y36(e.R0b),e.Y36(I.M),e.Y36(a.F0))},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-register-page"]],viewQuery:function(n,r){if(1&n&&e.Gf(k,5),2&n){let s;e.iGM(s=e.CRH())&&(r.searchElementRef=s.first)}},decls:62,vars:44,consts:[["id","regestration"],[1,"row","auth-height","full-height-vh","m-0"],[1,"col-12","d-flex","align-items-center","justify-content-center"],[1,"card","overflow-hidden"],[1,"card-content"],[1,"card-body","auth-img"],[1,"d-flex","justify-content-center","my-3"],[1,"card-title","mb-2"],[1,"row","m-0","px-4","py-3"],[1,"col-lg-6","col-md-12","px-4","py-3"],[3,"formGroup"],[1,"form-group"],["for","name"],["type","text","formControlName","fullname","id","fullname","placeholder","Enter name","required","",1,"form-control",3,"ngClass"],["fullname",""],["class","help-block mt-1 text-danger",4,"ngIf"],["for","Email"],["type","email","formControlName","email","id","Email","placeholder","Enter email","required","",1,"form-control",3,"ngClass"],["email",""],["type","text","placeholder","e.g. (555) 555 5555","mask","(000) 000-0000","minlength","10","formControlName","phone_number","id","phone_number","placeholder","Enter phone","required","",1,"form-control",3,"ngClass"],["phone_number",""],["type","date","formControlName","dob","id","dob","placeholder","Enter dob","required","",1,"form-control",3,"ngClass"],["bindLabel","name","bindValue","name","placeholder","Select Gender",3,"items","ngModel","ngModelOptions","ngModelChange","change"],[1,"mt-2"],["bindLabel","name","bindValue","_id","placeholder","Select Role",3,"items","ngModel","ngModelOptions","ngModelChange","change"],[1,"form-group","mt-2"],["type","password","formControlName","password","id","password","placeholder","e.g. Test@123","required","",1,"form-control",3,"ngClass"],["type","password","formControlName","confirmPassword","id","confirmPassword","placeholder","Enter password","required","",1,"form-control",3,"ngClass"],[1,"buttons-box"],[1,"btn","btn-secondary","mx-1",3,"routerLink"],[1,"btn","btn-primary","mx-1",3,"click"],[1,"help-block","mt-1","text-danger"],[1,"ft-alert-circle","align-middle"]],template:function(n,r){1&n&&(e.TgZ(0,"section",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"div",5)(6,"div",6)(7,"h4",7),e._uU(8,"Create Account"),e.qZA()(),e.TgZ(9,"div",8)(10,"div",9)(11,"form",10)(12,"fieldset",11)(13,"label",12),e._uU(14,"Name"),e.qZA(),e._UZ(15,"input",13,14),e.YNc(17,N,3,0,"div",15),e.qZA(),e.TgZ(18,"fieldset",11)(19,"label",16),e._uU(20,"Email"),e.qZA(),e._UZ(21,"input",17,18),e.YNc(23,Y,3,0,"div",15),e.YNc(24,B,3,0,"div",15),e.qZA(),e.TgZ(25,"fieldset",11)(26,"label"),e._uU(27,"Phone"),e.qZA(),e._UZ(28,"input",19,20),e.YNc(30,E,3,0,"div",15),e.qZA(),e.TgZ(31,"fieldset",11)(32,"label"),e._uU(33,"DOB"),e.qZA(),e._UZ(34,"input",21),e.YNc(35,j,3,0,"div",15),e.qZA()()(),e.TgZ(36,"div",9)(37,"form",10)(38,"fieldset")(39,"label"),e._uU(40,"Gender"),e.qZA(),e.TgZ(41,"ng-select",22),e.NdJ("ngModelChange",function(d){return r.select_gender=d})("change",function(d){return r.getGenderId(d)}),e.qZA()(),e.TgZ(42,"fieldset",23)(43,"label"),e._uU(44,"Role"),e.qZA(),e.TgZ(45,"ng-select",24),e.NdJ("ngModelChange",function(d){return r.select_role=d})("change",function(d){return r.getRoleId(d)}),e.qZA()(),e.TgZ(46,"fieldset",25)(47,"label"),e._uU(48,"Password"),e.qZA(),e._UZ(49,"input",26),e.YNc(50,G,3,0,"div",15),e.qZA(),e.TgZ(51,"fieldset",25)(52,"label"),e._uU(53,"Confirm Password"),e.qZA(),e._UZ(54,"input",27),e.YNc(55,O,3,0,"div",15),e.YNc(56,W,3,0,"div",15),e.qZA()()(),e.TgZ(57,"div",28)(58,"button",29),e._uU(59,"Cancel"),e.qZA(),e.TgZ(60,"button",30),e.NdJ("click",function(){return r.submit()}),e._uU(61,"Submit"),e.qZA()()()()()()()()()),2&n&&(e.xp6(11),e.Q6J("formGroup",r.userForm),e.xp6(4),e.Q6J("ngClass",e.WLB(23,m,r.userFormSubmitted&&r.rf.fullname.invalid,r.userFormSubmitted&&!r.rf.fullname.invalid)),e.xp6(2),e.Q6J("ngIf",r.rf.fullname.touched&&(null==r.rf.fullname.errors?null:r.rf.fullname.errors.required)),e.xp6(4),e.Q6J("ngClass",e.WLB(26,m,r.userFormSubmitted&&r.rf.email.invalid,r.userFormSubmitted&&!r.rf.email.invalid)),e.xp6(2),e.Q6J("ngIf",r.rf.email.touched&&(null==r.rf.email||null==r.rf.email.errors?null:r.rf.email.errors.required)),e.xp6(1),e.Q6J("ngIf",null==r.rf.email.errors?null:r.rf.email.errors.email),e.xp6(4),e.Q6J("ngClass",e.WLB(29,m,r.userFormSubmitted&&r.rf.phone_number.invalid,r.userFormSubmitted&&!r.rf.phone_number.invalid)),e.xp6(2),e.Q6J("ngIf",r.rf.phone_number.touched&&(null==r.rf.phone_number.errors?null:r.rf.phone_number.errors.required)),e.xp6(4),e.Q6J("ngClass",e.WLB(32,m,r.userFormSubmitted&&r.rf.dob.invalid,r.userFormSubmitted&&!r.rf.dob.invalid)),e.xp6(1),e.Q6J("ngIf",r.rf.dob.touched&&(null==r.rf.dob.errors?null:r.rf.dob.errors.required)),e.xp6(2),e.Q6J("formGroup",r.userForm),e.xp6(4),e.Q6J("items",r.gender_List)("ngModel",r.select_gender)("ngModelOptions",e.DdM(35,C)),e.xp6(4),e.Q6J("items",r.role_List)("ngModel",r.select_role)("ngModelOptions",e.DdM(36,C)),e.xp6(4),e.Q6J("ngClass",e.WLB(37,m,r.userFormSubmitted&&r.rf.password.invalid,r.userFormSubmitted&&!r.rf.password.invalid)),e.xp6(1),e.Q6J("ngIf",r.rf.password.touched&&(null==r.rf.password.errors?null:r.rf.password.errors.required)),e.xp6(4),e.Q6J("ngClass",e.WLB(40,m,r.userFormSubmitted&&r.rf.confirmPassword.invalid,r.userFormSubmitted&&!r.rf.confirmPassword.invalid)),e.xp6(1),e.Q6J("ngIf",r.rf.confirmPassword.touched&&(null==r.rf.confirmPassword.errors?null:r.rf.confirmPassword.errors.required)),e.xp6(1),e.Q6J("ngIf",r.rf.password.value!==r.rf.confirmPassword.value),e.xp6(2),e.Q6J("routerLink",e.DdM(43,x)))},dependencies:[u.mk,u.O5,a.rH,t._Y,t.Fj,t.JJ,t.JL,t.Q7,t.wO,t.On,t.sg,t.u,Z.w9],styles:[".buttons-box[_ngcontent-%COMP%]{display:block;margin:auto}"]}),o})(),data:{title:"Register Page"}}]}];let z=(()=>{class o{}return o.\u0275fac=function(n){return new(n||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[a.Bz.forChild(D),a.Bz]}),o})();var w=l(2925),H=l(529),X=l(2101);function P(o){return new X.w(o,"./assets/i18n/",".json")}let V=(()=>{class o{}return o.\u0275fac=function(n){return new(n||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[u.ez,z,t.u5,t.UX,c.IJ,w.aw.forChild({loader:{provide:w.Zw,useFactory:P,deps:[H.eN]}}),h.ef,b.su,Z.A0]}),o})()}}]);