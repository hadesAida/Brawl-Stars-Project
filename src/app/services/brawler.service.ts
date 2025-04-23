import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Brawler } from '../interfaces/Brawler';
import { safeJoin } from '../utils';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class BrawlerService {
  private brawlersSubject = new BehaviorSubject<Brawler[]>([]);
  brawlers$ = this.brawlersSubject.asObservable();
  private apiUrl = 'http://localhost:8000/api/brawlers/';

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Получить всех бравлеров
  getAllFromApi(): Observable<Brawler[]> {
    return this.http.get<Brawler[]>(this.apiUrl);
  }

  // Получить бравлера по ID
  getBrawlerById(id: number): Observable<Brawler> {  // Добавляем этот метод
    const url = safeJoin(this.apiUrl, id);  // Генерация правильного URL
    return this.http.get<Brawler>(url);
  }

  // Добавить нового бравлера
  addBrawler(brawler: Brawler): Observable<Brawler> {
    const url = 'http://localhost:8000/api/brawlers/upload/';
    return this.http.post<Brawler>(url, [brawler]);
  }

  // Удалить бравлера с авторизацией
  deleteBrawler(id: number): Observable<void> {
    const url = safeJoin(this.apiUrl, id);
    const token = this.authService.getToken();
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined;
    return this.http.delete<void>(url, { headers });
  }
}
