import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AddBundleComponent } from './add-bundle/add-bundle.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { ChatgptComponent } from './chatgpt/chatgpt.component';
import { MarkdownModule } from 'ngx-markdown';
import { PipeModule } from 'app/shared/pipes/pipe.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ProviderComponent } from './provider/provider.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CityManagementComponent } from './city-management/city-management.component';
import { TaskComponent } from './task/task.component';


@NgModule({
  declarations: [
    AddBundleComponent,
    ChatgptComponent,
    ProviderComponent,
    CityManagementComponent,
    TaskComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgSelectModule,
    PipeModule,
    NgxDatatableModule,
    NgxSpinnerModule

  ]
})
export class AdminModule { }
