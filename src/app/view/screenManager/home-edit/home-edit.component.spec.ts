import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEditComponent } from './home-edit.component';

describe('HomeEditComponent', () => {
  let component: HomeEditComponent;
  let fixture: ComponentFixture<HomeEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeEditComponent]
    });
    fixture = TestBed.createComponent(HomeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
