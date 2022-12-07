import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NmBetComponent } from './nm-bet.component';

describe('NmBetComponent', () => {
  let component: NmBetComponent;
  let fixture: ComponentFixture<NmBetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NmBetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NmBetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
