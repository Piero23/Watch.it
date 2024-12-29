import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardEpisodioComponent } from './card-episodio.component';

describe('CardEpisodioComponent', () => {
  let component: CardEpisodioComponent;
  let fixture: ComponentFixture<CardEpisodioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardEpisodioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardEpisodioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
