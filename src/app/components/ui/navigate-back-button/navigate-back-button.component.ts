import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-navigate-back-button',
  imports: [],
  templateUrl: './navigate-back-button.component.html',
  styleUrl: './navigate-back-button.component.css',
})
export class NavigateBackButtonComponent {
  private readonly location: Location = inject(Location);

  public navigateBack(): void {
    this.location.back();
  }
}
