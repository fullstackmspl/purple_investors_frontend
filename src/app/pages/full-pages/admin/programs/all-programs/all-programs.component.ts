import { ChangeDetectionStrategy, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatatableComponent, ColumnMode } from '@swimlane/ngx-datatable';
import { ApiServiceService } from 'app/shared/services/api-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2';

@Component({
  selector: 'app-all-programs',
  templateUrl: './all-programs.component.html',
  styleUrls: ['./all-programs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AllProgramsComponent implements OnInit {


  @ViewChild(DatatableComponent) table: DatatableComponent;

  taskForm: FormGroup

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
    { name: "Description", prop: "description" },
    { name: "Phone", prop: "phone_number" },
    { name: "Actions", prop: "Actions" },
  ];


  imageUrl = '';
  id: any;
  program: string;
  filteredData: any;
  city_List: any;
  providerId: any;
  cityId:string="6578546cc5e9c2b1c8909c24";

  constructor(public apiService: ApiServiceService,
    private modalService: NgbModal,
    public toastr: ToastrService,
    private spinner: NgxSpinnerService, private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
    });
  }
  customSearchFn(term: string, item: any): boolean {
    console.log('customSearchFn', term, item);
    return item.name.toLowerCase().includes(term.toLowerCase());
  }

searchProgram(){
  this.apiService.searchProgram(this.providerId, this.cityId).subscribe((res: any) => {
    this.rows = res?.data
    this.spinner.hide();
    console.log(res, this.rows)
    // this.rows.reverse()
    this.page.totalPages = res?.data?.totalCount
    console.log(res, this.rows)
  })
}
  onSearchProvider(term): void {
    console.log('onSearchProvider', term);
    // this.spinner.show(undefined,
    //   {
    //     type: 'ball-triangle-path',
    //     size: 'medium',
    //     bdColor: 'rgba(0, 0, 0, 0.8)',
    //     color: '#fff',
    //     fullScreen: true
    //   });
    // if (term.length >= 3) {
    this.apiService.searchProviders(term.term).subscribe((result) => {
      this.filteredData = result.data;
      this.spinner.hide();
    });
    // } else {
    //   this.filteredData = [];
    // }
  }
  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['',],
      task_date: ['',],
      notes: ['',],
      admin_notes: ['',],
      working_hour: ['',],
      budget: ['',]
    });
    if (this.id) {
      this.getProgramsByUserId()
    }
    else {

    }
    this.getAllCity()
    this.searchProgram()
  }
  getAllCity() {
    // this.spinner.show(undefined,
    //   {
    //     type: 'ball-triangle-path',
    //     size: 'medium',
    //     bdColor: 'rgba(0, 0, 0, 0.8)',
    //     color: '#fff',
    //     fullScreen: true
    //   });
    this.apiService.getAllCity(1000, 1).subscribe((res: any) => {
      // this.spinner.hide();
      this.city_List = res?.data?.user
    })
  }
  pageChangeData(page: any) {
    this.apiService.getProgramsByUserId(this.id, this.limitRef, page.offset + 1).subscribe((res: any) => {
      this.rows = res?.data?.user
      // this.rows.reverse()
      this.page.totalPages = res?.data?.TotalCount
    })
  }
  getProgramsByUserId() {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
    this.apiService.getProgramsByUserId(this.id, this.limitRef, 1).subscribe((res: any) => {
      this.rows = res?.data?.items
      this.spinner.hide();
      // this.rows.reverse()
      this.page.totalPages = res?.data?.totalCount
      console.log(res, this.rows)
    })
  }
  editProgram(row) {
    this.router.navigateByUrl(`/add-program/${row.user}?id=${row._id}`)
  }
  confirmDelete(id: string) {
    this.program = id
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
        this.deleteProgram()
      } else if (result.dismiss === swal.DismissReason.cancel) {
        swal.fire({
          title: 'Cancelled',
          text: 'Your Program is safe :)',
          icon: 'error',
          customClass: {
            confirmButton: 'btn btn-success'
          },
        })
      }
    });
  }
  deleteProgram() {
    this.apiService.deleteProgram(this.program).subscribe((res: any) => {
      this.getProgramsByUserId()
    })
  }
  showCategoryNames(categories) {
    let arr = []
    for (let i = 0; i < categories.length; i++) {
      arr.push(categories[i].name)
    }
    return arr.toString()
  }
  getTagsFilter(data: any) {
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
  resetFilter() {
    // this.inputName.nativeElement.value=''
    // this.selected_tag_cat_id ='all'
    // this.getAllTag()
  }

}