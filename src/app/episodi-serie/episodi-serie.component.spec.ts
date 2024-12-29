import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpisodiSerieComponent } from './episodi-serie.component';

describe('EpisodiSerieComponent', () => {
  let component: EpisodiSerieComponent;
  let fixture: ComponentFixture<EpisodiSerieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EpisodiSerieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EpisodiSerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
