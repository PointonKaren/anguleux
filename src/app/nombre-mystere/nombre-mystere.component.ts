import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

//TODO: utiliser un service plutôt que le local storage

@Component({
  selector: 'app-nombre-mystere',
  templateUrl: './nombre-mystere.component.html',
  styleUrls: ['./nombre-mystere.component.scss'],
})
export class NombreMystereComponent {
  constructor(title: Title, meta: Meta) {
    title.setTitle('Anguleux - Nombre Mystère');
    meta.updateTag({
      name: 'description',
      content:
        'Petit jeu qui consiste à deviner un nombre aléatoire entre 0 et 100.',
    });
  }
  bet = false;
  intro = true;
  game = false;

  showIntro = () => {
    this.bet = false;
    this.intro = true;
    this.game = false;
  };
  showBet = () => {
    this.bet = true;
    this.intro = false;
    this.game = false;
  };
  showGame = () => {
    this.bet = false;
    this.intro = false;
    this.game = true;
  };
}
