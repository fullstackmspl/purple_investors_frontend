import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProgramComponent } from './add-program/add-program.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {path:'add-program/:id', component:AddProgramComponent},
  {path:'programs-list/:id', component:ListComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramsRoutingModule { }
