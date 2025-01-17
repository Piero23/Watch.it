import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SerieTvStatusSelectorComponent } from './serie-tv-status-selector.component';

describe('SerieTvStatusSelectorComponent', () => {
  let component: SerieTvStatusSelectorComponent;
  let fixture: ComponentFixture<SerieTvStatusSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SerieTvStatusSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SerieTvStatusSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
