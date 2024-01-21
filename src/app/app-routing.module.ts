import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { AccommodationComponent } from './components/accommodation/accommodation.component';
import { ContactComponent } from './components/contact/contact.component';
import { ContentComponent } from './components/content/content.component';
import { EditAccommodationComponent } from './components/edit-accommodation/edit-accommodation.component';
import { ListAccommodationsComponent } from './components/list-accommodations/list-accommodations.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegistComponent } from './components/regist/regist.component';
import { ViewAccommodationComponent } from './components/view-accommodation/view-accommodation.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: 'not-found', component: NotFoundComponent },
  { path: '', component: ContentComponent },
  { path: 'login', component: LoginComponent },
  { path: 'regist', component: RegistComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'accommodation', component: AccommodationComponent, canActivate: [AuthGuard] },
  { path: 'viewAccommodation/:id', component: ViewAccommodationComponent, canActivate: [AuthGuard] },
  { path: 'listAccommodations', component: ListAccommodationsComponent, canActivate: [AuthGuard]},
  { path: 'editAccommodation/:id', component: EditAccommodationComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: '/not-found', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
