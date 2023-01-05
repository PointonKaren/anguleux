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
  betComment =
    "Cochez pour parier ! Vous pouvez aussi passer directement à l'étape 3 sans parier ;) ";
  betDatas = [];
  storage = localStorage.getItem('storedDatas');
  datas = JSON.parse(
    this.storage != null ? this.storage : JSON.stringify(this.betDatas)
  );
  betIsChecked = this.datas[0].value;
  betValue = this.datas[1].value;
  leftTries = this.datas[2].value;
  isWon = this.datas[3].value;

  betCheckVisible = true; // checkbox visible ou non
  harderPlease = false; // checkbox cliquée ou non
  changeBetIsVisible = false; // pari réalisé ou non
  resetGameIsVisible = false; // bouton de reset visible ou non
  betFormIsVisible = true; // formulaire + bouton reset visibles ou non

  /**
   * Fonction générique qui stocke dans le local storage les données de pari + boolean réussite/échec du jeu
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
   * @param betCheckVisible : boolean (checkbox visible ou non)
   * @param harderPlease : boolean (checkbox cliquée ou non)
   * @param changeBetIsVisible : boolean (affiche le bouton pour modifier/annuler le pari)
   * @param resetGameIsVisible : boolean (bouton de reset visible ou non)
   * @param betFormIsVisible : boolean (formulaire + bouton "envoyer" visibles ou non)
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
   * Fonction qui permet de gérer ce qui est affiché au chargement du component
   */
  checkBetValue = () => {
    if (this.betIsChecked) {
      // Si un pari a été effectué
      if (this.leftTries === null) {
        //? Si aucune tentative n'a été faite
        this.changeBooleans(false, true, true, false, false);
        /** Action de changeBooleans :
         * Checkbox, bouton resetGame et formulaire non visibles,
         * Checkbox cochée, bouton modifier/annuler le pari visible
         */
        this.tryText = `Il vous reste [X] tentative(s) et vous n'avez pas encore joué.
        <br/>Vous avez encore le temps de modifier votre pari !`;
      } else {
        //? Sinon, quel que soit le nombre de tentatives restantes :
        this.changeBooleans(false, true, false, true, false);
        /** Action de changeBooleans :
         * Checkbox, bouton modifier/annuler et formulaire non visibles,
         * Checkbox cochée et bouton pour réinitialiser le jeu visible
         */
        if (this.isWon) {
          //? Pari gagné
          this.tryText = `Félicitations, vous avez trouvé le Nombre Mystère qui était [X] !
          <br/>Vous avez réussi en [X] tentative(s) alors qu'il vous en restait [X].`;
        } else {
          //? Nombre mystère pas encore trouvé
          if (this.leftTries > 1) {
            //? Reste plus d'une tentative
            this.tryText = `Il vous reste [X] tentatives pour trouver le Nombre Mystère.
            <br/>Vous ne pouvez plus modifier votre pari.
            <br/>Souhaitez vous abandonner ?`;
          } else if (this.leftTries === 1) {
            //? Reste une seule tentative
            this.tryText = `<span class="important">Attention !</span> Il ne vous reste qu'une seule tentative !`;
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
      this.tryText = `C'est noté, il faudra donc trouver le Nombre Mystère en moins de <span class="important">${this.tries.value}</span> tentative(s) !
      <br/>Vous pouvez désormais passer à l'étape 3 !
      <br/>Vous pouvez également modifier ou annuler votre pari en cliquant sur le bouton ci-dessous.`;
    }
  };

  /**
   * Fonction qui permet d'annuler ou de modifier le pari
   */
  changeBet = () => {
    this.tries = new FormControl(1);
    this.tryText = '';
    this.betComment = "Décocher pour annuler le pari, puis passer à l'étape 3.";
    this.changeBooleans(true, true, false, false, true);
    /** Action de changeBooleans
     * checkbox visible
     * Checkbox cochée,
     * Formulaire visible,
     * bouton modif non visible
     * boutons resetGame non visible
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
    this.checkBetValue();
  }
}
