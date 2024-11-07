import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermosServicosComponent } from './termos-servicos.component';

describe('TermosServicosComponent', () => {
  let component: TermosServicosComponent;
  let fixture: ComponentFixture<TermosServicosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TermosServicosComponent]
    });
    fixture = TestBed.createComponent(TermosServicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
