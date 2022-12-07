import { ComponentFixture, TestBed, tick } from '@angular/core/testing';

import { NombreMystereComponent } from './nombre-mystere.component';
import { NmBetComponent } from './nm-bet/nm-bet.component';
import { NmIntroComponent } from './nm-intro/nm-intro.component';
import { NmGameComponent } from './nm-game/nm-game.component';

describe('Test de la fonction showDifficulty du nombre mystère', () => {
  let component: NombreMystereComponent;
  let fixture: ComponentFixture<NombreMystereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        NombreMystereComponent,
        NmBetComponent,
        NmIntroComponent,
        NmGameComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NombreMystereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Le clic sur la span a bien déclenché la fonction showDifficulty()', () => {
    spyOn(component, 'showDifficulty');
    let tab = fixture.debugElement.nativeElement.querySelector('#difficulty');
    tab.click();
    expect(component.showDifficulty).toHaveBeenCalled();
  });

  it("L'onglet 'Pari' n'est pas visible", () => {
    component.showDifficulty();
    expect(component.bet).toBeFalsy();
  });

  it("L'onglet 'Difficulté' est visible", () => {
    component.showDifficulty();
    expect(component.difficulty).toBeTruthy();
  });

  it("L'onglet 'Jeu' n'est pas visible", () => {
    component.showDifficulty();
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
        NmIntroComponent,
        NmGameComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NombreMystereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Le clic sur la span a bien déclenché la fonction showBet()', () => {
    spyOn(component, 'showBet');
    let tab = fixture.debugElement.nativeElement.querySelector('#bet');
    tab.click();
    expect(component.showBet).toHaveBeenCalled();
  });

  it("L'onglet 'Pari' est visible", () => {
    component.showBet();
    expect(component.bet).toBeTruthy();
  });

  it("L'onglet 'Difficulté' n'est pas visible", () => {
    component.showBet();
    expect(component.difficulty).toBeFalsy();
  });

  it("L'onglet 'Jeu' n'est pas visible", () => {
    component.showBet();
    expect(component.game).toBeFalsy();
  });
});

describe('Test de la fonction showGame du nombre mystère', () => {
  let component: NombreMystereComponent;
  let fixture: ComponentFixture<NombreMystereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        NombreMystereComponent,
        NmBetComponent,
        NmIntroComponent,
        NmGameComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NombreMystereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Le clic sur la span a bien déclenché la fonction showBet()', () => {
    spyOn(component, 'showGame');
    let tab = fixture.debugElement.nativeElement.querySelector('#game');
    tab.click();
    expect(component.showGame).toHaveBeenCalled();
  });

  it("L'onglet 'Pari' n'est pas visible", () => {
    component.showGame();
    expect(component.bet).toBeFalsy();
  });

  it("L'onglet 'Difficulté' n'est pas visible", () => {
    component.showGame();
    expect(component.difficulty).toBeFalsy();
  });

  it("L'onglet 'Jeu' est visible", () => {
    component.showGame();
    expect(component.game).toBeTruthy();
  });
});
