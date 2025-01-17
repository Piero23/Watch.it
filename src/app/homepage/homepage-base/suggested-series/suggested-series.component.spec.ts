import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestedSeriesComponent } from './suggested-series.component';

describe('TrendingSeriesComponent', () => {
  let component: SuggestedSeriesComponent;
  let fixture: ComponentFixture<SuggestedSeriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuggestedSeriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuggestedSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
