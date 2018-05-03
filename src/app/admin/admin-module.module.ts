import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserListComponent } from './user-list/user-list.component';
import { AngularFireModule } from 'angularfire2';
import { AdminService } from "./admin-service/admin.service";
import { NavComponent } from './nav/nav.component';
import { NewsComponent } from './news/news.component';
import { SettingsComponent } from './settings/settings.component';

const adminRoutes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      {path: 'admin/users', component: UserListComponent},
      {path: 'admin/news', component: NewsComponent},
      {path: 'admin/settings', component: SettingsComponent},
    ]
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
  declarations: [DashboardComponent, UserListComponent, NavComponent, NewsComponent, SettingsComponent]
})
export class AdminModuleModule { }
