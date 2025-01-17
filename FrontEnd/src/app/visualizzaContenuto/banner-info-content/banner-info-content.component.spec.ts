import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerInfoContentComponent } from './banner-info-content.component';

describe('SchermataFilmComponentComponent', () => {
  let component: BannerInfoContentComponent;
  let fixture: ComponentFixture<BannerInfoContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerInfoContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerInfoContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
