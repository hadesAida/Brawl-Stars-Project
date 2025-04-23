import { Component, OnInit } from '@angular/core';
import { BrawlerService } from '../../services/brawler.service';
import { Brawler } from '../../interfaces/Brawler';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-brawlers',
  templateUrl: './brawlers.component.html',
  styleUrls: ['./brawlers.component.css'],
  imports: [CommonModule, RouterModule]
})
export class BrawlersComponent implements OnInit {
  brawlers: Brawler[] = [];
  favorites: Brawler[] = [];
  shelters: Brawler[] = [];
  allBrawlers: Brawler[] = [];

  constructor(
    private brawlerService: BrawlerService,
    private authService: AuthService, // Внедряем AuthService
    private router: Router
  ) {}

  navigateToAdd(category: string) {
    this.router.navigate(['/add-brawler'], { queryParams: { category } });
  }

  ngOnInit(): void {
    this.brawlerService.getAllFromApi().subscribe({
      next: (data) => {
        this.brawlers = data.map(b => ({
          ...b, // сохраняем все остальные данные
          category: b.category || { name: 'Неизвестная категория' }, // Заменяем null на дефолтный объект
        }));
        this.favorites = data.filter(b => b.category?.name === 'Любимые');
        this.shelters = data.filter(b => b.category?.name === 'Убежища');
        this.allBrawlers = data;
      },
      error: (error) => {
        console.error('Ошибка при загрузке бойцов:', error);
      }
    });
  }

  navigateToAddBrawler() {
    this.router.navigate(['/add-brawler']);
  }

  deleteBrawler(brawlerId: number) {
    if (!this.authService.isAuthenticated()) {
      alert('Чтобы удалить бравлера, нужно авторизоваться!');
      return;
    }

    this.brawlerService.deleteBrawler(brawlerId).subscribe({
      next: () => {
        this.brawlers = this.brawlers.filter(b => b.id !== brawlerId);
        this.favorites = this.brawlers.filter(b => b.category?.name === 'Любимые');
        this.shelters = this.brawlers.filter(b => b.category?.name === 'Убежища');
        this.allBrawlers = this.brawlers;
      },
      error: (err) => {
        console.error('Ошибка при удалении бойца:', err);
        alert('Не удалось удалить бравлера. Попробуйте позже.');
      }
    });
  }

  // Метод, чтобы показывать кнопку удаления только авторизованным
  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }
  navigateToLogin() {
    this.router.navigate(['/login']);
  }
  
}

