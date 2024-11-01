import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Prestamo } from '../interfaces/prestamo';
import { environment } from '../../environments/environment';
import { PrestamoSummary } from '../interfaces/PrestamoSummary';

@Injectable({
  providedIn: 'root'
})
export class PrestamoService {
  constructor(private http: HttpClient) { }

  getPrestamoList(): Observable<Prestamo[]> {
    return this.http.get<Prestamo[]>(`${environment.apiUrl}/biblioteca/api/prestamo`);
  }
  getPrestamoSummaryList(): Observable<PrestamoSummary[]> {
    return this.http.get<PrestamoSummary[]>(`${environment.apiUrl}/biblioteca/api/prestamo/summary`);
  }

  savePrestamo(newPrestamo: Prestamo) {
    const params = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(`${environment.apiUrl}/biblioteca/api/prestamo`, newPrestamo, { headers: params });
  }

  getPrestamo(id: number | null): Observable<Prestamo> {
    return this.http.get<Prestamo>(`${environment.apiUrl}/biblioteca/api/prestamo/${id}`)
  }

  editPrestamo(editPrestamo: Prestamo) {
    const params = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.put(`${environment.apiUrl}/biblioteca/api/prestamo`, editPrestamo, { headers: params });
  }

  deletePrestamo(id: number | null) {
    return this.http.delete(`${environment.apiUrl}/biblioteca/api/prestamo/${id}`)
  }
}
