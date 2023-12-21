"use strict";(self.webpackChunkmatngular=self.webpackChunkmatngular||[]).push([[608],{5608:(k,c,d)=>{d.r(c),d.d(c,{ProgramsModule:()=>A});var m=d(6895),g=d(3689),o=d(4006),e=d(4650),u=d(7459),p=d(7437);function b(a,t){1&a&&(e.TgZ(0,"div",99),e._UZ(1,"i",100),e._uU(2," This is required"),e.qZA())}function f(a,t){1&a&&(e.TgZ(0,"div",99),e._UZ(1,"i",100),e._uU(2," This is required"),e.qZA())}function Z(a,t){if(1&a){const r=e.EpF();e.TgZ(0,"ngb-alert",101),e.NdJ("close",function(){e.CHM(r);const l=e.oxw();return e.KtG(l.alertVisible=!1)}),e.TgZ(1,"p",102),e._uU(2,"Your email is not confirmed. Please check your inbox."),e.qZA(),e.TgZ(3,"a",103),e._uU(4,"Resend confirmation"),e.qZA()()}}function _(a,t){1&a&&(e.TgZ(0,"div",99),e._UZ(1,"i",100),e._uU(2," This is required"),e.qZA())}function v(a,t){1&a&&(e.TgZ(0,"div",99),e._UZ(1,"i",100),e._uU(2," This is required "),e.qZA())}const i=function(a){return{active:a}},s=function(a,t){return{"is-invalid":a,"is-valid":t}},h=[{path:"add-program",component:(()=>{class a{constructor(){this.activeTab="general",this.generalFormSubmitted=!1,this.changePasswordFormSubmitted=!1,this.infoFormSubmitted=!1,this.alertVisible=!0,this.countries=[{value:"USA",name:"USA"},{value:"UK",name:"UK"},{value:"Canada",name:"Canada"}],this.selectedLanguages=["English","Spanish"],this.languages=[{value:"English",name:"English"},{value:"Spanish",name:"Spanish"},{value:"French",name:"French"},{value:"Russian",name:"Russian"},{value:"German",name:"German"},{value:"Hindi",name:"Hindi"},{value:"Arabic",name:"Arabic"},{value:"Sanskrit",name:"Sanskrit"}],this.selectedMusic=["Jazz","Hip Hop"],this.music=[{value:"Rock",name:"Rock"},{value:"Jazz",name:"Jazz"},{value:"Disco",name:"Disco"},{value:"Pop",name:"Pop"},{value:"Techno",name:"Techno"},{value:"Folk",name:"Folk"},{value:"Hip Hop",name:"Hip Hop"}],this.selectedMovies=["The Dark Knight","Perl Harbour"],this.movies=[{value:"Avatar",name:"Avatar"},{value:"The Dark Knight",name:"The Dark Knight"},{value:"Harry Potter",name:"Harry Potter"},{value:"Iron Man",name:"Iron Man"},{value:"Spider Man",name:"Spider Man"},{value:"Perl Harbour",name:"Perl Harbour"},{value:"Airplane!",name:"Airplane!"}],this.category_List=[{name:"Test",_id:"test"}],this.months_List=[{name:"0",_id:"0"},{name:"1",_id:"1"},{name:"2",_id:"2"},{name:"3",_id:"3"},{name:"4",_id:"4"},{name:"5",_id:"5"},{name:"6",_id:"6"},{name:"7",_id:"7"},{name:"8",_id:"8"},{name:"9",_id:"9"},{name:"10",_id:"10"},{name:"11",_id:"11"},{name:"12",_id:"12"},{name:"13",_id:"13"},{name:"14",_id:"14"},{name:"15",_id:"15"},{name:"16",_id:"16"},{name:"17",_id:"17"},{name:"18",_id:"18"},{name:"19",_id:"19"},{name:"20",_id:"20"},{name:"21",_id:"21"},{name:"22",_id:"22"},{name:"23",_id:"23"}],this.years_List=[{name:"2",_id:"2"},{name:"3",_id:"3"},{name:"4",_id:"4"},{name:"5",_id:"5"},{name:"6",_id:"6"},{name:"7",_id:"7"},{name:"8",_id:"8"},{name:"9",_id:"9"},{name:"10",_id:"10"},{name:"11",_id:"11"},{name:"12",_id:"12"},{name:"13",_id:"13"},{name:"14",_id:"14"},{name:"15",_id:"15"},{name:"16",_id:"16"},{name:"17",_id:"17"}],this.maxnumber_student_List=[{name:"Maximum number of kids a single class/session/lesson can accommodate"},{name:"No Capacity info"}],this.generalForm=new o.nJ({displayname:new o.p4("hermione007",[o.kI.required]),email:new o.p4("granger007@hogward.com",[o.kI.required]),program_description:new o.p4("",[o.kI.required]),category:new o.p4("",[o.kI.required]),subcategory:new o.p4("",[o.kI.required]),agegroup:new o.p4("",[o.kI.required]),skilllevel:new o.p4("",[o.kI.required])}),this.changePasswordForm=new o.nJ({parentalSupervision:new o.p4("",[o.kI.required]),maxNumberStudent:new o.p4("",[o.kI.required]),capacity:new o.p4("",[o.kI.required]),programType:new o.p4("",[o.kI.required]),privateGroup:new o.p4("",[o.kI.required]),sessionPremies:new o.p4("",[o.kI.required])}),this.infoForm=new o.nJ({offersDiscounts:new o.p4("",[o.kI.required]),specialAdditionalInfo:new o.p4("",[o.kI.required]),bookingCancel:new o.p4("",[o.kI.required]),bdate:new o.p4("",[o.kI.required]),bio:new o.p4(""),phone:new o.p4("",[o.kI.required]),website:new o.p4("")}),this.socialForm=new o.nJ({twitter:new o.p4(""),facebook:new o.p4(""),googlePlus:new o.p4(""),linkedin:new o.p4(""),instagram:new o.p4(""),quora:new o.p4("")})}ngOnInit(){}setActiveTab(r){this.activeTab=r}get gf(){return this.generalForm.controls}get cpf(){return this.changePasswordForm.controls}get inf(){return this.infoForm.controls}onGeneralFormSubmit(){this.generalFormSubmitted=!0}onChangePasswordFormSubmit(){this.changePasswordFormSubmitted=!0}onInfoFormSubmit(){this.infoFormSubmitted=!0}onSocialFormSubmit(){}}return a.\u0275fac=function(r){return new(r||a)},a.\u0275cmp=e.Xpm({type:a,selectors:[["app-add-program"]],decls:286,vars:72,consts:[[1,"row"],[1,"col-12"],[1,"content-header"],[1,"col-md-3","mt-3"],["id","myTab","role","tablist",1,"nav","flex-column","nav-pills"],[1,"nav-item"],["href","javascript:;","id","general-tab","data-toggle","tab","role","tab","aria-controls","general","aria-selected","true",1,"nav-link",3,"ngClass","click"],[1,"ft-settings","mr-1","align-middle"],[1,"align-middle"],["href","javascript:;","id","change-password-tab","data-toggle","tab","role","tab","aria-controls","change-password","aria-selected","false",1,"nav-link",3,"ngClass","click"],[1,"ft-lock","mr-1","align-middle"],["href","javascript:;","id","info-tab","data-toggle","tab","role","tab","aria-controls","info","aria-selected","false",1,"nav-link",3,"ngClass","click"],[1,"ft-info","mr-1","align-middle"],["href","javascript:;","id","social-links-tab","data-toggle","tab","role","tab","aria-controls","social-links","aria-selected","false",1,"nav-link",3,"ngClass","click"],[1,"ft-twitter","mr-1","align-middle"],["href","javascript:;","id","connections-tab","data-toggle","tab","role","tab","aria-controls","connections","aria-selected","false",1,"nav-link",3,"ngClass","click"],[1,"ft-link","mr-1","align-middle"],["href","javascript:;","id","notifications-tab","data-toggle","tab","role","tab","aria-controls","notifications","aria-selected","false",1,"nav-link",3,"ngClass","click"],[1,"ft-bell","mr-1","align-middle"],[1,"col-md-9"],[1,"card"],[1,"card-content"],[1,"card-body"],[1,"tab-content"],["id","general","role","tabpanel","aria-labelledby","general-tab",1,"tab-pane",3,"ngClass"],[3,"formGroup","ngSubmit"],[1,"col-12","form-group"],[1,"controls"],["type","text","formControlName","displayname","placeholder","displayname","required","",1,"form-control",3,"ngClass"],["class","help-block mt-1 text-danger",4,"ngIf"],["type","text","formControlName","email","placeholder","E-mail","required","",1,"form-control",3,"ngClass"],["type","light-warning","class","mb-2",3,"close",4,"ngIf"],["name","program_description","id","program_description","cols","30","rows","3","formControlName","program_description","placeholder","Program Descripton","aria-invalid","false","required","",1,"form-control",3,"ngClass"],["bindLabel","name","bindValue","_id","placeholder","Select Category",3,"items"],["bindLabel","name","bindValue","_id","placeholder","Select Sub Category",3,"items"],[1,"col"],["bindLabel","name","bindValue","_id","placeholder","Select Age Months",3,"items"],["bindLabel","name","bindValue","_id","placeholder","Select Age Years",3,"items"],["bindLabel","name","bindValue","_id","placeholder","Select Skill Level",3,"items"],[1,"form-check"],["type","checkbox","value","","id","flexCheckDefault1",1,"form-check-input"],["for","flexCheckDefault1",1,"form-check-label"],[1,"col-12","d-flex","flex-sm-row","flex-column","justify-content-end"],["type","submit",1,"btn","btn-primary","mr-sm-2","mb-1"],["type","reset",1,"btn","btn-secondary","mb-1"],["id","change-password","role","tabpanel","aria-labelledby","change-password-tab",1,"tab-pane",3,"ngClass"],[1,"form-group"],["bindLabel","name","bindValue","_id","placeholder","Select",3,"items"],["for","new-password"],["type","checkbox","value","","id","flexCheckDefault",1,"form-check-input"],["for","flexCheckDefault",1,"form-check-label"],["type","checkbox","value","","id","flexCheckChecked",1,"form-check-input"],["for","flexCheckChecked",1,"form-check-label"],["for","retype-new-password"],["bindLabel","name","placeholder","Select",3,"items"],["type","text","formControlName","programType","placeholder","Program type","required","",1,"form-control",3,"ngClass"],[1,"d-flex","flex-sm-row","flex-column","justify-content-end"],["id","info","role","tabpanel","aria-labelledby","info-tab",1,"tab-pane",3,"ngClass"],["name","offersDiscounts","id","offersDiscounts","formControlName","offersDiscounts","cols","30","rows","3",1,"form-control"],["name","specialAdditionalInfo","id","specialAdditionalInfo","formControlName","specialAdditionalInfo","cols","30","rows","3",1,"form-control"],["type","text","name","bookingCancel","id","bookingCancel","formControlName","bookingCancel",1,"form-control"],["id","social-links","role","tabpanel","aria-labelledby","social-links-tab",1,"tab-pane",3,"ngClass"],["for","twitter"],["formControlName","twitter","type","text","placeholder","Add link","value","https://www.twitter.com",1,"form-control"],["for","facebook"],["formControlName","facebook","type","text","placeholder","Add link",1,"form-control"],["for","google+"],["formControlName","googlePlus","type","text","placeholder","Add link",1,"form-control"],["for","linkedin"],["formControlName","linkedin","type","text","placeholder","Add link","value","https://www.linkedin.com",1,"form-control"],["for","instagram"],["formControlName","instagram","type","text","placeholder","Add link",1,"form-control"],["for","quora"],["formControlName","quora","type","text","placeholder","Add link",1,"form-control"],["type","button",1,"btn","btn-primary","mr-sm-2","mb-1"],["type","button",1,"btn","btn-secondary","mb-1"],["id","connections","role","tabpanel","aria-labelledby","connections-tab",1,"tab-pane",3,"ngClass"],["novalidate",""],[1,"col-12","my-2"],["type","button",1,"btn","btn-info"],["type","button",1,"btn","btn-sm","btn-secondary","float-right"],["type","button",1,"btn","btn-danger"],["id","notifications","role","tabpanel","aria-labelledby","notifications-tab",1,"tab-pane",3,"ngClass"],[1,"col-12","text-bold-400","pl-0"],[1,"col-12","mb-2"],[1,"custom-control","custom-switch","custom-control-inline"],["id","switch1","type","checkbox","checked","",1,"custom-control-input"],["for","switch1",1,"custom-control-label"],["id","switch2","type","checkbox","checked","",1,"custom-control-input"],["for","switch2",1,"custom-control-label"],["id","switch3","type","checkbox","disabled","",1,"custom-control-input"],["for","switch3",1,"custom-control-label"],[1,"col-12","text-bold-400","pl-0","mt-3"],["id","switch4","type","checkbox","checked","",1,"custom-control-input"],["for","switch4",1,"custom-control-label"],["id","switch5","type","checkbox","disabled","",1,"custom-control-input"],["for","switch5",1,"custom-control-label"],["id","switch6","type","checkbox","checked","",1,"custom-control-input"],["for","switch6",1,"custom-control-label"],[1,"help-block","mt-1","text-danger"],[1,"ft-alert-circle","align-middle"],["type","light-warning",1,"mb-2",3,"close"],[1,"mb-0"],["href","javascript:;",1,"font-weight-bold","text-warning"]],template:function(r,n){1&r&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2),e._uU(3,"Add Program"),e.qZA()()(),e.TgZ(4,"div",0)(5,"div",3)(6,"ul",4)(7,"li",5)(8,"a",6),e.NdJ("click",function(){return n.setActiveTab("general")}),e._UZ(9,"i",7),e.TgZ(10,"span",8),e._uU(11,"Program Info"),e.qZA()()(),e.TgZ(12,"li",5)(13,"a",9),e.NdJ("click",function(){return n.setActiveTab("change-password")}),e._UZ(14,"i",10),e.TgZ(15,"span",8),e._uU(16,"Program Features"),e.qZA()()(),e.TgZ(17,"li",5)(18,"a",11),e.NdJ("click",function(){return n.setActiveTab("info")}),e._UZ(19,"i",12),e.TgZ(20,"span",8),e._uU(21,"Program Pricing"),e.qZA()()(),e.TgZ(22,"li",5)(23,"a",13),e.NdJ("click",function(){return n.setActiveTab("social-links")}),e._UZ(24,"i",14),e.TgZ(25,"span",8),e._uU(26,"Social Links"),e.qZA()()(),e.TgZ(27,"li",5)(28,"a",15),e.NdJ("click",function(){return n.setActiveTab("connections")}),e._UZ(29,"i",16),e.TgZ(30,"span",8),e._uU(31,"Connections"),e.qZA()()(),e.TgZ(32,"li",5)(33,"a",17),e.NdJ("click",function(){return n.setActiveTab("notifications")}),e._UZ(34,"i",18),e.TgZ(35,"span",8),e._uU(36,"Notifications"),e.qZA()()()()(),e.TgZ(37,"div",19)(38,"div",20)(39,"div",21)(40,"div",22)(41,"div",23)(42,"div",24)(43,"form",25),e.NdJ("ngSubmit",function(){return n.onGeneralFormSubmit()}),e.TgZ(44,"div",0)(45,"div",26)(46,"label"),e._uU(47,"Display Name"),e.qZA(),e.TgZ(48,"div",27),e._UZ(49,"input",28),e.YNc(50,b,3,0,"div",29),e.qZA()(),e.TgZ(51,"div",26)(52,"label"),e._uU(53,"Default Email"),e.qZA(),e.TgZ(54,"div",27),e._UZ(55,"input",30),e.YNc(56,f,3,0,"div",29),e.qZA()(),e.TgZ(57,"div",1),e.YNc(58,Z,5,0,"ngb-alert",31),e.qZA(),e.TgZ(59,"div",26)(60,"label"),e._uU(61,"Program Descripton"),e.qZA(),e.TgZ(62,"div",27),e._UZ(63,"textarea",32),e.YNc(64,_,3,0,"div",29),e.qZA()(),e.TgZ(65,"div",26)(66,"label"),e._uU(67,"Category"),e.qZA(),e.TgZ(68,"div",27),e._UZ(69,"ng-select",33),e.qZA()(),e.TgZ(70,"div",26)(71,"label"),e._uU(72,"Sub Category"),e.qZA(),e.TgZ(73,"div",27),e._UZ(74,"ng-select",34),e.qZA()(),e.TgZ(75,"div",26)(76,"label"),e._uU(77,"Age Group"),e.qZA(),e.TgZ(78,"div",27)(79,"div",0)(80,"div",35)(81,"label"),e._uU(82,"Age In Months"),e.qZA(),e._UZ(83,"ng-select",36),e.qZA(),e.TgZ(84,"div",35)(85,"label"),e._uU(86,"Age In Years"),e.qZA(),e._UZ(87,"ng-select",37),e.qZA()()()(),e.TgZ(88,"div",26)(89,"label"),e._uU(90,"Skill Level"),e.qZA(),e.TgZ(91,"div",27),e._UZ(92,"ng-select",38),e.qZA()(),e.TgZ(93,"div",26)(94,"div",39),e._UZ(95,"input",40),e.TgZ(96,"label",41),e._uU(97," Does it have a Free Trial? "),e.qZA()()(),e.TgZ(98,"div",42)(99,"button",43),e._uU(100,"Save Changes"),e.qZA(),e.TgZ(101,"button",44),e._uU(102,"Cancel"),e.qZA()()()()(),e.TgZ(103,"div",45)(104,"form",25),e.NdJ("ngSubmit",function(){return n.onChangePasswordFormSubmit()}),e.TgZ(105,"div",46)(106,"label"),e._uU(107,"Parental supervision required?"),e.qZA(),e.TgZ(108,"div",27),e._UZ(109,"ng-select",47),e.qZA()(),e.TgZ(110,"div",46)(111,"label",48),e._uU(112,"Early Drop-off/Late Pick-up"),e.qZA(),e.TgZ(113,"div",27)(114,"div",39),e._UZ(115,"input",49),e.TgZ(116,"label",50),e._uU(117," Early Drop-off "),e.qZA()(),e.TgZ(118,"div",39),e._UZ(119,"input",51),e.TgZ(120,"label",52),e._uU(121," Late Pick-up "),e.qZA()()()(),e.TgZ(122,"div",46)(123,"label",53),e._uU(124,"Max Number of students"),e.qZA(),e.TgZ(125,"div",27),e._UZ(126,"ng-select",54),e.qZA()(),e.TgZ(127,"div",46)(128,"label"),e._uU(129,"Capacity"),e.qZA(),e.TgZ(130,"div",27),e._UZ(131,"input",55),e.YNc(132,v,3,0,"div",29),e.qZA()(),e.TgZ(133,"div",46)(134,"label",53),e._uU(135,"Program type"),e.qZA(),e.TgZ(136,"div",27),e._UZ(137,"ng-select",47),e.qZA()(),e.TgZ(138,"div",46)(139,"label",53),e._uU(140,"Private vs Group"),e.qZA(),e.TgZ(141,"div",27),e._UZ(142,"ng-select",47),e.qZA()(),e.TgZ(143,"div",46)(144,"label",53),e._uU(145,"Session Premises"),e.qZA(),e.TgZ(146,"div",27),e._UZ(147,"ng-select",47),e.qZA()(),e.TgZ(148,"div",56)(149,"button",43),e._uU(150,"Save Changes"),e.qZA(),e.TgZ(151,"button",44),e._uU(152,"Cancel"),e.qZA()()()(),e.TgZ(153,"div",57)(154,"form",25),e.NdJ("ngSubmit",function(){return n.onInfoFormSubmit()}),e.TgZ(155,"div",46)(156,"label"),e._uU(157,"Pricing"),e.qZA(),e.TgZ(158,"div",27),e._UZ(159,"ng-select",47),e.qZA()(),e._UZ(160,"div",46),e.TgZ(161,"div",46)(162,"label"),e._uU(163,"Offers/Discounts"),e.qZA(),e.TgZ(164,"div",27),e._UZ(165,"textarea",58),e.qZA()(),e.TgZ(166,"div",46)(167,"label"),e._uU(168,"Special / Additional Instructions"),e.qZA(),e.TgZ(169,"div",27),e._UZ(170,"textarea",59),e.qZA()(),e.TgZ(171,"div",46)(172,"label"),e._uU(173,"Booking Can\u2019t Be Cancelled Before"),e.qZA(),e.TgZ(174,"div",27),e._UZ(175,"input",60),e.qZA()(),e.TgZ(176,"div",42)(177,"button",43),e._uU(178,"Save Changes"),e.qZA(),e.TgZ(179,"button",44),e._uU(180,"Cancel"),e.qZA()()()(),e.TgZ(181,"div",61)(182,"form",25),e.NdJ("ngSubmit",function(){return n.onSocialFormSubmit()}),e.TgZ(183,"div",0)(184,"div",26)(185,"label",62),e._uU(186,"Twitter"),e.qZA(),e._UZ(187,"input",63),e.qZA(),e.TgZ(188,"div",26)(189,"label",64),e._uU(190,"Facebook"),e.qZA(),e._UZ(191,"input",65),e.qZA(),e.TgZ(192,"div",26)(193,"label",66),e._uU(194,"Google+"),e.qZA(),e._UZ(195,"input",67),e.qZA(),e.TgZ(196,"div",26)(197,"label",68),e._uU(198,"Linkedin"),e.qZA(),e._UZ(199,"input",69),e.qZA(),e.TgZ(200,"div",26)(201,"label",70),e._uU(202,"Instagram"),e.qZA(),e._UZ(203,"input",71),e.qZA(),e.TgZ(204,"div",26)(205,"label",72),e._uU(206,"Quora"),e.qZA(),e._UZ(207,"input",73),e.qZA(),e.TgZ(208,"div",42)(209,"button",74),e._uU(210,"Save Changes"),e.qZA(),e.TgZ(211,"button",75),e._uU(212,"Cancel"),e.qZA()()()()(),e.TgZ(213,"div",76)(214,"form",77)(215,"div",0)(216,"div",78)(217,"button",79),e._uU(218,"Connect to "),e.TgZ(219,"strong"),e._uU(220,"Twitter"),e.qZA()()(),e.TgZ(221,"div",78)(222,"button",80),e._uU(223,"edit"),e.qZA(),e.TgZ(224,"h6"),e._uU(225,"You are connected to facebook."),e.qZA(),e.TgZ(226,"p"),e._uU(227,"johndoe@gmail.com"),e.qZA()(),e.TgZ(228,"div",78)(229,"button",81),e._uU(230,"Connect to "),e.TgZ(231,"strong"),e._uU(232,"Google"),e.qZA()()(),e.TgZ(233,"div",78)(234,"button",80),e._uU(235,"edit"),e.qZA(),e.TgZ(236,"h6"),e._uU(237,"You are connected to Instagram."),e.qZA(),e.TgZ(238,"p"),e._uU(239,"johndoe@gmail.com"),e.qZA()(),e.TgZ(240,"div",42)(241,"button",74),e._uU(242,"Save changes"),e.qZA(),e.TgZ(243,"button",75),e._uU(244,"Cancel"),e.qZA()()()()(),e.TgZ(245,"div",82)(246,"div",0)(247,"h6",83),e._uU(248,"Activity"),e.qZA(),e.TgZ(249,"div",84)(250,"div",85),e._UZ(251,"input",86),e.TgZ(252,"label",87),e._uU(253,"Email me when someone comments on my article"),e.qZA()()(),e.TgZ(254,"div",84)(255,"div",85),e._UZ(256,"input",88),e.TgZ(257,"label",89),e._uU(258,"Email me when someone answers on my form"),e.qZA()()(),e.TgZ(259,"div",84)(260,"div",85),e._UZ(261,"input",90),e.TgZ(262,"label",91),e._uU(263,"Email me when someone follows me"),e.qZA()()(),e.TgZ(264,"h6",92),e._uU(265,"Application"),e.qZA(),e.TgZ(266,"div",84)(267,"div",85),e._UZ(268,"input",93),e.TgZ(269,"label",94),e._uU(270,"News and announcements"),e.qZA()()(),e.TgZ(271,"div",84)(272,"div",85),e._UZ(273,"input",95),e.TgZ(274,"label",96),e._uU(275,"Weekly product updates"),e.qZA()()(),e.TgZ(276,"div",84)(277,"div",85),e._UZ(278,"input",97),e.TgZ(279,"label",98),e._uU(280,"Weekly blog digest"),e.qZA()()(),e.TgZ(281,"div",42)(282,"button",74),e._uU(283,"Save changes"),e.qZA(),e.TgZ(284,"button",75),e._uU(285,"Cancel"),e.qZA()()()()()()()()()()),2&r&&(e.xp6(8),e.Q6J("ngClass",e.VKq(36,i,"general"===n.activeTab)),e.xp6(5),e.Q6J("ngClass",e.VKq(38,i,"change-password"===n.activeTab)),e.xp6(5),e.Q6J("ngClass",e.VKq(40,i,"info"===n.activeTab)),e.xp6(5),e.Q6J("ngClass",e.VKq(42,i,"social-links"===n.activeTab)),e.xp6(5),e.Q6J("ngClass",e.VKq(44,i,"connections"===n.activeTab)),e.xp6(5),e.Q6J("ngClass",e.VKq(46,i,"notifications"===n.activeTab)),e.xp6(9),e.Q6J("ngClass",e.VKq(48,i,"general"===n.activeTab)),e.xp6(1),e.Q6J("formGroup",n.generalForm),e.xp6(6),e.Q6J("ngClass",e.WLB(50,s,n.generalFormSubmitted&&n.gf.displayname.invalid,n.generalFormSubmitted&&!n.gf.displayname.invalid)),e.xp6(1),e.Q6J("ngIf",n.generalFormSubmitted&&(n.gf.displayname.invalid||(null==n.gf.displayname.errors?null:n.gf.displayname.errors.required))),e.xp6(5),e.Q6J("ngClass",e.WLB(53,s,n.generalFormSubmitted&&n.gf.email.invalid,n.generalFormSubmitted&&!n.gf.email.invalid)),e.xp6(1),e.Q6J("ngIf",n.generalFormSubmitted&&(n.gf.email.invalid||(null==n.gf.email.errors?null:n.gf.email.errors.required))),e.xp6(2),e.Q6J("ngIf",n.alertVisible),e.xp6(5),e.Q6J("ngClass",e.WLB(56,s,n.generalFormSubmitted&&n.gf.program_description.invalid,n.generalFormSubmitted&&!n.gf.program_description.invalid)),e.xp6(1),e.Q6J("ngIf",n.generalFormSubmitted&&(n.gf.program_description.invalid||(null==n.gf.program_description.errors?null:n.gf.program_description.errors.required))),e.xp6(5),e.Q6J("items",n.category_List),e.xp6(5),e.Q6J("items",n.category_List),e.xp6(9),e.Q6J("items",n.months_List),e.xp6(4),e.Q6J("items",n.years_List),e.xp6(5),e.Q6J("items",n.category_List),e.xp6(11),e.Q6J("ngClass",e.VKq(59,i,"change-password"===n.activeTab)),e.xp6(1),e.Q6J("formGroup",n.changePasswordForm),e.xp6(5),e.Q6J("items",n.category_List),e.xp6(17),e.Q6J("items",n.maxnumber_student_List),e.xp6(5),e.Q6J("ngClass",e.WLB(61,s,n.changePasswordFormSubmitted&&n.cpf.programType.invalid,n.changePasswordFormSubmitted&&!n.cpf.programType.invalid)),e.xp6(1),e.Q6J("ngIf",n.changePasswordFormSubmitted&&(n.cpf.programType.invalid||(null==n.cpf.programType.errors?null:n.cpf.programType.errors.required))),e.xp6(5),e.Q6J("items",n.category_List),e.xp6(5),e.Q6J("items",n.category_List),e.xp6(5),e.Q6J("items",n.category_List),e.xp6(6),e.Q6J("ngClass",e.VKq(64,i,"info"===n.activeTab)),e.xp6(1),e.Q6J("formGroup",n.infoForm),e.xp6(5),e.Q6J("items",n.category_List),e.xp6(22),e.Q6J("ngClass",e.VKq(66,i,"social-links"===n.activeTab)),e.xp6(1),e.Q6J("formGroup",n.socialForm),e.xp6(31),e.Q6J("ngClass",e.VKq(68,i,"connections"===n.activeTab)),e.xp6(32),e.Q6J("ngClass",e.VKq(70,i,"notifications"===n.activeTab)))},dependencies:[m.mk,m.O5,o._Y,o.Fj,o.JJ,o.JL,o.Q7,o.F,o.sg,o.u,u.xm,p.w9],styles:[".ng-dropdown-panel .ng-dropdown-panel-items .ng-option img{margin-right:.7rem}.ng-dropdown-panel .ng-dropdown-panel-items .ng-option img+b{vertical-align:middle}.ng-dropdown-panel .ng-dropdown-panel-items .ng-option.ng-option-marked,.ng-dropdown-panel .ng-dropdown-panel-items .ng-option-selected{background-color:#975aff!important;color:#fff!important}.ng-select .ng-select-container{background-color:transparent!important;border-color:#e0e0e0;border-radius:.35rem;color:#342e49}.ng-select .ng-dropdown-panel{border-color:#e0e0e0;box-shadow:none;margin:0}.ng-select.ng-select-opened>.ng-select-container{border-color:#975aff!important}.ng-select.ng-select-focused:not(.ng-select-opened)>.ng-select-container{border-color:#975aff;box-shadow:none}.ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-value{background-color:#975aff;color:#fff;border-radius:.35rem}.ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-value .ng-value-icon{border:1px solid #7441DB;border-right:0!important;border-top-left-radius:.35rem;border-bottom-left-radius:.35rem;padding:1px 0 1px 5px}.ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-value .ng-value-icon:hover{background-color:inherit}.ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-value .ng-value-label{border:1px solid #7441DB;border-left:0!important;border-top-right-radius:.35rem;border-bottom-right-radius:.35rem}html body.layout-dark:not(.layout-transparent) .ng-select .ng-select-container{border-color:#474748;color:#b2b1b5}html body.layout-dark:not(.layout-transparent) .ng-select .ng-select-container .ng-input>input::-moz-placeholder{color:#b2b1b5}html body.layout-dark:not(.layout-transparent) .ng-select .ng-select-container .ng-input>input,html body.layout-dark:not(.layout-transparent) .ng-select .ng-select-container .ng-input>input::placeholder{color:#b2b1b5}html body.layout-dark.layout-transparent .ng-select .ng-select-container{border-color:#eee3;color:#d6d5d8}html body.layout-dark.layout-transparent .ng-select .ng-select-container .ng-input>input::-moz-placeholder{color:#d6d5d8}html body.layout-dark.layout-transparent .ng-select .ng-select-container .ng-input>input,html body.layout-dark.layout-transparent .ng-select .ng-select-container .ng-input>input::placeholder{color:#d6d5d8}html body.layout-dark .ng-dropdown-panel{border-color:#474748}html body.layout-dark .ng-dropdown-panel .ng-dropdown-panel-items .ng-option{background-color:#1e1e1e;color:#b2b1b5}html body.layout-dark .ng-dropdown-panel .ng-dropdown-panel-items .ng-option.ng-option-disabled{color:#626164}html body.layout-dark .ng-dropdown-panel .ng-optgroup.ng-option-disabled{background-color:#1e1e1e;color:#626164}html body.layout-dark .ng-dropdown-panel .ng-dropdown-header,html body.layout-dark .ng-dropdown-panel .ng-dropdown-footer{background-color:#101010;color:#626164;border-color:#474748}.alert-light-warning{background-color:#feefd0!important;color:#f77e17!important;border-color:#feefd0}\n"],encapsulation:2}),a})()}];let T=(()=>{class a{}return a.\u0275fac=function(r){return new(r||a)},a.\u0275mod=e.oAB({type:a}),a.\u0275inj=e.cJS({imports:[g.Bz.forChild(h),g.Bz]}),a})(),A=(()=>{class a{}return a.\u0275fac=function(r){return new(r||a)},a.\u0275mod=e.oAB({type:a}),a.\u0275inj=e.cJS({imports:[m.ez,T,o.u5,o.UX,u.IJ,p.A0]}),a})()}}]);