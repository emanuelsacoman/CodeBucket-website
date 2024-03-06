import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebManagerComponent } from './web-manager.component';

describe('WebManagerComponent', () => {
  let component: WebManagerComponent;
  let fixture: ComponentFixture<WebManagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WebManagerComponent]
    });
    fixture = TestBed.createComponent(WebManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
