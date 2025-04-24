import { CommonModule } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NavigateBackButtonComponent } from '@src/app/components/ui/navigate-back-button/navigate-back-button.component';
import { SearchInputComponent } from '@src/app/components/ui/search-input/search-input.component';
import { SignInButtonComponent } from '@src/app/components/ui/sign-in-button/sign-in-button.component';
import { SignOutButtonComponent } from '@src/app/components/ui/sign-out-button/sign-out-button.component';
import { UserService } from '@src/app/providers/user.service';

@Component({
  selector: 'app-navbar',
  imports: [
    CommonModule,
    RouterLink,
    SearchInputComponent,
    NavigateBackButtonComponent,
    SignInButtonComponent,
    SignOutButtonComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  @HostListener('window:scroll', [])
  public onWindowScroll(): void {
    this.isScrolled = window.scrollY > 0;
  }

  private readonly router = inject(Router);
  private readonly userService = inject(UserService);

  public isScrolled = false;

  public searchArtist(query: string) {
    if (query.trim() === '') return;

    this.router.navigate(['/search', query]);
  }

  public isRootRoute(): boolean {
    return this.router.url === '/';
  }

  public isLoggedIn(): boolean {
    return this.userService.isLoggedIn();
  }
}
