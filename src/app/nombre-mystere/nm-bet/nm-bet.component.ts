import { Component, OnInit } from '@angular/core';

import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-nm-bet',
  templateUrl: './nm-bet.component.html',
  styleUrls: ['./nm-bet.component.scss'],
})
// export class NmBetComponent implements OnInit {
export class NmBetComponent {
  tries = new FormControl(1);

  tryText = '';

  betDatas = [];
  storage = localStorage.getItem('storedDatas');
  datas = JSON.parse(
    this.storage != null ? this.storage : JSON.stringify(this.betDatas)
  );
  betValue = this.datas[1].value;
  leftTries = this.datas[2].value;

  isCheckDisabled = false;
  harderPlease = false;
  isTriesDisabled = false;
  isResetDisabled = true;

  checkBetValue = () => {
    if (this.betValue != null && this.leftTries < 1) {
      this.harderPlease = true;
      if (this.betValue === 1) {
        this.tryText = `Pour rappel, vous aviez eu le courage de parier sur <span class="important">1</span> tentative !`;
      } else {
        this.tryText = `Pour rappel, vous aviez parié sur <span class="important">${this.betValue}</span> tentatives.`;
      }
    } else if (this.betValue != null && this.leftTries > 1) {
      this.harderPlease = true;
      this.isTriesDisabled = true;
      this.isCheckDisabled = true;
      this.tryText = `<br/>Il vous reste encore <span class="important">${this.leftTries}</span> tentative(s) pour gagner votre pari !
      <br>Si vous souhaitez abandonner la partie en cours, il vous suffit de cliquer sur le bouton "Réinitialiser le jeu", disponible à l'étape 3.`;
    }
  };

  betFunction = () => {
    this.tryText = '';
    if (this.tries.value === null) {
      this.tryText =
        ' <span class="important">Veuillez écrire un nombre dans le formulaire.</span>';
    } else if (this.tries.value > 99 || this.tries.value < 1) {
      this.tryText = ` Le nombre doit être compris entre <span class="important">1</span> et <span class="important">99</span>.`;
    } else {
      this.isTriesDisabled = true;
      this.isResetDisabled = false;
      this.tryText = ` C'est tout bon, il faudra donc trouver le Nombre Mystère en moins de <span class="important">${this.tries.value}</span> tentatives !`;
      const betDatas = [
        { name: 'betIsChecked', value: this.harderPlease },
        { name: 'betValue', value: this.tries.value },
        { name: 'leftTries', value: null },
      ];
      localStorage.setItem('storedDatas', JSON.stringify(betDatas));
    }
  };

  resetFunction = () => {
    this.tries = new FormControl(1);
    this.tryText = '';
    this.isCheckDisabled = false;
    this.isTriesDisabled = false;
    this.isResetDisabled = true;
  };

  ngOnInit(): void {
    this.checkBetValue();
  }
}
