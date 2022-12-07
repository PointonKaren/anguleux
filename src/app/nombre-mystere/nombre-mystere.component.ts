import { Component } from '@angular/core';

@Component({
  selector: 'app-nombre-mystere',
  templateUrl: './nombre-mystere.component.html',
  styleUrls: ['./nombre-mystere.component.scss'],
})
export class NombreMystereComponent {
  bet = false;
  difficulty = true;
  game = false;

  showDifficulty = () => {
    this.bet = false;
    this.difficulty = true;
    this.game = false;
  };
  showBet = () => {
    this.bet = true;
    this.difficulty = false;
    this.game = false;
  };
  showGame = () => {
    this.bet = false;
    this.difficulty = false;
    this.game = true;
  };
}
