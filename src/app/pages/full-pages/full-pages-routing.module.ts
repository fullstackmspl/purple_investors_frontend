import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserProfilePageComponent } from "./user-profile/user-profile-page.component";
import { UsersListComponent } from './users/users-list/users-list.component';
import { UsersViewComponent } from './users/users-view/users-view.component';
import { UsersEditComponent } from './users/users-edit/users-edit.component';

const routes: Routes = [
  {
    path: '',
    children: [

      
      {
        path: 'profile',
        component: UserProfilePageComponent,
        data: {
          title: 'User Profile Page'
        }
      },
     
      {
        path: 'users-list',
        component: UsersListComponent,
        data: {
          title: 'List'
        }
      },
      {
        path: 'users-view',
        component: UsersViewComponent,
        data: {
          title: 'View'
        }
      },
      {
        path: 'users-edit',
        component: UsersEditComponent,
        data: {
          title: 'Edit'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FullPagesRoutingModule { }
