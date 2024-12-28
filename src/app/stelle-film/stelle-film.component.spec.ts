import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StelleFilmComponent } from './stelle-film.component';

describe('StelleFilmComponent', () => {
  let component: StelleFilmComponent;
  let fixture: ComponentFixture<StelleFilmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StelleFilmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StelleFilmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
