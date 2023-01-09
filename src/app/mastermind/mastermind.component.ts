import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-mastermind',
  templateUrl: './mastermind.component.html',
  styleUrls: ['./mastermind.component.scss'],
})
export class MastermindComponent {
  constructor(title: Title, meta: Meta) {
    title.setTitle('Anguleux - Mastermind');
    meta.updateTag({
      name: 'description',
      content:
        'Petit jeu qui consiste à deviner une séquence aléatoire de couleurs, en un nombre limité de combinaisons.',
    });
  }
}
