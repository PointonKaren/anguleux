import { ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NmBetComponent } from './nm-bet.component';

describe('Test de la fonction limitFunction', () => {
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
