import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ProfileComponent} from './profile/profile.component';
import {HonorListComponent} from './honor-list/honor-list.component';
import {SocialLinkListComponent} from './social-link-list/social-link-list.component';
import {ProjectListComponent} from './project-list/project-list.component';
import {FavoriteBookListComponent} from './favorite-book-list/favorite-book-list.component';
import {RecommendedBookListComponent} from './recommended-book-list/recommended-book-list.component';
import {AutographComponent} from './autograph/autograph.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProfileComponent,
    SpinnerComponent,
    HonorListComponent,
    AutographComponent,
    ProjectListComponent,
    SocialLinkListComponent,
    FavoriteBookListComponent,
    RecommendedBookListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
