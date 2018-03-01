import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {LoginComponent} from './login/login.component';
// import {AdminComponent} from './admin/admin.component';
import {AuthGuard} from './guards/auth-guard';
import {AdminGuard} from './guards/admin-guard';

import {HomeComponent} from './home/home.component';
import {FlowChartComponent} from './flowchart/flowchart.component';
// import {UserComponent} from './user/user.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home',  component: HomeComponent  },
  { path: 'flowchart', component: FlowChartComponent, canActivate: [AuthGuard, AdminGuard] },
  // { path: 'user', component: UserComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutes {
}
