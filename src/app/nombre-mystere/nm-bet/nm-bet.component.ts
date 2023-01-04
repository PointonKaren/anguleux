import { Component } from '@angular/core';

import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-nm-bet',
  templateUrl: './nm-bet.component.html',
  styleUrls: ['./nm-bet.component.scss'],
})
export class NmBetComponent {
  tries = new FormControl(1);

  betText = 'Cliquez ici pour lancer un pari !';
  tryText = '';

  betDatas = [];
  storage = localStorage.getItem('storedDatas');
  datas = JSON.parse(
    this.storage != null ? this.storage : JSON.stringify(this.betDatas)
  );
  betValue = this.datas[1].value;
  leftTries = this.datas[2].value;

  betCheckVisible = true;
  isCheckDisabled = false;
  harderPlease = false;
  isTriesDisabled = false;
  isResetDisabled = true;
  betInputVisible = true;
  betDone = false;
  resetIsVisible = false;

  checkBetValue = () => {
    if (this.betValue != null && this.leftTries < 1) {
      this.harderPlease = true;
      this.betInputVisible = false;
      this.isCheckDisabled = true;
      if (this.betValue === 1) {
        this.tryText = `Pour rappel, vous aviez eu le courage de parier sur <span class="important">1</span> tentative !
        <br>Si vous souhaitez abandonner la partie en cours, il vous suffit de cliquer sur le bouton "Réinitialiser le jeu", disponible à l'étape 3.`;
      } else {
        this.tryText = `Pour rappel, vous aviez parié sur <span class="important">${this.betValue}</span> tentatives.
        <br>Si vous souhaitez abandonner la partie en cours, il vous suffit de cliquer sur le bouton "Réinitialiser le jeu", disponible à l'étape 3.`;
      }
    } else if (this.betValue != null && this.leftTries >= 1) {
      this.harderPlease = true;
      this.isTriesDisabled = true;
      this.betCheckVisible = false;
      this.isCheckDisabled = true;
      this.betInputVisible = false;
      this.resetIsVisible = true;
      this.betDone = false;
      this.tryText = `Il vous reste encore <span class="important">${this.leftTries}</span> tentative(s) pour gagner votre pari !
      <br>Si vous souhaitez abandonner la partie en cours, il vous suffit de cliquer sur le bouton "Réinitialiser le jeu"`;
    }
  };

  betFunction = () => {
    this.tryText = '';
    if (this.tries.value === null) {
      this.tryText =
        '<span class="important">Veuillez écrire un nombre dans le formulaire.</span>';
    } else if (this.tries.value > 99 || this.tries.value < 1) {
      this.tryText = `Le nombre doit être compris entre <span class="important">1</span> et <span class="important">99</span>.`;
    } else {
      this.isTriesDisabled = true;
      this.isResetDisabled = false;
      this.betInputVisible = false;
      this.betDone = true;
      this.betCheckVisible = false;
      this.tryText = `C'est noté, il faudra donc trouver le Nombre Mystère en moins de <span class="important">${this.tries.value}</span> tentative(s) !
      <br/>Vous pouvez désormais passer à l'étape 3 !`;
      const betDatas = [
        { name: 'betIsChecked', value: this.harderPlease },
        { name: 'betValue', value: this.tries.value },
        { name: 'leftTries', value: null },
      ];
      localStorage.setItem('storedDatas', JSON.stringify(betDatas));
    }
  };

  changeBet = () => {
    this.tries = new FormControl(1);
    this.tryText = '';
    this.betCheckVisible = true;
    this.betText = 'Décocher pour annuler le pari :';
    this.isCheckDisabled = false;
    this.isTriesDisabled = false;
    this.isResetDisabled = true;
    this.betInputVisible = true;
    this.betDone = false;
    const betDatas = [
      { name: 'betIsChecked', value: false },
      { name: 'betValue', value: null },
      { name: 'leftTries', value: null },
    ];
    localStorage.setItem('storedDatas', JSON.stringify(betDatas));
  };

  resetFunction = () => {
    this.betCheckVisible = true;
    this.isCheckDisabled = false;
    this.harderPlease = false;
    this.isTriesDisabled = false;
    this.isResetDisabled = true;
    this.betInputVisible = true;
    this.betDone = false;
    this.resetIsVisible = true;
    this.resetIsVisible = false;

    this.tryText = '';

    localStorage.clear();
    const betDatas = [
      { name: 'betIsChecked', value: false },
      { name: 'betValue', value: null },
      { name: 'leftTries', value: null },
    ];
    localStorage.setItem('storedDatas', JSON.stringify(betDatas));
  };

  ngOnInit(): void {
    this.checkBetValue();
  }
}
