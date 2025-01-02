import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaRicercaComponent } from './lista-ricerca.component';

describe('EpisodiSerieComponent', () => {
  let component: ListaRicercaComponent;
  let fixture: ComponentFixture<ListaRicercaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaRicercaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaRicercaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
