import { Component, inject } from '@angular/core';
import { UserService } from '@src/app/providers/user.service';

@Component({
  selector: 'app-sign-out-button',
  imports: [],
  templateUrl: './sign-out-button.component.html',
  styleUrl: './sign-out-button.component.css',
})
export class SignOutButtonComponent {
  private readonly userService: UserService = inject(UserService);

  public signOut() {
    this.userService.signOut();
  }
}
