import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComandosEditComponent } from './comandos-edit.component';

describe('ComandosEditComponent', () => {
  let component: ComandosEditComponent;
  let fixture: ComponentFixture<ComandosEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComandosEditComponent]
    });
    fixture = TestBed.createComponent(ComandosEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
