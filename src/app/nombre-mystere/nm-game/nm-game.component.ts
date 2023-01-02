import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-nm-game',
  templateUrl: './nm-game.component.html',
  styleUrls: ['./nm-game.component.scss'],
})
export class NmGameComponent implements OnInit {
  number = new FormControl(0);
  tries = new FormControl(0);
  isBasicDisabled = false;

  constructor() {}
  min = 0;
  max = 100;
  random = Math.floor(Math.random() * (this.max - this.min)) + this.min;
  count = 0;
  leftTries = 99;

  result = '';
  status = '';
  tryText = '';
  tryRule = '';
  numberOfTriesLeft = '';
  reset = 'Réinitialiser le jeu';

  betDatas = [];
  storage = localStorage.getItem('storedDatas');
  datas = JSON.parse(
    this.storage != null ? this.storage : JSON.stringify(this.betDatas)
  );

  harderPlease = this.datas[0].value;
  betValue = this.datas[1].value;
  isCheckDisabled = false;
  isResetDisabled = true;
  isTriesDisabled = true;
  isWon = false;
  sameNumber = false;

  attempts = new Array();

  checkIfBet = () => {
    if (this.betValue === 1) {
      this.tryRule = `Quel courage ! Vous avez parié que vous réussirez à trouver le Nombre Mystère en 1 tentative !`;
    }
    if (this.betValue != null && this.betValue != 1) {
      this.tryRule = `Vous avez parié que vous trouverez le Nombre Mystère en <span class="important">${this.betValue}</span> tentatives !`;
    }
  };

  checkThenRandom = () => {
    this.result = '';
    if (this.number.value === null) {
      this.result = 'Veuillez écrire un nombre dans le formulaire.';
    } else if (this.number.value > 100 || this.number.value < 0) {
      this.result = `Le nombre doit être compris entre <span class="important">0</span> et <span class="important">100</span>.`;
    } else {
      if (this.attempts.length != 0) {
        // Le tableau n'est pas vide
        for (let attempt of this.attempts) {
          if (this.number.value === parseInt(attempt.number)) {
            // Valeurs identiques, on sort de la boucle.
            this.sameNumber = true;
            break;
          } else {
            // Valeur différente, on continue le déroulement du code
            this.sameNumber = false;
          }
        }
        if (this.sameNumber === true) {
          // Nombres identiques
          this.result = `<span class="important">${this.number.value}</span> a déjà été testé, veuillez proposer un autre nombre SVP.`;
        } else {
          // Nombres différents
          this.randomFunction();
        }
      } else {
        // Tableau vide
        this.randomFunction();
      }
    }
  };

  resetFunction = () => {
    this.random = Math.floor(Math.random() * (this.max - this.min)) + this.min;
    this.count = 0;
    this.number = new FormControl(0);
    this.tries = new FormControl(1);
    this.result = '';
    this.numberOfTriesLeft = '';
    this.tryText = '';
    this.tryRule = '';
    if (this.reset === 'Nouvelle partie') {
      this.reset = 'Réinitialiser le jeu';
    }
    this.harderPlease = this.datas[0].value;
    this.isBasicDisabled = false;
    this.isResetDisabled = true;
    this.isCheckDisabled = false;
    this.isTriesDisabled = true;
    this.attempts = new Array();
  };

  randomFunction = () => {
    this.isCheckDisabled = true;
    this.isResetDisabled = false;
    this.tryRule = '';
    if (this.number.value === null) {
      this.result = 'Veuillez écrire un nombre dans le formulaire.';
    } else {
      this.count += 1;
      console.log(`Nombre de tentatives : ${this.count}`);
      if (this.number.value < this.random) {
        this.result = `Essai n°${this.count} : <span class="important">${this.number.value}</span> est plus <span class="important">petit</span> que le nombre à deviner.`;
        this.status = `<span class="important status">🡹</span>`;
      } else if (this.number.value > this.random) {
        this.result = `Essai n°${this.count} : <span class="important">${this.number.value}</span> est plus <span class="important">grand</span> que le chiffre à deviner.`;
        this.status = `<span class="important status">🡻</span>`;
      } else if (this.number.value === this.random && this.random != 42) {
        this.result = `Bravo ! Le nombre à deviner, <span class="important">${this.random}</span>, a été trouvé en ${this.count} tentatives !`;
        this.status = `<span class="important status">✔</span>`;
        this.reset = 'Nouvelle partie';
        this.isBasicDisabled = true;
        this.isWon = true;
      } else if (this.random === 42 && this.number.value === 42) {
        this.result = `Hééééééé oui, 42 est encore une fois LA réponse ! <br/>Nombre d'essais : ${this.count}`;
        this.reset = 'Nouvelle partie';
        this.status = `<span class="important status">✓</span>`;
        this.isBasicDisabled = true;
        this.isWon = true;
      }
      this.attempts.push({
        count: `${this.count}`,
        number: `${this.number.value}`,
        status: `${this.status}`,
      });
    }
    if (this.harderPlease === true) {
      // Activation du mode "nombre de tentative limité"
      this.tryText = '';
      if (this.betValue === null) {
        this.tryText = "Veuillez définir un nombre de tentative dans l'étape 2";
      } else if (this.isWon != true) {
        if (this.count >= this.betValue) {
          this.numberOfTriesLeft =
            'Perdu ! Le nombre de tentatives autorisé a été dépassé.';
        } else {
          this.leftTries = this.betValue - this.count;
          this.numberOfTriesLeft = `Sur les <span class="important">${this.betValue}</span> tentatives prévues, il en reste <span class="important">${this.leftTries}</span>.`;
        }
      } else {
        this.leftTries = this.betValue - this.count;
        this.numberOfTriesLeft = `Sur les <span class="important">${this.betValue}</span> tentatives prévues, il en restait <span class="important">${this.leftTries}</span> !`;
      }
    }
  };

  ngOnInit(): void {
    this.tries = new FormControl(1);
    console.log(`Le nombre aléatoire est : ${this.random}`);
    this.checkIfBet();
  }
}
//TODO: Faire que le bouton réinitialiser le jeu réinitialise également le pari et redirige vers Etape 1
