import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsigliatiFilmComponent } from './consigliati-film.component';

describe('ConsigliatiFilmComponent', () => {
  let component: ConsigliatiFilmComponent;
  let fixture: ComponentFixture<ConsigliatiFilmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsigliatiFilmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsigliatiFilmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
