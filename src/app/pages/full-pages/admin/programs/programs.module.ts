import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgramsRoutingModule } from './programs-routing.module';
import { AddProgramComponent } from './add-program/add-program.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { ListComponent } from './list/list.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatOptionModule } from '@angular/material/core';
import { TagInputModule } from 'ngx-chips';
import { AllProgramsComponent } from './all-programs/all-programs.component';

@NgModule({
  declarations: [
    AddProgramComponent,
    ListComponent,
    AllProgramsComponent
  ],
  imports: [
    CommonModule,
    ProgramsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgSelectModule,
    NgxDatatableModule,
    NgxSpinnerModule,
    MatOptionModule,
    TagInputModule
  ]
})
export class ProgramsModule { }
