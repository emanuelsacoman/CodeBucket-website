import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandsComponent } from './commands.component';

describe('CommandsComponent', () => {
  let component: CommandsComponent;
  let fixture: ComponentFixture<CommandsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommandsComponent]
    });
    fixture = TestBed.createComponent(CommandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
