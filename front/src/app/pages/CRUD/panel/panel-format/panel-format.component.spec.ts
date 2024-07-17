import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelFormatComponent } from './panel-format.component';

describe('PanelFormatComponent', () => {
  let component: PanelFormatComponent;
  let fixture: ComponentFixture<PanelFormatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelFormatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelFormatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
