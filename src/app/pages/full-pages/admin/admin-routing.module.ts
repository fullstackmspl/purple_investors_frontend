import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBundleComponent } from './add-bundle/add-bundle.component';
import { ChatgptComponent } from './chatgpt/chatgpt.component';
import { ProviderComponent } from './provider/provider.component';
import { CityManagementComponent } from './city-management/city-management.component';
import { TaskComponent } from './task/task.component';

const routes: Routes = [

    {path:'add',component:AddBundleComponent},
    {path:'chatgpt',component:ChatgptComponent},
    {path:'providers',component:ProviderComponent},
    {path:'city-managements',component:CityManagementComponent},
    {path:'task', component:TaskComponent},
    {   
      path:'',
      loadChildren:()=> import('./user-management/user-management.module').then(m=>m.UserManagementModule)
    },
    {
      path:'',
      loadChildren:()=> import('./programs/programs.module').then(m=>m.ProgramsModule)
    }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
