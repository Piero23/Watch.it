import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarReviewComponent } from './star-review.component';

describe('StarReviewComponent', () => {
  let component: StarReviewComponent;
  let fixture: ComponentFixture<StarReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarReviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StarReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
