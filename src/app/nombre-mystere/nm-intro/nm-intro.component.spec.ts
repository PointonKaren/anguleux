import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NmIntroComponent } from './nm-intro.component';

//TODO: créer les tests unitaires des fonctions permettant de charger les components au clic sur l'étape

describe('NmIntroComponent', () => {
  let component: NmIntroComponent;
  let fixture: ComponentFixture<NmIntroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NmIntroComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NmIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
