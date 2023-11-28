import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { BookNowComponent } from './components/book-now/book-now.component';
import { ContactComponent } from './components/contact/contact.component';
import { ContentComponent } from './components/content/content.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PoolAreaComponent } from './components/pool-area/pool-area.component';
import { RegistComponent } from './components/regist/regist.component';
import { RoomsAreaComponent } from './components/rooms-area/rooms-area.component';

declare function load($: typeof jQuery): void;

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    ContentComponent,
    HeroComponent,
    BookNowComponent,
    AboutUsComponent,
    PoolAreaComponent,
    RoomsAreaComponent,
    ContactComponent,
    LoginComponent,
    RegistComponent,
    AboutUsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
