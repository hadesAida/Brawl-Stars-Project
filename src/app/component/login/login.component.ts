import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,  // ключевое
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  error: string | null = null;  // Добавлено свойство для ошибки

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  // Обработчик для отправки формы
  onSubmit() {
    const data = { username: this.username, password: this.password };
    this.http.post<any>('http://localhost:8000/api/token/', data).subscribe({
      next: (res) => {
        this.authService.setToken(res.access);
        this.router.navigate(['/brawlers']);
      },
      error: () => {
        this.error = 'Неверный логин или пароль';  // Устанавливаем ошибку
      }
    });
  }
}
