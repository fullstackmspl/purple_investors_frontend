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


@NgModule({
  declarations: [
    AddBundleComponent,
    ChatgptComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgSelectModule,
    PipeModule

  ]
})
export class AdminModule { }
