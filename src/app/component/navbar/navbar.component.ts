import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  currentUrl: string = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentUrl = event.urlAfterRedirects;
      });
  }

  logout() {
    // Временно — для фронта:
    this.authService.removeToken(); 
    this.router.navigate(['/login']);

    /*
    // Когда подключим API — раскоммитим
    this.authService.logout().subscribe({
      next: () => {
        this.authService.removeToken();
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Ошибка выхода:', err);
        this.authService.removeToken();
        this.router.navigate(['/login']);
      }
    });
    */
  }

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  isLoginPage(): boolean {
    return this.currentUrl === '/login';
  }
}
