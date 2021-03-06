import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import all the components for which navigation service has to be activated 
import { SignInComponent } from './FireBase/sign-in/sign-in.component';
import { SignUpComponent } from './FireBase/sign-up/sign-up.component';
import { DashboardComponent } from './FireBase/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './FireBase/forgot-password/forgot-password.component';
import { AuthGuard } from './shared/guard/auth.guard';

//Pages
import { MainHomePageComponent } from './main-home-page/main-home-page.component';
import { ShelvesComponent } from './shelves/shelves.component';
import { ReviewPageComponent } from './review-page/review-page.component';
import { ResultsComponent } from './results/results.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { BookViewComponent } from './book-view/book-view.component';
import { ReviewToggleButtonComponent } from './review-toggle-button/review-toggle-button.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: MainHomePageComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'shelves', component: ShelvesComponent},
  { path: 'reviews', component: ReviewToggleButtonComponent},
  { path: 'results', component: ResultsComponent},
  { path: 'side-menu', component: SideMenuComponent},
  { path: 'books/:isbn', component: BookViewComponent},
  { path: 'about', component: AboutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
