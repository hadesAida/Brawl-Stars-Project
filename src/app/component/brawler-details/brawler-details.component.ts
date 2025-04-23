import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router'; // RouterModule импортирован
import { Brawler } from '../../interfaces/Brawler';
import { CommonModule } from '@angular/common';
import { BrawlerService } from '../../services/brawler.service';
import { HttpClientModule } from '@angular/common/http'; // <-- добавь это!


@Component({
  selector: 'app-brawler-details',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './brawler-details.component.html',
  styleUrls: ['./brawler-details.component.css']
})
export class BrawlerDetailsComponent implements OnInit {
  brawler: Brawler | undefined;

  constructor(
    private route: ActivatedRoute,
    private brawlerService: BrawlerService
  ) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!; // Получаем id из URL

    this.brawlerService.getBrawlerById(id).subscribe((data: Brawler) => {
      this.brawler = data; // Присваиваем объект Brawler
    });
  }
  

  getRarityClass(rarity?: string): string {
    switch (rarity) {
      case 'Сверхредкий': return 'rarity-superrare';
      case 'Эпический': return 'rarity-epic';
      case 'Мифический': return 'rarity-mythic';
      case 'Легендарный': return 'rarity-legendary';
      case 'Начальный боец': return 'rarity-starting';
      default: return '';
    }
  }
}
