import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatableWrapperComponent } from './datatable-wrapper.component';

describe('DatatableWrapperComponent', () => {
  let component: DatatableWrapperComponent;
  let fixture: ComponentFixture<DatatableWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatatableWrapperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatatableWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
