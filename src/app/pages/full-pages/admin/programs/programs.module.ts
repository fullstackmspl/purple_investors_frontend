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


@NgModule({
  declarations: [
    AddProgramComponent,
    ListComponent
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
  ]
})
export class ProgramsModule { }
