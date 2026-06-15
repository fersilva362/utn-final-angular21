import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyContacts } from './my-contacts';
import jasmine from 'jasmine';
import { Client } from '../../services/client';

describe('MyContacts', () => {
  let component: MyContacts;
  let fixture: ComponentFixture<MyContacts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyContacts],
    }).compileComponents();

    fixture = TestBed.createComponent(MyContacts);
    component = fixture.componentInstance;

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
