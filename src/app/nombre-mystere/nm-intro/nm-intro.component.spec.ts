import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NmIntroComponent } from './nm-intro.component';

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
