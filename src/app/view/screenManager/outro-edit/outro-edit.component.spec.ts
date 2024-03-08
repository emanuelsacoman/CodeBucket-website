import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutroEditComponent } from './outro-edit.component';

describe('OutroEditComponent', () => {
  let component: OutroEditComponent;
  let fixture: ComponentFixture<OutroEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OutroEditComponent]
    });
    fixture = TestBed.createComponent(OutroEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
