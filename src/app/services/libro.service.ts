import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Libro } from '../interfaces/libro';

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  constructor(private http: HttpClient) { }

  getLibroList(): Observable<Libro[]> {
    return this.http.get<Libro[]>(`http://localhost:9090/biblioteca/api/libro`);
  }

  saveLibro(newLibro: Libro) {
    const params = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(`http://localhost:9090/biblioteca/api/libro`, newLibro, { headers: params });
  }

  getLibro(id: number | null): Observable<Libro> {
    return this.http.get<Libro>(`http://localhost:9090/biblioteca/api/libro/${id}`)
  }

  editLibro(editLibro: Libro) {
    const params = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.put(`http://localhost:9090/biblioteca/api/libro`, editLibro, { headers: params });
  }

  deleteLibro(id: number | null) {
    return this.http.delete(`http://localhost:9090/biblioteca/api/libro/${id}`)
  }
}
