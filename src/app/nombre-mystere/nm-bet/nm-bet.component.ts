import { ThisReceiver } from '@angular/compiler';
import { Component } from '@angular/core';

import { FormControl } from '@angular/forms';

//TODO: Afficher les messages d'erreur du formulaire à la saisie et non au clic (.dirty etc)

@Component({
  selector: 'app-nm-bet',
  templateUrl: './nm-bet.component.html',
  styleUrls: ['./nm-bet.component.scss'],
})
export class NmBetComponent {
  tries = new FormControl(1);

  tryText = '';
  betOrder = 'Pour pouvoir parier, cochez cette case. ';
  betComment = `Si vous changez d'avis, vous pouvez passer directement à l'étape 3 sans parier ;)`;
  resetButtonText = 'Abandonner la partie';
  errorText = '';

  betDatas = [];
  storage = localStorage.getItem('storedDatas');
  datas = JSON.parse(
    this.storage != null ? this.storage : JSON.stringify(this.betDatas)
  );
  betIsChecked = this.datas[0].value;
  betValue = this.datas[1].value;
  leftTries = this.datas[2].value;
  isWon = this.datas[3].value;

  storedMysteryNumber = localStorage.getItem('mysteryNumber');
  mysteryNumber = null;

  attemptsArray = [];
  attemptsStorage = localStorage.getItem('attempts');
  attemptsDatas = JSON.parse(
    this.attemptsStorage != null
      ? this.attemptsStorage
      : JSON.stringify(this.attemptsArray)
  );
  count = 0;

  betCheckVisible = true; // checkbox visible
  harderPlease = false; // checkbox non cochée
  changeBetIsVisible = false; // Bouton pour annuler/modifier le pari non visible
  resetGameIsVisible = false; // Bouton pour réinitialiser le jeu non visible
  betFormIsVisible = true; // Formulaire de pari visible (mais uniquement quand la checkbox sera cochée)

  /**
   * Fonction générique qui stocke dans le local storage les données de pari + boolean réussite/échec du jeu
   * @param betIsChecked any
   * @param betValue any
   * @param leftTries any
   * @param isWon boolean
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
   * @param betCheckVisible boolean (checkbox visible ou non)
   * @param harderPlease boolean (checkbox cliquée ou non)
   * @param changeBetIsVisible boolean (affiche le bouton pour modifier/annuler le pari)
   * @param resetGameIsVisible boolean (bouton de reset visible ou non)
   * @param betFormIsVisible boolean (formulaire + bouton "envoyer" visibles ou non)
   */
  changeBooleans = (
    betCheckVisible: boolean,
    harderPlease: boolean,
    changeBetIsVisible: boolean,
    resetGameIsVisible: boolean,
    betFormIsVisible: boolean
  ) => {
    this.betCheckVisible = betCheckVisible;
    this.harderPlease = harderPlease;
    this.changeBetIsVisible = changeBetIsVisible;
    this.resetGameIsVisible = resetGameIsVisible;
    this.betFormIsVisible = betFormIsVisible;
  };

  /**
   * Récupérer le nombre mystère depuis le local storage
   */
  getMysteryNumberFromLS = () => {
    if (this.storedMysteryNumber != null) {
      this.mysteryNumber = JSON.parse(this.storedMysteryNumber);
    }
  };

  getAttemptsDatasfromLS = () => {
    this.count = JSON.parse(this.attemptsDatas.length);
  };

