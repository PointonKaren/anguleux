import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nm-intro',
  templateUrl: './nm-intro.component.html',
  styleUrls: ['./nm-intro.component.scss'],
})
export class NmIntroComponent implements OnInit {
  showStepTwo = () => {
    console.log("Au clic, on devra pouvoir accéder à l'étape 2");
    //TODO: Trouver comment rendre cette fonctionnalité possible
  };
  showStepThree = () => {
    console.log("Au clic, on devra pouvoir accéder à l'étape 3");
    //TODO: Trouver comment rendre cette fonctionnalité possible
  };
  ngOnInit(): void {
    const betDatas = [
      { name: 'betIsChecked', value: false },
      { name: 'betValue', value: null },
      { name: 'leftTries', value: null },
    ];
    localStorage.setItem('storedDatas', JSON.stringify(betDatas));
  }
}
