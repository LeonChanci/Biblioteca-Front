import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LibroXml } from '../interfaces/libroxml';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LibroXmlService {
  constructor(private http: HttpClient) { }

  getLibroXmlList(): Observable<LibroXml[]> {
    return this.http.get<LibroXml[]>(`${environment.apiUrl}/biblioteca/api/libraryXml/books`);
  }

  getTotalBooksWithMoreOneCategory(): Observable<number> {
    return this.http.get<number>(`${environment.apiUrl}/biblioteca/api/libraryXml/totalValue`);
  }

  getPercentageBooksAfterYear2000(): Observable<number> {
    return this.http.get<number>(`${environment.apiUrl}/biblioteca/api/libraryXml/percentageValue`);
  }

  getLibrosXmlByFilter(anoPublicacion: number | null): Observable<LibroXml[]> {
    return this.http.get<LibroXml[]>(`${environment.apiUrl}/biblioteca/api/libraryXml/filterByAttribute/${anoPublicacion}`);
  }
}
