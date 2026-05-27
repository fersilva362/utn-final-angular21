import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageTile } from './message-tile';

describe('MessageTile', () => {
  let component: MessageTile;
  let fixture: ComponentFixture<MessageTile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageTile],
    }).compileComponents();

    fixture = TestBed.createComponent(MessageTile);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
