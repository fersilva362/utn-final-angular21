import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empty-page',
  imports: [],
  templateUrl: './empty-page.html',
  styleUrl: './empty-page.css',
})
export class EmptyPage {
  private router = inject(Router);
  navigateToForm() {
    this.router.navigate(['/add']);
  }
}
