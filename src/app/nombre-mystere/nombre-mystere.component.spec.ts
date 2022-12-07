import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NombreMystereComponent } from './nombre-mystere.component';
import { NmBetComponent } from './nm-bet/nm-bet.component';
import { NmDifficultyComponent } from './nm-difficulty/nm-difficulty.component';
import { NmGameComponent } from './nm-game/nm-game.component';

describe('Test de la fonction showDifficulty du nombre mystère', () => {
  let component: NombreMystereComponent;
  let fixture: ComponentFixture<NombreMystereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        NombreMystereComponent,
        NmBetComponent,
        NmDifficultyComponent,
        NmGameComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NombreMystereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("Le pari n'est pas visible", () => {
    expect(component.bet).toBeFalsy();
  });

  it('Le choix de la difficulté est visible', () => {
    expect(component.difficulty).toBeTruthy();
  });

  it("Le jeu n'est pas visible", () => {
    expect(component.game).toBeFalsy();
  });
});

describe('Test de la fonction showBet du nombre mystère', () => {
  let component: NombreMystereComponent;
  let fixture: ComponentFixture<NombreMystereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        NombreMystereComponent,
        NmBetComponent,
        NmDifficultyComponent,
        NmGameComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NombreMystereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Le pari est visible', () => {
    expect(component.bet).toBeTruthy();
  });

  it("Le choix de la difficulté n'est pas visible", () => {
    expect(component.difficulty).toBeFalsy();
  });

  it("Le jeu n'est pas visible", () => {
    expect(component.game).toBeFalsy();
  });
});
