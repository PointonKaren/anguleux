import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  constructor(title: Title, meta: Meta) {
    title.setTitle('Anguleux - Petits jeux en ligne');
    meta.updateTag({
      name: 'description',
      content:
        'Application web proposant des petits jeux en ligne : Nombre mystère, mastermind, pendu, Tetris',
    });
  }
}
