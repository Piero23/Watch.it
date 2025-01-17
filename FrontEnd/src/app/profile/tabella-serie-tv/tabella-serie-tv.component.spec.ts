import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabellaSerieTvComponent } from './tabella-serie-tv.component';

describe('TabellaSerieTvComponent', () => {
  let component: TabellaSerieTvComponent;
  let fixture: ComponentFixture<TabellaSerieTvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabellaSerieTvComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabellaSerieTvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
