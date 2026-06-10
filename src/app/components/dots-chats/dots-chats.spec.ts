import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DotsChats } from './dots-chats';

describe('DotsChats', () => {
  let component: DotsChats;
  let fixture: ComponentFixture<DotsChats>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DotsChats],
    }).compileComponents();

    fixture = TestBed.createComponent(DotsChats);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
