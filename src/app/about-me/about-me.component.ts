import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss'],
})
export class AboutMeComponent {
  constructor(title: Title, meta: Meta) {
    title.setTitle('Anguleux - À propos');
    meta.updateTag({
      name: 'description',
      content: "À propos d'Anguleux, me contacter et consulter mon portfolio.",
    });
  }
  dob = new Date('10/03/1988');
  today = new Date();
  age = this.today.getFullYear() - this.dob.getFullYear();
}
