import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageBaseComponent } from './homepage-base.component';

describe('HomepageBaseComponent', () => {
  let component: HomepageBaseComponent;
  let fixture: ComponentFixture<HomepageBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomepageBaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomepageBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
