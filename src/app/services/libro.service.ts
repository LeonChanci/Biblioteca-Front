import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Libro } from '../interfaces/libro';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  constructor(private http: HttpClient) { }

  getLibroList(): Observable<Libro[]> {
    return this.http.get<Libro[]>(`${environment.apiUrl}/biblioteca/api/libro`);
  }

  saveLibro(newLibro: Libro) {
    const params = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(`${environment.apiUrl}/biblioteca/api/libro`, newLibro, { headers: params });
  }

  getLibro(id: number | null): Observable<Libro> {
    return this.http.get<Libro>(`${environment.apiUrl}/biblioteca/api/libro/${id}`)
  }

  editLibro(editLibro: Libro) {
    const params = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.put(`${environment.apiUrl}/biblioteca/api/libro`, editLibro, { headers: params });
  }

  deleteLibro(id: number | null) {
    return this.http.delete(`${environment.apiUrl}/biblioteca/api/libro/${id}`)
  }
}
