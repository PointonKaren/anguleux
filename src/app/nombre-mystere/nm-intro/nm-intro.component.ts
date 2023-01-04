import { Component, OnInit } from '@angular/core';
//TODO: Prévoir un bouton pour réinitialiser le jeu
//TODO: Faire basculer l'utilisateur sur le component associé au clic sur le nom de l'étape

@Component({
  selector: 'app-nm-intro',
  templateUrl: './nm-intro.component.html',
  styleUrls: ['./nm-intro.component.scss'],
})
export class NmIntroComponent implements OnInit {
  showStepTwo = () => {
    console.log("Au clic, on devra pouvoir accéder à l'étape 2");
  };
  showStepThree = () => {
    console.log("Au clic, on devra pouvoir accéder à l'étape 3");
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
