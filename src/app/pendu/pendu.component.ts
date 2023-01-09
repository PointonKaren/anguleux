import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pendu',
  templateUrl: './pendu.component.html',
  styleUrls: ['./pendu.component.scss'],
})
export class PenduComponent {
  constructor(title: Title, meta: Meta) {
    title.setTitle('Anguleux - Pendu');
    meta.updateTag({
      name: 'description',
      content:
        'Petit jeu qui consiste à deviner un mot, en un nombre limité de tentatives.',
    });
  }
}
