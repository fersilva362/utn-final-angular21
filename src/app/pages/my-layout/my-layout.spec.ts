import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyLayout } from './my-layout';

describe('MyLayout', () => {
  let component: MyLayout;
  let fixture: ComponentFixture<MyLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyLayout],
    }).compileComponents();

    fixture = TestBed.createComponent(MyLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
