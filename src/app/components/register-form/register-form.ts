import { Component, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { MyContacts } from '../my-contacts/my-contacts';
import { MyContactModel } from '../../models/Contact';
import { email } from '@angular/forms/signals';

@Component({
  selector: 'app-register-form',
  imports: [ReactiveFormsModule],
  templateUrl: './register-form.html',
  styleUrl: './register-form.css',
})
export class RegisterForm {
  register_form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });
  errorNewUser = signal<string>('');
  loadingNewUser = signal<boolean>(true);
  postContacts = signal<MyContactModel[]>([]);
  getValidatedFields(field: string): string {
    const control = this.register_form.get(field);
    const errorValidator = control?.errors;
    if (!errorValidator) {
      return '';
    }

    if (field === 'email') {
      if (errorValidator['required']) {
        return 'Please fill the field EMAIL';
      } else if (errorValidator['email']) {
        return 'Please check the  EMAIL FORMAT';
      } else {
        return 'unknown error in validation  email';
      }
    } else if (field === 'username') {
      if (errorValidator['required']) {
        return 'Please fill the field USERNAME';
      } else if (errorValidator?.['minlength']) {
        return 'Please check the  Required Length USERNAME';
      } else {
        return 'unknown error in validation  email';
      }
    } else {
      return 'unknown error in validation username or email';
    }
  }

  loadNewUser(): void {
    const { username, email } = this.register_form.value;

    try {
      this.errorNewUser.set('');
      this.loadingNewUser.set(false);
      const errorsValidationEmail = this.getValidatedFields('email');
      errorsValidationEmail
        ? this.errorNewUser.update((prev) => `${prev} ${errorsValidationEmail}.`)
        : null;
      const errorsValidationUsername = this.getValidatedFields('username');
      errorsValidationUsername
        ? this.errorNewUser.update((prev) => `${prev}  ${errorsValidationUsername}.`)
        : null;

      const conversation_id = '8b5e6814-f6be-4868-9a3f-51f75b90fb75' + new Date().toISOString;
      const newContact = {
        conversation_id: conversation_id,
        participant_name: username,
        email: email,
        last_message: 'No messages yet',
        last_message_time: new Date().toISOString(),
        //messages: [],
      };

      this.postContacts.update((prev) => [...prev, newContact]);
      console.log(JSON.stringify(this.postContacts()) + ' MyCOntact');
      /* Fn((prev) => [...prev, newContact]);
      navigate(`/contact/${conversation_id}`, {
        state: { participante: { name: Username } },
      }); */
    } catch (error) {
      this.errorNewUser.set(error instanceof Error ? error.message : 'Unknown Error');
    } finally {
      this.loadingNewUser.set(true);
    }
  }
}
