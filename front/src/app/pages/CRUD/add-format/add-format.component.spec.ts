import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFormatComponent } from './add-format.component';

describe('AddFormatComponent', () => {
  let component: AddFormatComponent;
  let fixture: ComponentFixture<AddFormatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFormatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFormatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
