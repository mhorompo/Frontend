import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { AccommodationComponent } from './components/accommodation/accommodation.component';
import { BookNowComponent } from './components/book-now/book-now.component';
import { ContentComponent } from './components/content/content.component';
import { EditAccommodationComponent } from './components/edit-accommodation/edit-accommodation.component';
import { ListAccommodationsComponent } from './components/list-accommodations/list-accommodations.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegistComponent } from './components/regist/regist.component';
import { ViewAccommodationComponent } from './components/view-accommodation/view-accommodation.component';
import { AuthGuard } from './guard/auth.guard';
import { CompletedPayComponent } from './components/completed-pay/completed-pay.component';

const routes: Routes = [
  { path: 'not-found', component: NotFoundComponent },
  { path: '', component: ContentComponent },
  { path: 'login', component: LoginComponent },
  { path: 'regist', component: RegistComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'accommodation', component: AccommodationComponent, canActivate: [AuthGuard] },
  { path: 'viewAccommodation/:id', component: ViewAccommodationComponent },
  { path: 'listAccommodations', component: ListAccommodationsComponent, canActivate: [AuthGuard] },
  { path: 'editAccommodation/:id', component: EditAccommodationComponent, canActivate: [AuthGuard] },
  { path: 'bookNow/:id', component: BookNowComponent },
  { path: 'completed', component: CompletedPayComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: '/not-found', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
