import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchermataContenutiComponent } from './schermata-contenuti.component';

describe('SchermataContenutiComponent', () => {
  let component: SchermataContenutiComponent;
  let fixture: ComponentFixture<SchermataContenutiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchermataContenutiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchermataContenutiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
