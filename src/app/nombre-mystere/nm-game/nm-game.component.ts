import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-nm-game',
  templateUrl: './nm-game.component.html',
  styleUrls: ['./nm-game.component.scss'],
})
export class NmGameComponent implements OnInit {
  number = new FormControl(0);

  constructor() {}
  min = 0;
  max = 100;
  count = 0;
  random = -1;

  result = '';
  resultComment = '';
  status = '';
  tryRule = 'À vos propositions !';
  numberOfTriesLeft = '';

  formIsVisible = true;
  isResetDisabled = true;
  isWon = false;
  sameNumber = false;
  gameResultsIsVisible = false;
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
      this.tryRule = `Vous avez parié que vous allez trouver le Nombre Mystère du premier coup... bonne chance 😁`;
      if (this.attemptsStorage != null) {
        this.attempts = JSON.parse(this.attemptsStorage);
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
          this.tryRule = '';
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
   * Fonction qui récupère les données du tableau de résultats
   * (Utile en cas de rechargement de l'étape 3 par l'utilisateur)
   */
  getResultsFromLS = () => {
    if (this.attemptsStorage != null) {
      this.attempts = JSON.parse(this.attemptsStorage);
      this.gameResultsIsVisible = true;
    }
  };

  /**
   * Fonction qui stocke dans le local storage les données de pari + boolean réussite/échec du jeu
   * @param betIsChecked :any
   * @param betValue :any
   * @param leftTries :any
   * @param isWon :boolean
   */
  storeBetInLS = (
    betIsChecked: any,
    betValue: any,
    leftTries: any,
    isWon: boolean
  ) => {
    const betDatas = [
      { name: 'betIsChecked', value: betIsChecked },
      { name: 'betValue', value: betValue },
      { name: 'leftTries', value: leftTries },
      { name: 'isWon', value: isWon },
    ];
    localStorage.setItem('storedDatas', JSON.stringify(betDatas));
  };
  /**
   *
   * @param formIsVisible boolean (Formulaire visible ou non)
   * @param gameResultsIsVisible boolean (Tableau de résultats visible ou non)
   * @param resetButtonVisible (Bouton resetGame visible ou non)
   */
  changeBooleans = (
    formIsVisible: boolean,
    gameResultsIsVisible: boolean,
    resetButtonVisible: boolean
  ) => {
    this.formIsVisible = formIsVisible;
    this.gameResultsIsVisible = gameResultsIsVisible;
    this.resetButtonVisible = resetButtonVisible;
  };

  /**
   * Si tentative < nombre mystère
   */
  valueInfRandom = () => {
    this.result = `Tentative n°${this.count} : <span class="important">${this.number.value}</span> est plus <span class="important">petit</span> que le nombre à deviner.`;
    this.status = `<span class="important status">🡹</span>`;
  };

  /**
   * Si tentative > nombre mystère
   */
  valueSupRandom = () => {
    this.result = `Tentative n°${this.count} : <span class="important">${this.number.value}</span> est plus <span class="important">grand</span> que le chiffre à deviner.`;
    this.status = `<span class="important status">🡻</span>`;
  };

  /**
   * Eléments communs en cas de victoire
   */
  winCommon = () => {
    this.isWon = true;
    this.changeBooleans(false, true, true);
    this.storeBetInLS(this.betIsChecked, this.betValue, this.leftTries, true);
    this.status = `<span class="important status">✔</span>`;
    if (this.count === 1) {
      this.resultComment =
        'Félicitations, vous avez trouvé le Nombre Mystère du premier coup !';
    } else {
      this.resultComment = `Vous avez trouvé le Nombre Mystère en <span class="important">${this.count}</span> tentatives.`;
    }
  };

  /**
   * Si réussite mais nombre mystère n'est pas 42
   */
  winButNot42 = () => {
    this.result = `Bravo, vous avez trouvé que le Nombre Mystère était <span class="important">${this.random}</span> !`;
    this.winCommon();
  };

  /**
   * Si réussite et nombre mystère = 42
   */
  perfectWin = () => {
    this.result = `Hééééééé oui, 42 est encore une fois LA réponse ! 😁`;
    this.winCommon();
  };

  /**
   * Si échec (uniquement en cas de pari non réussi)
   */
  lose = () => {
    this.storeBetInLS(true, this.betValue, 0, false);
    this.changeBooleans(false, true, true);
    this.numberOfTriesLeft = `Perdu ! Le nombre de tentatives parié a été atteint.
    <br/>Le Nombre Mystère était <span class="important">${this.random}</span>.`;
    this.result = '';
  };

  /**
   * Fonction qui active le mode "Pari"
   */
  betMode = () => {
    if (this.betIsChecked === true) {
      this.leftTries = this.betValue - this.count;
      if (this.isWon != true) {
        // Si la partie n'est pas encore gagnée
        if (this.count + 1 === this.betValue + 1) {
          // Partie perdu (pari non réussi)
          this.lose();
        } else {
          // Nombre de tentatives restantes = pari - n° tentative
          if (this.leftTries === 1) {
            // Reste 1 tentative
            this.numberOfTriesLeft = `<span class="important">Attention !</span> Il ne vous reste qu'<span class="important">1</span> tentative !`;
          } else if (this.leftTries != 1) {
            // Reste + d'1 tentative
            this.numberOfTriesLeft = `Il vous reste <span class="important">${this.leftTries}</span> tentatives sur les <span class="important">${this.betValue}</span> prévues.`;
          }
          this.storeBetInLS(
            this.betIsChecked,
            this.betValue,
            this.leftTries,
            this.isWon
          );
        }
      } else {
        // Pari gagné !
        this.numberOfTriesLeft = `Sur les <span class="important">${this.betValue}</span> tentatives pariées, il en restait <span class="important">${this.leftTries}</span>.`;
        this.storeBetInLS(
          this.betIsChecked,
          this.betValue,
          this.leftTries,
          this.isWon
        );
      }
    }
  };

  /**
   * Fonction principale
   */
  gameFunction = () => {
    this.tryRule = '';
    this.resetButtonVisible = true;
    this.count = this.attempts.length;

    if (this.number.value != null) {
      this.count += 1;
      this.changeBooleans(true, true, true);
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

  /**
   * Fonction qui réinitialise le jeu
   */
  resetFunction = () => {
    this.random = -1;
    this.count = 0;

    this.number = new FormControl(0);

    this.result = '';
    this.resultComment = '';
    this.numberOfTriesLeft = '';

    this.betIsChecked = false;
    this.changeBooleans(true, false, false);

    this.attempts = new Array();

    localStorage.clear();
    this.storeBetInLS(false, null, null, false);
  };

  ngOnInit(): void {
    this.checkIfBet();
    this.randomizeNumber();
    this.getResultsFromLS();
    console.log(`Le nombre aléatoire est : ${this.random}`);
  }
}
//TODO: Faire que le bouton réinitialiser le jeu réinitialise également le pari et redirige vers Etape 1
