import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchermataCommentiComponent } from './schermata-commenti.component';

describe('SchermataCommentiComponent', () => {
  let component: SchermataCommentiComponent;
  let fixture: ComponentFixture<SchermataCommentiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchermataCommentiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchermataCommentiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
