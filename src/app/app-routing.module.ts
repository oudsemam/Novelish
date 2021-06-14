import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import all the components for which navigation service has to be activated 
import { SignInComponent } from '../app/FireBase/sign-in/sign-in.component';
import { SignUpComponent } from '../app/FireBase/sign-up/sign-up.component';
import { DashboardComponent } from '../app/FireBase/dashboard/dashboard.component';
import { ForgotPasswordComponent } from '../app/FireBase/forgot-password/forgot-password.component';
import { AuthGuard } from './shared/guard/auth.guard';

//Pages
import { MainHomePageComponent } from './main-home-page/main-home-page.component';
import { ShelvesComponent } from './shelves/shelves.component';
import { ReviewPageComponent } from './review-page/review-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: MainHomePageComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'shelves', component: ShelvesComponent},
  { path: 'review', component: ReviewPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
