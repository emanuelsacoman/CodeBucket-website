import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemcreateComponent } from './itemcreate.component';

describe('ItemcreateComponent', () => {
  let component: ItemcreateComponent;
  let fixture: ComponentFixture<ItemcreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemcreateComponent]
    });
    fixture = TestBed.createComponent(ItemcreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
