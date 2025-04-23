import { CommonModule } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NavigateBackButtonComponent } from '@src/app/components/ui/navigate-back-button/navigate-back-button.component';
import { SearchInputComponent } from '@src/app/components/ui/search-input/search-input.component';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, SearchInputComponent, NavigateBackButtonComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  @HostListener('window:scroll', [])
  public onWindowScroll(): void {
    this.isScrolled = window.scrollY > 0;
  }

  public isScrolled = false;

  private readonly router = inject(Router);

  public searchArtist(query: string) {
    if (query.trim() === '') return;

    this.router.navigate(['/search', query]);
  }

  public isRootRoute(): boolean {
    return this.router.url === '/';
  }
}
