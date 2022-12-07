import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { GameListComponent } from './game-list/game-list.component';
import { NombreMystereComponent } from './nombre-mystere/nombre-mystere.component';
import { MastermindComponent } from './mastermind/mastermind.component';
import { PenduComponent } from './pendu/pendu.component';
import { TetrisComponent } from './tetris/tetris.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { NmBetComponent } from './nombre-mystere/nm-bet/nm-bet.component';
import { NmIntroComponent } from './nombre-mystere/nm-intro/nm-intro.component';
import { NmGameComponent } from './nombre-mystere/nm-game/nm-game.component';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    GameListComponent,
    NombreMystereComponent,
    MastermindComponent,
    PenduComponent,
    TetrisComponent,
    AboutMeComponent,
    NmBetComponent,
    NmIntroComponent,
    NmGameComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
