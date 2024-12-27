import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchermataFilmComponentComponent } from './schermata-film-component.component';

describe('SchermataFilmComponentComponent', () => {
  let component: SchermataFilmComponentComponent;
  let fixture: ComponentFixture<SchermataFilmComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchermataFilmComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchermataFilmComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
