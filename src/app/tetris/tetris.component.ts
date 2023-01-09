import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-tetris',
  templateUrl: './tetris.component.html',
  styleUrls: ['./tetris.component.scss'],
})
export class TetrisComponent {
  constructor(title: Title, meta: Meta) {
    title.setTitle('Anguleux - Tetris');
    meta.updateTag({
      name: 'description',
      content:
        "Petit jeu de puzzle qui consiste à aligner horizontalement des pièces de différentes formes qui tombent depuis le haut de l'écran",
    });
  }
}
