import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProgramComponent } from './add-program/add-program.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {path:'add-program', component:AddProgramComponent},
  {path:'programs-list', component:ListComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramsRoutingModule { }
