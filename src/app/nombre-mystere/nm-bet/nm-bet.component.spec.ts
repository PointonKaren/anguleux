import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NmBetComponent } from './nm-bet.component';

describe('Test de la fonction limitFunction', () => {
  let component: NmBetComponent;
  let fixture: ComponentFixture<NmBetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NmBetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NmBetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Le clic sur le bouton Envoyer a bien déclenché la fonction betFunction()', () => {
    spyOn(component, 'betFunction');
    let tab = fixture.debugElement.nativeElement.querySelector('#betButton');
    tab.click();
    expect(component.betFunction).toHaveBeenCalled();
    // Test échoué, essayer de comprendre pourquoi
  });
});