  /**
   * Fonction qui permet de gérer ce qui est affiché au chargement du component
   */
  checkBet = () => {
    this.getAttemptsDatasfromLS();
    if (this.count >= 1) {
      this.errorText = `Vous avez déjà commencé à jouer, vous ne pouvez donc plus parier.
  <br/> Si vous souhaitez parier, il faut abandonner la partie en cliquant sur le bouton ci-dessous.`;
      this.changeBooleans(false, false, false, true, false);
    } else {
      if (this.betIsChecked) {
        // Si un pari a été effectué
        if (this.leftTries === null) {
          //? Si aucune tentative n'a été faite
          this.changeBooleans(false, true, true, false, false);
          /** Action de changeBooleans :
           * Checkbox, bouton resetGame et formulaire non visibles,
           * Checkbox cochée, bouton modifier/annuler le pari visible
           */
          if (this.betValue === 1) {
            this.tryText = `Vous n'avez pas encore tenté votre chance pour trouver le Nombre Mystère du premier coup.
<br/>Il est encore temps de modifier votre pari !`;
          } else {
            this.tryText = `Vous n'avez pas encore tenté votre chance pour trouver le Nombre Mystère en moins de <span class="important">${this.betValue}</span> tentatives.
          <br/>Il est encore temps de modifier votre pari !`;
          }
        } else {
          //? Sinon, quel que soit le nombre de tentatives restantes :
          this.changeBooleans(false, true, false, true, false);
          /** Action de changeBooleans :
           * Checkbox, bouton modifier/annuler et formulaire non visibles,
           * Checkbox cochée et bouton pour réinitialiser le jeu visible
           */
          if (this.isWon) {
            //? Pari gagné
            this.getMysteryNumberFromLS();
            if (this.count === 1) {
              switch (this.leftTries) {
                case 0:
                  this.tryText = `Félicitations, vous avez réussi l'impossible ! Vous avez trouvé du premier coup que le Nombre Mystère était <span class="important">${this.mysteryNumber}</span> !`;
                  break;
                case 1:
                  this.tryText = `Félicitations ! Vous aviez parié y arriver en deux tentatives, et vous avez trouvé du premier coup que le Nombre Mystère était <span class="important">${this.mysteryNumber}</span> !`;
                  break;
                default:
                  this.tryText = `Félicitations, vous avez trouvé du premier coup que le Nombre Mystère était <span class="important">${this.mysteryNumber}</span> ! Il vous restait <span class="important">${this.leftTries}</span> tentatives.`;
                  break;
              }
            } else {
              if (this.leftTries <= 1) {
                this.tryText = `Pfiou ! Il s'en est fallu de peu ! Vous avez trouvé <i>in extremis</i> que le Nombre Mystère était <span class="important">${this.mysteryNumber}</span> !
              <br/>Vous avez réussi en <span class="important">${this.count}</span> tentatives.`;
              } else {
                this.tryText = `Félicitations, vous avez trouvé le Nombre Mystère qui était <span class="important">${this.mysteryNumber}</span> !
              <br/>Vous avez réussi en <span class="important">${this.count}</span> tentatives alors qu'il vous en restait <span class="important">${this.leftTries}</span>.`;
              }
            }
            this.resetButtonText = 'Nouvelle partie';
          } else {
            //? Nombre mystère pas encore trouvé
            if (this.leftTries > 1) {
              //? Reste plus d'une tentative
              this.tryText = `Il vous reste <span class="important">${this.leftTries}</span> tentatives pour trouver le Nombre Mystère.
            <br/>Vous ne pouvez plus modifier votre pari.
            <br/>Souhaitez vous abandonner ?`;
            } else if (this.leftTries === 1) {
              //? Reste une seule tentative
              this.tryText = `<span class="important">Attention !</span> Il ne vous reste qu'une seule tentative !`;
            } else if (this.leftTries === 0) {
              //? Toutes les tentatives ont été utilisées
              this.tryText = `Désolée, vous avez perdu le pari 😥
            <br/>Souhaitez-vous recommencer ?`;
              this.resetButtonText = 'Nouvelle partie';
            }
          }
        }
      }
    }
  };

  /**
   * Fonction principale
   */
  betFunction = () => {
    if (this.tries.value === null) {
      this.tryText =
        '<span class="important">Veuillez écrire un nombre dans le formulaire.</span>';
    } else if (this.tries.value > 99 || this.tries.value < 1) {
      this.tryText = `Le nombre doit être compris entre <span class="important">1</span> et <span class="important">99</span>.`;
    } else {
      this.changeBooleans(false, true, true, false, false);
      /** Action de changeBooleans :
       * Checkbox, bouton resetGame et formulaire non visibles,
       * Checkbox cochée, bouton modifier/annuler le pari visible
       */
      this.storeBetInLS(this.harderPlease, this.tries.value, null, false);
      if (this.tries.value === 1) {
        this.tryText = `C'est noté, il vous faudra donc trouver le Nombre Mystère du premier coup.
        <br/>Vous pouvez désormais passer à l'étape 3. Bon courage 😅
        <br/>Vous pouvez également modifier ou annuler votre pari en cliquant sur le bouton ci-dessous.`;
      } else {
        this.tryText = `C'est noté, il faudra donc trouver le Nombre Mystère en moins de <span class="important">${this.tries.value}</span> tentatives !
        <br/>Vous pouvez désormais passer à l'étape 3. Bonne chance !
        <br/>Vous pouvez également modifier ou annuler votre pari en cliquant sur le bouton ci-dessous.`;
      }
    }
  };

  /**
   * Fonction qui permet d'annuler ou de modifier le pari
   */
  changeBet = () => {
    this.tries = new FormControl(1);
    this.tryText = '';
    this.betOrder = "Décocher pour annuler le pari, puis passer à l'étape 3.";
    this.betComment =
      'Si vous souhaitez modifier votre pari, utilisez le formulaire ci-dessous.';
    this.changeBooleans(true, true, false, false, true);
    /** Action de changeBooleans
     * Checkbox visible et cochée, formulaire visible
     * boutons modifier/annuler et resetGame non visibles
     */
    this.storeBetInLS(false, null, null, false);
  };

  resetFunction = () => {
    this.tryText = '';
    this.changeBooleans(true, true, false, false, true);
    this.betComment = `Si vous souhaitez parier de nouveau, utilisez le formulaire.
      <br/>Sinon, décochez cette case et passez à l'étape 3`;
    localStorage.clear();
    this.storeBetInLS(false, null, null, false);
  };

  ngOnInit(): void {
    this.checkBet();
  }
}
