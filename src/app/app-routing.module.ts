import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutMeComponent } from './about-me/about-me.component';
import { MainComponent } from './main/main.component';
import { MastermindComponent } from './mastermind/mastermind.component';
import { NombreMystereComponent } from './nombre-mystere/nombre-mystere.component';
import { PenduComponent } from './pendu/pendu.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'nombre-mystere', component: NombreMystereComponent },
  { path: 'mastermind', component: MastermindComponent },
  { path: 'pendu', component: PenduComponent },
  { path: 'about', component: AboutMeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
