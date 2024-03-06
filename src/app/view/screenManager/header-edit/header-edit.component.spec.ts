import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderEditComponent } from './header-edit.component';

describe('HeaderEditComponent', () => {
  let component: HeaderEditComponent;
  let fixture: ComponentFixture<HeaderEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderEditComponent]
    });
    fixture = TestBed.createComponent(HeaderEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
