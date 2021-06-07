import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainHeaderComponent } from './main-header/main-header.component';

//font awesome use
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { ShelfComponent } from './shelf/shelf.component';
import { NotesOrReviewsComponent } from './notes-or-reviews/notes-or-reviews.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { BookViewComponent } from './book-view/book-view.component';
import { ReviewsComponent } from './reviews/reviews.component';

@NgModule({
  declarations: [
    AppComponent,
    MainHeaderComponent,
    SearchBarComponent,
    ShelfComponent,
    NotesOrReviewsComponent,
    SideMenuComponent,
    BookViewComponent,
    ReviewsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
