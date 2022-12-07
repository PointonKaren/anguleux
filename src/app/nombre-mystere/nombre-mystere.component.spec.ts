import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NombreMystereComponent } from './nombre-mystere.component';
import { NmBetComponent } from './nm-bet/nm-bet.component';
import { NmIntroComponent } from './nm-intro/nm-intro.component';
import { NmGameComponent } from './nm-game/nm-game.component';

describe('Test de la fonction showIntro du nombre mystère', () => {
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

  it('Le clic sur la span a bien déclenché la fonction showIntro()', () => {
    spyOn(component, 'showIntro');
    let tab = fixture.debugElement.nativeElement.querySelector('#intro');
    tab.click();
    expect(component.showIntro).toHaveBeenCalled();
  });

  it("L'onglet 'Pari' n'est pas visible", () => {
    component.showIntro();
    expect(component.bet).toBeFalsy();
  });

  it("L'onglet d'introduction est visible", () => {
    component.showIntro();
    expect(component.intro).toBeTruthy();
  });

  it("L'onglet 'Jeu' n'est pas visible", () => {
    component.showIntro();
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

  it("L'onglet d'introduction n'est pas visible", () => {
    component.showBet();
    expect(component.intro).toBeFalsy();
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

  it('Le clic sur la span a bien déclenché la fonction showGame()', () => {
    spyOn(component, 'showGame');
    let tab = fixture.debugElement.nativeElement.querySelector('#game');
    tab.click();
    expect(component.showGame).toHaveBeenCalled();
  });

  it("L'onglet 'Pari' n'est pas visible", () => {
    component.showGame();
    expect(component.bet).toBeFalsy();
  });

  it("L'onglet d'introduction n'est pas visible", () => {
    component.showGame();
    expect(component.intro).toBeFalsy();
  });

  it("L'onglet 'Jeu' est visible", () => {
    component.showGame();
    expect(component.game).toBeTruthy();
  });
});
