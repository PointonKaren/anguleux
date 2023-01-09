import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

//TODO: Tester que les descriptions apparaissent bien au survol.

import { GameListComponent } from './game-list.component';

describe('Visibilité par défaut de la description du jeu', () => {
  let component: GameListComponent;
  let fixture: ComponentFixture<GameListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GameListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('La description du "Juste Prix" ne doit pas apparaître', () => {
    expect(component.justePrix).toBeFalsy();
  });

  it('La description du "Mastermind" ne doit pas apparaître', () => {
    expect(component.mastermind).toBeFalsy();
  });

  it('La description du "Pendu" ne doit pas apparaître', () => {
    expect(component.pendu).toBeFalsy();
  });

  it('La description du "Tetris" ne doit pas apparaître', () => {
    expect(component.tetris).toBeFalsy();
  });
});
