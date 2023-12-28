import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatatableComponent, ColumnMode } from '@swimlane/ngx-datatable';
import { ApiServiceService } from 'app/shared/services/api-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ListComponent implements OnInit {


  @ViewChild(DatatableComponent) table: DatatableComponent;

  taskForm:FormGroup

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
    { name: "Description", prop: "description" },
    { name: "Phone", prop: "phone_number" },
    { name: "Actions", prop: "Actions" },
  ];


  imageUrl='';
  id: any;
  
  constructor( public apiService:ApiServiceService,
               private modalService: NgbModal,
               public toastr: ToastrService,
               private spinner: NgxSpinnerService,private formBuilder : FormBuilder,
               private activatedRoute: ActivatedRoute) {
                this.activatedRoute.params.subscribe(params => {
                  this.id = params['id'];
                });
                }

  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', ],
      task_date: ['', ],
      notes: ['', ],
      admin_notes: ['', ],
      working_hour: ['', ],
      budget: ['', ]
    });
    this.getProgramsByUserId()
  }

  pageChangeData(page:any){
    this.apiService.getAllTask(this.limitRef,page.offset +1).subscribe((res: any) => {
      this.rows = res?.data?.user
      this.rows.reverse()
      this.page.totalPages = res?.data?.TotalCount
    })
  }
  getProgramsByUserId(){
    this.apiService.getProgramsByUserId(this.id,this.limitRef,1).subscribe((res: any) => {
      this.rows = res?.data?.items
      // this.rows.reverse()
      this.page.totalPages = res?.data?.totalCount
      console.log(res,this.rows)
    })
  }
  showCategoryNames(categories){
    let arr=[]
    for(let i=0;i<categories.length;i++){
      arr.push(categories[i].name)
    }
    return arr.toString()
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

}