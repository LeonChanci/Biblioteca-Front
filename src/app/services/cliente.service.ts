import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../interfaces/cliente';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  constructor(private http: HttpClient) {}

  getClienteList(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${environment.apiUrl}/biblioteca/api/cliente`)
  }

  saveCliente(newClient: Cliente) {
    const params = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(`${environment.apiUrl}/biblioteca/api/cliente`, newClient, { headers: params });
  }

  getCliente(id: string | null): Observable<Cliente> {
    return this.http.get<Cliente>(`${environment.apiUrl}/biblioteca/api/cliente/${id}`)
  }

  editCliente(editClient: Cliente) {
    const params = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.put(`${environment.apiUrl}/biblioteca/api/cliente`, editClient, { headers: params });
  }

  deleteCliente(id: string | null) {
    return this.http.delete(`${environment.apiUrl}/biblioteca/api/cliente/${id}`)
  }
}
