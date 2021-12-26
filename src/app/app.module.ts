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

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    HonorListComponent,
    ProjectListComponent,
    SocialLinkListComponent,
    FavoriteBookListComponent,
    RecommendedBookListComponent,
    AutographComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
