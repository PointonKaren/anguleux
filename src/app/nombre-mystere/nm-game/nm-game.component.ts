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

  result = '';
  status = '';
  tryText = '';
  tryRule = 'À vos propositions !';
  numberOfTriesLeft = '';
  reset = 'Réinitialiser le jeu';

  betDatas = [];
  storage = localStorage.getItem('storedDatas');
  datas = JSON.parse(
    this.storage != null ? this.storage : JSON.stringify(this.betDatas)
  );

  attemptsArray = [];
  attemptsStorage = localStorage.getItem('attempts');

  harderPlease = this.datas[0].value;
  betValue = this.datas[1].value;
  leftTries = this.datas[2].value;

  isCheckDisabled = false;
  isResetDisabled = true;
  isTriesDisabled = true;
  isWon = false;
  sameNumber = false;
  gameResults = false;
  legendIsHere = false;

  attempts = new Array();

  checkIfBet = () => {
    if (this.betValue === 1) {
      this.tryRule = `Quel courage ! Vous avez parié que vous réussirez à trouver le Nombre Mystère en 1 tentative !`;
      if (this.attemptsStorage === null) {
        console.log('bloup');
      } else {
        this.attempts = JSON.parse(this.attemptsStorage);
        console.log(this.attempts);
      }
    } else if (
      this.betValue != null &&
      this.betValue != 1 &&
      this.leftTries != null
    ) {
      this.tryRule = `Vous aviez parié que vous trouverez le Nombre Mystère en <span class="important">${this.betValue}</span> tentatives !
      <br/>Il vous en reste <span class="important">${this.leftTries}</span>.`;
    } else if (
      this.betValue != null &&
      this.betValue != 1 &&
      this.leftTries === null
    ) {
      this.tryRule = `Vous avez parié que vous trouverez le Nombre Mystère en <span class="important">${this.betValue}</span> tentatives !`;
    } else {
      console.log(this.attempts);
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
    if (this.harderPlease) {
      this.tryRule = `Vous avez de nouveau droit à <span class="important">${this.betValue}</span> tentatives. <br/>Pour modifier ce nombre, vous pouvez retourner à l\'étape 2 !`;
    } else {
      this.tryRule = `N'hésitez pas à passer l'étape 2 pour parier sur le nombre de tentatives nécessaires !`;
    }
    if (this.reset === 'Nouvelle partie') {
      this.reset = 'Réinitialiser le jeu';
    }
    this.harderPlease = null;
    this.isBasicDisabled = false;
    this.isResetDisabled = true;
    this.isCheckDisabled = false;
    this.isTriesDisabled = true;
    this.gameResults = false;
    this.legendIsHere = false;
    this.attempts = new Array();
  };

  randomFunction = () => {
    this.isCheckDisabled = true;
    this.isResetDisabled = false;
    this.tryRule = '';
    if (this.attemptsStorage === null) {
      console.log('bloup');
    } else {
      console.log(JSON.parse(this.attemptsStorage));
    }
    if (this.number.value === null) {
      this.result = 'Veuillez écrire un nombre dans le formulaire.';
    } else {
      this.count += 1;
      this.gameResults = true;
      console.log(`Nombre de tentatives : ${this.count}`);
      if (this.number.value < this.random) {
        this.legendIsHere = true;
        this.result = `Essai n°${this.count} : <span class="important">${this.number.value}</span> est plus <span class="important">petit</span> que le nombre à deviner.`;
        this.status = `<span class="important status">🡹</span>`;
      } else if (this.number.value > this.random) {
        this.legendIsHere = true;
        this.result = `Essai n°${this.count} : <span class="important">${this.number.value}</span> est plus <span class="important">grand</span> que le chiffre à deviner.`;
        this.status = `<span class="important status">🡻</span>`;
      } else if (this.number.value === this.random && this.random != 42) {
        this.result = `Bravo ! Le nombre à deviner, <span class="important">${this.random}</span>, a été trouvé en ${this.count} tentatives !`;
        this.status = `<span class="important status">✔</span>`;
        this.reset = 'Nouvelle partie';
        this.isBasicDisabled = true;
        this.isWon = true;
        this.legendIsHere = false;
      } else if (this.random === 42 && this.number.value === 42) {
        this.result = `Hééééééé oui, 42 est encore une fois LA réponse ! <br/>Nombre d'essais : ${this.count}`;
        this.reset = 'Nouvelle partie';
        this.status = `<span class="important status">✔</span>`;
        this.isBasicDisabled = true;
        this.isWon = true;
        this.legendIsHere = false;
      }
      this.attempts.push({
        count: `${this.count}`,
        number: `${this.number.value}`,
        status: `${this.status}`,
      });
      console.log(this.attempts);
      localStorage.setItem('attempts', JSON.stringify(this.attempts));
      //TODO: stocker ça dans le LS pour récupérer les données quand on revient sur l'étape 3
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
          if (this.leftTries === 1) {
            this.numberOfTriesLeft = `Il vous reste <span class="important">1</span> tentative !`;
          } else {
            this.numberOfTriesLeft = `Il vous reste <span class="important">${this.leftTries}</span> tentatives sur les <span class="important">${this.betValue}</span> prévues.`;
          }
          const betDatas = [
            { name: 'betIsChecked', value: this.harderPlease },
            { name: 'betValue', value: this.betValue },
            { name: 'leftTries', value: this.leftTries },
          ];
          localStorage.setItem('storedDatas', JSON.stringify(betDatas));
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
    console.log(this.leftTries);
    if (this.attemptsStorage === null) {
      console.log('bloup');
    } else {
      console.log(JSON.parse(this.attemptsStorage));
    }
  }
}
//TODO: Faire que le bouton réinitialiser le jeu réinitialise également le pari et redirige vers Etape 1
