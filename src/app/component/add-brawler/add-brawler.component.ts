import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Brawler } from '../../interfaces/Brawler';
import { BrawlerService } from '../../services/brawler.service';

@Component({
  selector: 'app-add-brawler',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-brawler.component.html',
  styleUrls: ['./add-brawler.component.css']
})
export class AddBrawlerComponent implements OnInit {
  newBrawler: Brawler = {
    id: 0,
    name: '',
    brawler_class: { name: '' }, // объект с полем name
    category: { name: 'Любимые' }, // по умолчанию
    image_url: '',
    rarity: '',
    description: '',
    super_name: '',
    super_description:'',
    title: '',
    facts: [],
    tips: []
  };

  brawlerClassName: string = '';
  categoryName: string = '';

  factsInput: string = '';
  tipsInput: string = '';
  superName: string = '';
  superDescription: string = '';

  constructor(
    private brawlerService: BrawlerService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const categoryName = params['category'];
      if (categoryName) {
        this.setCategory(categoryName);
      }
    });

    this.brawlerClassName = this.newBrawler.brawler_class?.name || '';
  }

  setCategory(category: string) {
    this.categoryName = category;
    this.newBrawler.category = { name: category }; // передаем только name
  }
  onCategoryChange(newCategoryName: string) {
    this.newBrawler.category = { name: newCategoryName };
  }
  

  addBrawler() {
    const brawlerToSend: Brawler = {
      ...this.newBrawler,
      brawler_class: { name: this.brawlerClassName ?? '' }, // всегда передаём name, даже если пусто
      category: { name: this.newBrawler.category?.name ?? '' }, // тоже
      facts: this.factsInput
        ? this.factsInput.split(',').map(f => ({ text: f.trim() }))
        : [],
      tips: this.tipsInput
        ? this.tipsInput.split(',').map(t => ({ text: t.trim() }))
        : [],
      super_name: this.superName ?? '', // передаем supername
      super_description: this.superDescription ?? '', // передаем superdescription
      image_url: this.newBrawler.image_url ?? '',
      rarity: this.newBrawler.rarity ?? '',
      description: this.newBrawler.description ?? '',
      title: this.newBrawler.title ?? '',
      name: this.newBrawler.name ?? '',
      id: this.newBrawler.id ?? 0
    };
  
    this.brawlerService.addBrawler(brawlerToSend).subscribe({
      next: () => {
        alert('Боец успешно добавлен!');
        this.router.navigate(['/brawlers']);
      },
      error: err => {
        console.error('Ошибка при добавлении бойца:', err);
        alert('Произошла ошибка при добавлении бойца. Попробуйте ещё раз.');
      }
    });
  }
  
}
