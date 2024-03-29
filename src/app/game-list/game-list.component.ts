import { Component } from '@angular/core';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss'],
})
export class GameListComponent {
  justePrix: boolean;
  mastermind: boolean;
  pendu: boolean;
  tetris: boolean;

  constructor() {
    this.justePrix = false;
    this.mastermind = false;
    this.pendu = false;
    this.tetris = false;
  }
}
