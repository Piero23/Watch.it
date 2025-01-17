import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewCommenti } from './preview-commenti';

describe('CommentiFilmComponent', () => {
  let component: PreviewCommenti;
  let fixture: ComponentFixture<PreviewCommenti>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewCommenti]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewCommenti);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
