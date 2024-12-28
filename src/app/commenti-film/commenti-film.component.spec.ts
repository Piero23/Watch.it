import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentiFilmComponent } from './commenti-film.component';

describe('CommentiFilmComponent', () => {
  let component: CommentiFilmComponent;
  let fixture: ComponentFixture<CommentiFilmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentiFilmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentiFilmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
