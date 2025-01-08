import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageFiltersComponent } from './homepage-filters.component';

describe('HomepageFiltersComponent', () => {
  let component: HomepageFiltersComponent;
  let fixture: ComponentFixture<HomepageFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomepageFiltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomepageFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
