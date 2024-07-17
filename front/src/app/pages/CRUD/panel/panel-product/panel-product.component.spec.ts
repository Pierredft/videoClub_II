import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelProductComponent } from './panel-product.component';

describe('PanelProductComponent', () => {
  let component: PanelProductComponent;
  let fixture: ComponentFixture<PanelProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
