import { ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NmBetComponent } from './nm-bet.component';

//TODO: Continuer à faire les tests unitaires

describe('Test de la fonction betFunction', () => {
  let component: NmBetComponent;
  let fixture: ComponentFixture<NmBetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NmBetComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();
    fixture = TestBed.createComponent(NmBetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Le nombre de tentatives noté dans le formulaire est bien conservé', () => {
    spyOn(component, 'betFunction');
    component.harderPlease = true;
    fixture.detectChanges();
    const betInput =
      fixture.debugElement.nativeElement.querySelector('#betInput');
    betInput.value = 42;
    betInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.tries.value).toBe(42);
  });
});

describe("Test de l'appel à la fonction betFunction", () => {
  let component: NmBetComponent;
  let fixture: ComponentFixture<NmBetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NmBetComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();
    fixture = TestBed.createComponent(NmBetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Le clic sur le bouton Envoyer a bien déclenché la fonction betFunction()', () => {
    spyOn(component, 'betFunction');
    component.harderPlease = true;
    fixture.detectChanges();
    const betButton =
      fixture.debugElement.nativeElement.querySelector('#betButton');
    betButton.click();
    expect(component.betFunction).toHaveBeenCalled();
  });
});
