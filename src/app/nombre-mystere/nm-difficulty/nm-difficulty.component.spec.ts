import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NmDifficultyComponent } from './nm-difficulty.component';

describe('NmDifficultyComponent', () => {
  let component: NmDifficultyComponent;
  let fixture: ComponentFixture<NmDifficultyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NmDifficultyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NmDifficultyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
