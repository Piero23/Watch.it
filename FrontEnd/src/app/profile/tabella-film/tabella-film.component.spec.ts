import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabellaFilmComponent } from './tabella-film.component';

describe('TabellaFilmComponent', () => {
  let component: TabellaFilmComponent;
  let fixture: ComponentFixture<TabellaFilmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabellaFilmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabellaFilmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
