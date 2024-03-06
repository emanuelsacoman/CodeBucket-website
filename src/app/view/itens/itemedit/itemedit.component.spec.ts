import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemeditComponent } from './itemedit.component';

describe('ItemeditComponent', () => {
  let component: ItemeditComponent;
  let fixture: ComponentFixture<ItemeditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemeditComponent]
    });
    fixture = TestBed.createComponent(ItemeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
