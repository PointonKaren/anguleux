import { style } from '@angular/animations';
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

  changeIntroTabStyle = (BG: string, Txt: string, border: string) => {
    let introTab = document.getElementById('intro');
    if (introTab != null) {
      introTab.style.backgroundColor = BG;
      introTab.style.color = Txt;
      introTab.style.borderBottomColor = border;
    }
  };
  changeBetTabStyle = (BG: string, Txt: string, border: string) => {
    let betTab = document.getElementById('bet');
    if (betTab != null) {
      betTab.style.backgroundColor = BG;
      betTab.style.color = Txt;
      betTab.style.borderBottomColor = border;
    }
  };
  changeGameTabStyle = (BG: string, Txt: string, border: string) => {
    let gameTab = document.getElementById('game');
    if (gameTab != null) {
      gameTab.style.backgroundColor = BG;
      gameTab.style.color = Txt;
      gameTab.style.borderBottomColor = border;
    }
  };

  showIntro = () => {
    this.bet = false;
    this.intro = true;
    this.game = false;
    this.changeIntroTabStyle('#33343d', '#d1c0ff', '#33343d');
    this.changeBetTabStyle('transparent', '#b798ff', '#9770fa');
    this.changeGameTabStyle('transparent', '#b798ff', '#9770fa');
  };

  showBet = () => {
    this.bet = true;
    this.intro = false;
    this.game = false;
    this.changeIntroTabStyle('transparent', '#b798ff', '#9770fa');
    this.changeBetTabStyle('#33343d', '#d1c0ff', '#33343d');
    this.changeGameTabStyle('transparent', '#b798ff', '#9770fa');
  };
  showGame = () => {
    this.bet = false;
    this.intro = false;
    this.game = true;
    this.changeIntroTabStyle('transparent', '#b798ff', '#9770fa');
    this.changeBetTabStyle('transparent', '#b798ff', '#9770fa');
    this.changeGameTabStyle('#33343d', '#d1c0ff', '#33343d');
  };
}
