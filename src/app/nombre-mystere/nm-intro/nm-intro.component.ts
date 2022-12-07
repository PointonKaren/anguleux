import { Component } from '@angular/core';

@Component({
  selector: 'app-nm-intro',
  templateUrl: './nm-intro.component.html',
  styleUrls: ['./nm-intro.component.scss'],
})
export class NmIntroComponent {
  showStepTwo = () => {
    console.log("Au clic, on devra pouvoir accéder à l'étape 2");
    //TODO: Trouver comment rendre cette fonctionnalité possible
  };
  showStepThree = () => {
    console.log("Au clic, on devra pouvoir accéder à l'étape 3");
    //TODO: Trouver comment rendre cette fonctionnalité possible
  };
}
