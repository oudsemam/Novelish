import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import {Router} from '@angular/router';
import * as Sentry from "@sentry/angular";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainHeaderComponent } from './main-header/main-header.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { ShelfComponent } from './shelf/shelf.component';
import { NotesOrReviewsComponent } from './notes-or-reviews/notes-or-reviews.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { BookViewComponent } from './book-view/book-view.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { ResultsComponent } from './results/results.component';
import { MainHomePageComponent } from './main-home-page/main-home-page.component';
import { ReviewToggleButtonComponent } from './review-toggle-button/review-toggle-button.component';
import { ShelvesComponent } from './shelves/shelves.component';
import { BookComponent } from './book/book.component';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { ReviewPageComponent } from './review-page/review-page.component';


//font awesome use
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Firebase services + enviorment module
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { DashboardComponent } from './FireBase/dashboard/dashboard.component';
import { SignInComponent } from './FireBase/sign-in/sign-in.component';
import { SignUpComponent } from './FireBase/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './FireBase/forgot-password/forgot-password.component';

// Auth service
import { AuthService } from "./shared/services/auth.service";
import { FormsModule } from '@angular/forms';
import { NovelishBackendService } from './novelish-backend.service';
import { NyTimesService } from './ny-times.service';
import { OpenLibraryService } from './open-library.service';




@NgModule({
  declarations: [
    AppComponent,
    MainHeaderComponent,
    SearchBarComponent,
    ShelfComponent,
    NotesOrReviewsComponent,
    SideMenuComponent,
    BookViewComponent,
    ReviewsComponent,
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    ResultsComponent,
    MainHomePageComponent,
    ReviewToggleButtonComponent,
    ShelvesComponent,
    BookComponent,
    ReviewPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    HttpClientModule,
    FormsModule,
    IvyCarouselModule

  ],
  providers: [
    AuthService,
    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler({
        showDialog: true,
      }),
    },
    {
      provide: Sentry.TraceService,
      deps: [Router],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: () => () => {},
      deps: [Sentry.TraceService],
      multi: true,
    },
    NovelishBackendService,
    NyTimesService,
    OpenLibraryService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
