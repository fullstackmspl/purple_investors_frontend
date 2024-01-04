import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AddBundleComponent } from './add-bundle/add-bundle.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { ChatgptComponent } from './chatgpt/chatgpt.component';
import { PipeModule } from 'app/shared/pipes/pipe.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ProviderComponent } from './provider/provider.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CityManagementComponent } from './city-management/city-management.component';
import { TaskComponent } from './task/task.component';
import { SharedModule } from 'app/shared/shared.module';
import { MatMenuModule } from '@angular/material/menu';
import { QueueComponent } from './queue/queue.component';

@NgModule({
  declarations: [
    AddBundleComponent,
    ChatgptComponent,
    ProviderComponent,
    CityManagementComponent,
    TaskComponent,
    QueueComponent
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
    NgxSpinnerModule,
    SharedModule,
    MatMenuModule
  ]
})
export class AdminModule { }
