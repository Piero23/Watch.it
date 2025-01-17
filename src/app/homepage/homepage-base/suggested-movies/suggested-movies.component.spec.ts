import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestedMoviesComponent } from './suggested-movies.component';

describe('TrendingMoviesComponent', () => {
  let component: SuggestedMoviesComponent;
  let fixture: ComponentFixture<SuggestedMoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuggestedMoviesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuggestedMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
