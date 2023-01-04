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
  count = 0;
  random = -1;

  result = '';
  status = '';
  tryRule = 'À vos propositions !';
  numberOfTriesLeft = '';
  reset = 'Réinitialiser le jeu';

  isResetDisabled = true;
  isWon = false;
  sameNumber = false;
  gameResults = false;
  legendIsHere = false;
  resetButtonVisible = false;

  attempts = new Array();
  attemptsArray = [];
  attemptsStorage = localStorage.getItem('attempts');

  betDatas = [];
  storage = localStorage.getItem('storedDatas');
  datas = JSON.parse(
    this.storage != null ? this.storage : JSON.stringify(this.betDatas)
  );

  betIsChecked = this.datas[0].value;
  betValue = this.datas[1].value;
  leftTries = this.datas[2].value;

  /**
   * Fonction qui vérifie dans le LS si un nombre n'a pas déjà été généré
   * et génère un nombre aléatoire le cas échéant.
   * (Utile en cas de rechargement de l'étape 3 par l'utilisateur)
   */
  randomizeNumber = () => {
    const storageNumber = localStorage.getItem('mysteryNumber');
    if (storageNumber != null) {
      this.random = parseInt(storageNumber);
    } else if (this.random === -1) {
      this.random =
        Math.floor(Math.random() * (this.max - this.min)) + this.min;
      localStorage.setItem('mysteryNumber', JSON.stringify(this.random));
    } else {
      console.log(this.random);
    }
  };

  /**
   * Fonction qui vérifie si un pari a été lancé dans l'étape 2
   */
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
    }
  };

  /**
   * Fonction qui vérifie que les données du formulaire :
   * - sont bien des valeurs entre 0 et 100
   * - n'ont pas déjà été testées
   */
  checkDatas = () => {
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
          this.gameFunction();
        }
      } else {
        // Tableau vide
        this.gameFunction();
      }
    }
  };

  /**
   * Fonction qui réinitialise le jeu
   */
  resetFunction = () => {
    this.random = -1;
    this.count = 0;

    this.result = '';
    this.numberOfTriesLeft = '';
    if (this.reset === 'Nouvelle partie') {
      this.reset = 'Réinitialiser le jeu';
    }
    this.betIsChecked = false;
    this.isBasicDisabled = false;
    this.gameResults = false;
    this.legendIsHere = false;
    this.resetButtonVisible = false;

    this.attempts = new Array();

    localStorage.clear();
    const betDatas = [
      { name: 'betIsChecked', value: false },
      { name: 'betValue', value: null },
      { name: 'leftTries', value: null },
    ];
    localStorage.setItem('storedDatas', JSON.stringify(betDatas));
  };

  /**
   * Fonction qui récupère les données du tableau de résultats
   * (Utile en cas de rechargement de l'étape 3 par l'utilisateur)
   */
  getResultsFromLS = () => {
    if (this.attemptsStorage != null) {
      console.log(JSON.parse(this.attemptsStorage));
      this.attempts = JSON.parse(this.attemptsStorage);
      console.log(this.attempts);
      this.gameResults = true;
    }
  };

  /**
   * Si essai < nombre mystère
   */
  valueInfRandom = () => {
    this.legendIsHere = true;
    this.result = `Essai n°${this.count} : <span class="important">${this.number.value}</span> est plus <span class="important">petit</span> que le nombre à deviner.`;
    this.status = `<span class="important status">🡹</span>`;
  };

  /**
   * Si essai > nombre mystère
   */
  valueSupRandom = () => {
    this.legendIsHere = true;
    this.result = `Essai n°${this.count} : <span class="important">${this.number.value}</span> est plus <span class="important">grand</span> que le chiffre à deviner.`;
    this.status = `<span class="important status">🡻</span>`;
  };

  /**
   * Booléens à modifier en cas de victoire
   */
  winBooleans = () => {
    this.isBasicDisabled = true;
    this.isWon = true;
    this.legendIsHere = false;
  };

  /**
   * Si réussite mais nombre mystère n'est pas 42
   */
  winButNot42 = () => {
    this.result = `Bravo ! Le nombre à deviner, <span class="important">${this.random}</span>, a été trouvé en ${this.count} tentative(s) !`;
    this.status = `<span class="important status">✔</span>`;
    this.reset = 'Nouvelle partie';
    this.winBooleans();
  };

  /**
   * Si réussite et nombre mystère = 42
   */
  perfectWin = () => {
    this.result = `Hééééééé oui, 42 est encore une fois LA réponse ! <br/>Nombre d'essais : ${this.count}`;
    this.reset = 'Nouvelle partie';
    this.status = `<span class="important status">✔</span>`;
    this.winBooleans();
  };

  /**
   * Fonction qui active le mode "Pari"
   */
  betMode = () => {
    if (this.betIsChecked === true) {
      if (this.isWon != true) {
        if (this.count >= this.betValue) {
          this.numberOfTriesLeft = `Perdu ! Le nombre de tentatives parié a été atteint.
            <br/>Le Nombre Mystère était <span class="important">${this.random}</span>.`;
          this.legendIsHere = false;
          this.isBasicDisabled = true;
          this.result = '';
        } else {
          this.leftTries = this.betValue - this.count;
          console.log(this.leftTries, this.betValue, this.count);

          if (this.leftTries === 1) {
            this.numberOfTriesLeft = `<span class="important">Attention !</span> Il ne vous reste qu'<span class="important">1</span> tentative !`;
          } else if (this.leftTries != 1) {
            this.numberOfTriesLeft = `Il vous reste <span class="important">${this.leftTries}</span> tentatives sur les <span class="important">${this.betValue}</span> prévues.`;
          } else {
            this.numberOfTriesLeft =
              'Un problème est survenu, veuillez réinitialiser le jeu svp.';
          }
          const betDatas = [
            { name: 'betIsChecked', value: this.betIsChecked },
            { name: 'betValue', value: this.betValue },
            { name: 'leftTries', value: this.leftTries },
          ];
          localStorage.setItem('storedDatas', JSON.stringify(betDatas));
        }
      } else {
        this.leftTries = this.betValue - this.count;
        this.numberOfTriesLeft = `Sur les <span class="important">${this.betValue}</span> tentatives pariées, il en restait <span class="important">${this.leftTries}</span> !`;
      }
    }
  };

  /**
   * Fonction principale
   */
  gameFunction = () => {
    this.tryRule = '';
    this.resetButtonVisible = true;

    if (this.number.value === null) {
      this.result = 'Veuillez écrire un nombre dans le formulaire.';
    } else {
      this.count += 1;
      this.gameResults = true;
      console.log(`Nombre de tentatives : ${this.count}`);
      if (this.number.value < this.random) {
        this.valueInfRandom();
      } else if (this.number.value > this.random) {
        this.valueSupRandom();
      } else if (this.number.value === this.random && this.random != 42) {
        this.winButNot42();
      } else if (this.random === 42 && this.number.value === 42) {
        this.perfectWin();
      }
      this.attempts.push({
        count: `${this.count}`,
        number: `${this.number.value}`,
        status: `${this.status}`,
      });
      localStorage.setItem('attempts', JSON.stringify(this.attempts));
    }
    this.betMode();
  };

  ngOnInit(): void {
    this.tries = new FormControl(1);
    this.checkIfBet();
    this.randomizeNumber();
    this.getResultsFromLS();
    console.log(`Le nombre aléatoire est : ${this.random}`);
  }
}
//TODO: Faire que le bouton réinitialiser le jeu réinitialise également le pari et redirige vers Etape 1
