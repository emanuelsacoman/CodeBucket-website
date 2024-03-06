import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemlistComponent } from './itemlist.component';

describe('ItemlistComponent', () => {
  let component: ItemlistComponent;
  let fixture: ComponentFixture<ItemlistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemlistComponent]
    });
    fixture = TestBed.createComponent(ItemlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
