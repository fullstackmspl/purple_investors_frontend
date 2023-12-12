import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBundleComponent } from './add-bundle/add-bundle.component';
import { ChatgptComponent } from './chatgpt/chatgpt.component';

const routes: Routes = [

    {path:'add',component:AddBundleComponent},
    {path:'chatgpt',component:ChatgptComponent}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
