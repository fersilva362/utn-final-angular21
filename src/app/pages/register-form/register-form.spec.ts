import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterForm } from './register-form';
import { ReactiveFormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { compileDeclareClassMetadata } from '@angular/compiler';

describe('RegisterForm', () => {
  let component: RegisterForm;
  let fixture: ComponentFixture<RegisterForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Form should be invalid if field required are empty', () => {
    component.register_form.controls['email'].setValue('');
    component.register_form.controls['username'].setValue('');
    expect(component.register_form.invalid).toBeTruthy();
  });
  it('btn should send form when clicked', () => {
    const sendBtn = fixture.nativeElement.querySelector('#send-btn');
    sendBtn.click();

    expect(component.loadingNewUser()).toBeTruthy();
  });
});
