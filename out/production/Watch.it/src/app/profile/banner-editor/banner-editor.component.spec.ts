import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerEditorComponent } from './banner-editor.component';

describe('BannerEditorComponent', () => {
  let component: BannerEditorComponent;
  let fixture: ComponentFixture<BannerEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
