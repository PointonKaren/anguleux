import { Component } from '@angular/core';

import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-nm-bet',
  templateUrl: './nm-bet.component.html',
  styleUrls: ['./nm-bet.component.scss'],
})
export class NmBetComponent {
  tries = new FormControl(1);

  tryText = '';

  isCheckDisabled = false;
  harderPlease = false;
  isTriesDisabled = false;
  isResetDisabled = true;

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
}
