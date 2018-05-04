import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminRoutingModule } from './admin-routing.module';

//COMPONENTS
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { NavComponent } from './components/nav/nav.component';
import { NewsComponent } from './components/news/news.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AdminComponent } from './admin.component';

//SERVICES
import { AdminService } from "./services/admin-service/admin.service";


@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  exports: [RouterModule],
  providers: [AdminService],
  declarations: [DashboardComponent, UserListComponent, NavComponent, NewsComponent, SettingsComponent, AdminComponent]
})
export class AdminModuleModule { }
