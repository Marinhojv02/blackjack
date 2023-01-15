import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './components/playing/main-page/main-page.component';
import { HomePageComponent } from './components/home/home-page/home-page.component';

const routes: Routes = [
  {path: 'home-page', component:HomePageComponent},
  {path: '', component:MainPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
