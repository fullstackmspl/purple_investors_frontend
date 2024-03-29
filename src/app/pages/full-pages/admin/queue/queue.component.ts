import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { DatatableComponent, ColumnMode } from '@swimlane/ngx-datatable';
import { setPageNumber } from 'app/App Store/actions/pageChange.actions';
import { AppState } from 'app/App Store/state';
import { Queue } from 'app/shared/models/queue.model';
import { ApiServiceService } from 'app/shared/services/api-service.service';
import { WondrflyApiService } from 'app/shared/services/wondrfly-api.service';
import { MarkdownService } from 'ngx-markdown';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import swal from 'sweetalert2';

const validateUrlCount = (control: FormControl) => {
  if (typeof control.value !== 'string') {
    return null;  // If not a string, return null (no error)
  }

  const urls = control.value.split(',').map(url => url.trim());
  return urls.length <= 5 ? null : { invalidUrlCount: true };
};
@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class QueueComponent implements OnInit {


  @ViewChild(DatatableComponent) table: DatatableComponent;

  queueForm: FormGroup

  page = {
    pageNumber: 0,
    offset: 0,
    pageSize: 10,
    totalPages: 0
  };
  // row data
  public rows = [];
  public filterRows = [];
  public ColumnMode = ColumnMode;
  public limitRef = 100;
  public columns = [
    { name: "Name", prop: "name" },
    { name: "Email", prop: "email" },
    { name: "Phone", prop: "phone_number" },
    { name: "Actions", prop: "Actions" },
  ];


  imageUrl = '';

  row_id: any
  row_name: any
  gender_List = [
    { name: 'male' },
    { name: 'female' }
  ]
  role_List = [
    { name: 'SuperAdmin', _id: 'superadmin' },
    { name: 'Admin', _id: 'admin' },
    { name: 'MTurkers', _id: 'mturkers' },
  ]
  select_gender = null
  select_role = null
  queue_model: any = new Queue

  type_List = [
    { name: 'Manual', _id: 'manual' },
    { name: 'Chatgpt', _id: 'chatgpt' }
  ]
  chatgpt_queue :boolean = false
  select_type = 'manual'
  select_url_count = 5
  url_count_list = Array.from({ length: 10 }, (_, i) => i + 1);
  status_List = [
    { name: 'Pending', _id: 'pending' },
    { name: 'Accepted', _id: 'accepted' },
    { name: 'Decline', _id: 'decline' },
    { name:'Processed',_id:'processed'}
  ]
  select_status = 'pending'
  select_city = null
  select_subject: any
  city_List = []
  subject_List = []
  public queueUrlView: boolean[] = [];
  queue_url_id: any

  messages: { sender: string; text: string; isMe: boolean }[] = [];
  newMessage: string = '';
  user: any
  json_data: any
  website_url: any
  cityId:string="6578546cc5e9c2b1c8909c24";

  provider = {
    fullname: '',
    email: '',
    phone_number: '',
    dob: '',
    gender: '',
    location: { type: "Point", coordinates: [] },
    address: '',
    roles: 'purpleprovider',
    averageGoogleRating: '',
    averageYelpRating: '',
    bottomGoogleReviews: [],
    facebookNumberOfFollowers: '',
    facebookNumberOfLikes: '',
    facebookURL: '',
    googleReviewsURL: '',
    instagramProfileLink: '',
    mostRecentGoogleReviews: [],
    numberOfGoogleReviews: '',
    numberOfInstagramFollowers: '',
    numberOfYelpRatings: '',
    topGoogleReviews: [],
    yelpBottomReviews: [],
    yelpMostRecentReviews: [],
    yelpTopReviews: [],
    yelpProfileURL: '',
    websiteUrl: '',
    cityId:this.cityId,
    type:''
  }
  activeTab: any;
  tags: any[];
  select_city_object: any;
  chatGptProviders: any[];
  queue_urls: any;
  filteredData: any;
  providerId: any;
  activePage = 1
  filter_List =[
    {name:'By Name' ,id:'byName'},
    {name:'Latest' ,id:'byDate'}
  ]
  selected_filter ='byName'
  queueType:any
  
  pageNumberSubscription : Subscription
  pageNo
  constructor(public apiService: ApiServiceService,
    private modalService: NgbModal,
    public toastr: ToastrService,
    private spinner: NgxSpinnerService, private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef, private route: Router,
    private activatedRoute: ActivatedRoute,
    private wondrflyapiservice: WondrflyApiService,
    public markDown: MarkdownService, private store: Store<AppState>) {
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
    if(!this.activeTab ) this.activeQueueTab('pending',this.pageNo?this.pageNo:1)
    
   

  }

  ngOnInit(): void {
    
    this.setAndGetQueuebyStatus()
    this.getAllCity()
    this.getTags()
    this.queueForm = this.formBuilder.group({
      cityId: ['', Validators.required],
      url: ['', [Validators.required, validateUrlCount]],
      notes: ['',],
      admin_notes: ['',],

    });
  }
  get rf() {
    return this.queueForm.controls;
  }
  setPage(pageNumber: number) {
    this.store.dispatch(setPageNumber({ pageNumber }));
  }
  activeQueueTab(tab,page) {
    if(page<1){ page =1}
    const activetab = tab;
    if (activetab !== '') {
      this.route.navigate(
        [],
        { relativeTo: this.activatedRoute, queryParams: { status: activetab, page : page },queryParamsHandling: 'merge' }
      );
    }

  }
  setAndGetQueuebyStatus() {
    this.activatedRoute.queryParams
      .subscribe((params: any) => {
        this.activeTab = params?.status;
        switch (this.activeTab) {
          case 'pending':
            this.getAllQueue(this.activeTab);
            break;
          case 'accepted':
            this.getAllQueue(this.activeTab);
            break
          case 'decline':
            this.getAllQueue(this.activeTab);
            break;
            case 'processed':
              this.getAllQueue(this.activeTab);
              break;
        }
      })
  }

  getAllCity() {
    this.apiService.getAllCity(1000, 1).subscribe((res: any) => {
      this.city_List = res?.data?.user
    })
  }
  getTags() {
    this.tags = []
    this.wondrflyapiservice.getTags().subscribe((res: any) => {
      this.tags = res;
      this.subject_List = this.tags.filter((item) => item.isActivated === true);
    });
  }
  getAllQueue(status) {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
    this.apiService.getAllQueue(this.cityId,status,this.selected_filter, this.limitRef, this.page.pageNumber + 1).subscribe((res: any) => {
      this.spinner.hide();
      this.rows = res?.data?.items
      this.page.totalPages = res?.data?.totalCount
    })
  }


  pageChangeData(page: any) {
    this.activePage = page.offset + 1

    this.route.navigate([], {
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
    this.apiService.getAllQueue(this.cityId,this.activeTab,this.selected_filter, this.limitRef, page.offset + 1).subscribe((res: any) => {
      this.spinner.hide();
      this.setPage(page.offset + 1)
      this.rows = res?.data?.items
      this.page.totalPages = res?.data?.totalCount
    })
  }

  deleteQueue() {
    if (this.row_id) {
      this.apiService.deleteQueue(this.row_id).subscribe((res: any) => {
        if (res?.statusCode === 200) {
          swal.fire({
            icon: "success",
            title: 'Deleted!',
            text: `${res?.message}`,
            customClass: {
              confirmButton: 'btn btn-success'
            },
          })
          this.setAndGetQueuebyStatus()
        }
        else {
          this.toastr.error(res.error)
        }
      })
    }
    else {
      this.toastr.error('something went wrong !!')
    }
  }
  // ================== Delete Alert ========================
  confirmDelete(id: any) {
    this.row_id = id
    swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
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
    }).then((result) => {
      if (result.value) {
        this.deleteQueue()
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

  // ==========================================
  openModal(content, rowdata, prop) {
    if (prop === 'manual') {
      this.select_type = "manual"
    }
    if (prop === 'chatgpt') {
      this.select_type = "chatgpt"
    }
    if (prop === 'gemini') {
      this.select_type = "gemini"
    }
    if (rowdata) {
      this.row_id = rowdata?._id
      this.row_name = rowdata.cityId.city
      this.select_city = rowdata.cityId?._id
      this.queue_model.cityId = this.select_city
      this.select_status = rowdata.status
      this.queue_model.urls = rowdata.urls

    }
    const modalOptions: NgbModalOptions = {
      size: 'lg', // 'sm', 'lg', or 'xl'
      backdrop: 'static',
    };
    const modalRef = this.modalService.open(content, modalOptions);
    modalRef.result.then((result) => {
      this.queueForm.reset()
      this.row_id = null
      this.select_city = null
      this.select_type = null

    }, (reason) => {
      this.queueForm.reset()
      this.row_id = null
      this.select_city = null
      this.select_type = null

    });
  }
  refreshChatGptData(){
    this.chatgpt_queue = false
          this.select_city = null
          this.select_url_count = 5
          this.select_subject = null
          this.queue_urls = []
          this.queueForm.reset()
  }
  chatGptSearch() {
    if(this.select_city && this.select_url_count && this.select_subject){
    let city = this.city_List.find((item) => item._id === this.select_city)
    this.select_city_object = city
    this.spinner.show(undefined, {
      type: 'ball-triangle-path',
      size: 'medium',
      bdColor: 'rgba(0, 0, 0, 0.8)',
      color: '#fff',
      fullScreen: true
    });
    let serchText = `Please provide ${this.select_url_count} website urls of providers of ${this.select_subject} in ${city.city}.`
    this.apiService.chatgptSearch('6578625ec5e9c2b1c8909c58', this.user._id, serchText).subscribe((res: any) => {
      if (res?.isSuccess) {
        this.spinner.hide()
        // this.ngZone.run(() => {
        const data = res?.data[0]?.message?.content;
        this.json_data = data
        this.markDown.getSource(this.json_data).subscribe((res) => { this.json_data = res })
        console.log(typeof (this.json_data))
        const urlRegex = /\b(?:https?|ftp):\/\/[^\s\)]+/g;
        const urls = this.json_data.match(urlRegex);
        console.log(urls);
        const regex = /\[([^\]]+)\]\(([^)]+)\)/g;

        // Array to store extracted objects
        const providers = [];
        let match;
        while ((match = regex.exec(this.json_data)) !== null) {
          const [, name, url] = match;
          providers.push({ name, url });
        }
        this.chatGptProviders = providers
        this.queue_urls = urls
        this.chatgpt_queue = true
      }
      else this.toastr.error(res?.error)
    })
  }
  else{
    return
  }
  }
  geminiSearch(){
    if(this.select_city && this.select_url_count && this.select_subject){
    let city = this.city_List.find((item) => item._id === this.select_city)
    this.select_city_object = city
    this.spinner.show(undefined, {
      type: 'ball-triangle-path',
      size: 'medium',
      bdColor: 'rgba(0, 0, 0, 0.8)',
      color: '#fff',
      fullScreen: true
    });
    let serchText = `Please provide ${this.select_url_count} website urls of providers of ${this.select_subject} in ${city.city}.`
    this.apiService.geminiSearch(serchText,this.user._id).subscribe((res: any) => {
      if (res?.isSuccess) {
        this.spinner.hide()
        // this.ngZone.run(() => {
        const data = res?.data;
        this.json_data = data
        this.markDown.getSource(this.json_data).subscribe((res) => { this.json_data = res })
        console.log(typeof (this.json_data))
        const urlRegex = /\b(?:https?|ftp):\/\/[^\s\)]+/g;
        const urls = this.json_data.match(urlRegex);
        // Array to store extracted objects
        const providers = [];
        providers.push(urls.map(item=>item))
        this.chatGptProviders = providers[0]
        this.queue_urls = urls
        this.chatgpt_queue = true
      }
      else this.toastr.error(res?.error)
    })
  }
  else{
    return
  }
  }
  chatGptMsgReturn() {
    return `${this.select_subject} Activity Providers in ${this.select_city_object?.city}`
  }
  addQueue() {
    let urlArray = []
    if (this.select_type == 'manual') {
      urlArray = this.queueForm.value.url.split(',');
      urlArray = urlArray.map((u) => (u.trim()));
    }
    if (this.select_type == 'chatgpt') {
      urlArray = this.queue_urls
    }
    if (this.select_type === 'gemini') {
      urlArray = this.queue_urls
    }
    let body = {
      cityId: this.select_city,
      urls: urlArray,
      urls_limit: 5,
      notes: this.queueForm.value.notes,
      admin_notes: this.queueForm.value.admin_notes,
      type: this.select_type,
    }

    if (!this.row_id) {
      this.apiService.addQueue(body).subscribe((res: any) => {
        if (res?.isSuccess === true) {
          this.toastr.success('queue add successfull!')
          this.modalService.dismissAll()
          this.setAndGetQueuebyStatus();
          this.refreshChatGptData()
        }
        else this.toastr.error(res?.error)
      })
    }
    if (this.row_id) {
      let urlArray = this.queue_model.urls.split(',');
      urlArray = urlArray.map((u) => (u.trim()));
      this.queue_model.urls = urlArray
      this.apiService.updateQueue(this.row_id, this.queue_model).subscribe((res: any) => {
        if (res?.isSuccess === true) {
          this.toastr.success('queue update successfull!')
          this.modalService.dismissAll()
          this.setAndGetQueuebyStatus();
          this.refreshChatGptData()
        }
        else this.toastr.error(res?.error)
      })
    }
  }
  getStatusId(event) {
    this.select_status
  }
  getTypeId(event) {
    this.select_type
  }
  getCityId(event) {
    this.select_city
  }
  updateStatus(id, status_id) {

    let body = {
      status: status_id
    }
    if (id) {
      this.apiService.updateQueue(id, body).subscribe((res: any) => {
        if (res.statusCode === 200) {
          this.toastr.success('status update successfully')
          this.setAndGetQueuebyStatus()
        }
        else {
          this.toastr.error(res.error)
        }
      })
    }
  }
  updateUrl() {
    let urlArray = this.queue_model.urls.split(',');
    urlArray = urlArray.map((u) => ({ url: u.trim(), status: this.select_status }));
    this.queue_model.urls = urlArray
    let body = {
      urls: {
        url: this.queue_model.urls[0].url,
        status: this.select_status
      }
    }
    if (this.row_id) {
      this.apiService.updateQueueUrl(this.row_id, this.queue_url_id, body).subscribe((res: any) => {
        if (res.statusCode === 200) {
          this.toastr.success('update successfully')
          this.modalService.dismissAll()
          this.setAndGetQueuebyStatus()
        }
        else {
          this.toastr.error(res.error)
        }
      })

    }
  }

  openModalForProvider(content, data) {
    this.newMessage = data.urls[0]
    this.row_id = data._id
    this.website_url = this.newMessage
    this.queueType = data.type
    this.spinner.show(undefined, {
      type: 'ball-triangle-path',
      size: 'medium',
      bdColor: 'rgba(0, 0, 0, 0.8)',
      color: '#fff',
      fullScreen: true
    });
    const modalOptions: NgbModalOptions = {
      size: 'lg', // 'sm', 'lg', or 'xl'
      backdrop: 'static',
    };
    if(data.type ==='chatgpt'){
      if (!!this.newMessage.trim()) {
        const exactMsg = `${this.newMessage} Please find name, email, phoneNumber and Locations (with lat lng), - from Open AI API in json format with fields as it is "fullname, email, phone_number, location:{coordinates:[lat,lng]}, address "`
        this.messages.push({ sender: 'You', text: this.newMessage, isMe: true });
        this.apiService.chatgptSearch('6578625ec5e9c2b1c8909c58', this.user._id, exactMsg).subscribe((res: any) => {
          if (res?.isSuccess) {
            this.spinner.hide()
            // this.ngZone.run(() => {`
            const data = res?.data[0]?.message?.content;
            this.json_data = data
            this.setProvider()

            this.messages.push({ sender: 'ChatGpt', text: data.match(/\{.*\}/s) && data.match(/\{.*\}/s).length ? this.generateHTML(JSON.parse(data.match(/\{.*\}/s)[0])) : data, isMe: false });
            this.newMessage = '';
            // });
            this.cdr.detectChanges();
            const modalRef = this.modalService.open(content, modalOptions);
            modalRef.result.then((result) => {

            }, (reason) => {
            });
          }
          else {
            this.toastr.error(res?.error)
            this.spinner.hide()
          }
        })

      }
    }
    if(data.type ==='gemini'){
      if (!!this.newMessage.trim()) {
        const exactMsg = `${this.newMessage} Please find name, email, phoneNumber and Locations (with lat lng), - from Vertex AI in json format with fields as it is "fullname, email, phone_number, location:{coordinates:[lat,lng]}, address `
        this.messages.push({ sender: 'You', text: this.newMessage, isMe: true });
        this.apiService.geminiSearch(exactMsg,this.user._id).subscribe((res: any) => {
          if (res?.isSuccess) {
            this.spinner.hide()
            // this.ngZone.run(() => {
            const data = res?.data;
            this.json_data = data
            this.setProvider()

            this.messages.push({ sender: 'Gemini', text: data.match(/\{.*\}/s) && data.match(/\{.*\}/s).length ? this.generateHTML(JSON.parse(data.match(/\{.*\}/s)[0])) : data, isMe: false });
            this.newMessage = '';
            // });
            this.cdr.detectChanges();
            const modalRef = this.modalService.open(content, modalOptions);
            modalRef.result.then((result) => {

            }, (reason) => {
            });
          }
          else {
            this.toastr.error(res?.error)
            this.spinner.hide()
          }
        })

      }
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

  setProvider() {
    let jsonString = this.json_data.match(/\{.*\}/s);
    this.provider = JSON.parse(jsonString)
    this.provider.roles = 'purpleprovider'
    this.provider.cityId = this.cityId
    this.provider.type = this.queueType
  }
  async setAddress(addressData) {
    this.provider.location = { type: "Point", coordinates: [addressData[0].lng, addressData[0].lat] }
    this.provider.address = addressData[1].formatted_address

    if (!Array.isArray(addressData?.coordinates)) {
      addressData = { ...addressData, coordinates: Object.values(addressData.coordinates) }
    }
    this.provider.location = addressData || null;


  }
  details(data) {
    try {

      this.provider.websiteUrl = this.website_url
      this.apiService.addUser(this.provider).subscribe((res: any) => {
        if (res?.isSuccess === true) {
          let body ={
            addProvider : true,
            status :'processed'
          }

          this.apiService.updateQueue(this.row_id, body).subscribe((res: any) => {
          })
          this.toastr.success('provider registered successfull!')
          this.modalService.dismissAll()
          this.setAndGetQueuebyStatus()
        }
        else{
          this.toastr.error(res?.error)
          this.modalService.dismissAll();
        }
      })

    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  }
  searchQueue(){
    this.apiService.getAllQueue(this.cityId,this.activeTab,this.selected_filter, this.limitRef, this.page.pageNumber + 1).subscribe((res: any) => {
      this.spinner.hide();
      this.rows = res?.data?.items
      this.page.totalPages = res?.data?.totalCount
    })
  }
  onSearchProvider(term): void {
    this.apiService.searchProviders(term.term).subscribe((result) => {
      this.filteredData = result.data;
      this.spinner.hide();
    });
  }
  getFilterId(event){
    this.selected_filter
    this.getAllQueue(this.activeTab)
  }
}
