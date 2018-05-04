import { Routes, RouterModule } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { NewsComponent } from "./components/news/news.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { NgModule } from "@angular/core";

const adminRoutes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dasboard', component: DashboardComponent },
            { path: 'news', component: NewsComponent },
            { path: 'settings', component: SettingsComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(adminRoutes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }