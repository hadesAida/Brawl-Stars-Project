import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private apiUrl = 'http://localhost:8000/api/characters/';  // URL для получения списка персонажей с сервера

  constructor(private http: HttpClient) {}

  // Метод для получения списка персонажей
  getCharacters(): Observable<any> {
    const token = localStorage.getItem('access_token');  // Получаем токен авторизации из localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);  // Добавляем токен в заголовки
    return this.http.get<any>(this.apiUrl, { headers });  // Отправляем GET-запрос на API
  }

  // Метод для получения данных о персонаже по ID
  getCharacter(id: number): Observable<any> {
    const token = localStorage.getItem('access_token');  // Получаем токен авторизации
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);  // Добавляем токен в заголовки
    return this.http.get<any>(`${this.apiUrl}${id}/`, { headers });  // Отправляем GET-запрос на API
  }
}

