import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEpisodiComponent } from './lista-episodi.component';

describe('EpisodiSerieComponent', () => {
  let component: ListaEpisodiComponent;
  let fixture: ComponentFixture<ListaEpisodiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaEpisodiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaEpisodiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
