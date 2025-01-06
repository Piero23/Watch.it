import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardRicercaComponent } from './card-ricerca.component';

describe('CardEpisodioComponent', () => {
  let component: CardRicercaComponent;
  let fixture: ComponentFixture<CardRicercaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardRicercaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardRicercaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
