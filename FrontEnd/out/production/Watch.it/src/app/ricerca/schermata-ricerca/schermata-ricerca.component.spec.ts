import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchermataRicercaComponent } from './schermata-ricerca.component';

describe('SchermataContenutiComponent', () => {
  let component: SchermataRicercaComponent;
  let fixture: ComponentFixture<SchermataRicercaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchermataRicercaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchermataRicercaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
