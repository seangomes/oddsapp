import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserListComponent } from './user-list/user-list.component';
import { AngularFireModule } from 'angularfire2';
import { AdminService } from "./admin-service/admin.service";

const adminRoutes: Routes = [
  {
    path: '', component: DashboardComponent
  }




];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(adminRoutes),
    AngularFireModule
  ],
  exports: [RouterModule],
  providers: [AdminService],
  declarations: [DashboardComponent, UserListComponent]
})
export class AdminModuleModule { }
