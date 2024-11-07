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
    return this.http.get<LibroXml[]>(`${environment.apiUrl}/biblioteca/api/libraryXml`);
  }
}
