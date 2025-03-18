import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  URL = 'https://backend-nodejsv1-1.onrender.com/api/usuarios';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    return this.authService.getAuthHeaders();
  }
  fetchUser(): Observable<any> {
    return this.http.get(this.URL, { headers: this.getAuthHeaders() });
  }

  postUser(users: any): Observable<any> {
    return this.http.post(this.URL, users, { headers: this.getAuthHeaders() });
  }

  updateUser(idusuarios: string, userData: FormData): Observable<any> {
    return this.http.patch(`${this.URL}/${idusuarios}`, userData, {
      headers: this.authService.getAuthHeaders().delete('Content-Type') // Importante para enviar archivos
    });
  }
  


  deleteUser(idusuarios: string): Observable<any> {
    return this.http.delete(`${this.URL}/${idusuarios}`, { headers: this.getAuthHeaders() }); 
  }

  fetchUserById(idusuarios: string): Observable<any> {
    return this.http.get<any>(`${this.URL}/${idusuarios}`, { headers: this.getAuthHeaders() }).pipe(
      map(user => {
        if (user.imagen) {
          user.imagen = `http://localhost:5000/uploads/${user.imagen}`; 
        }
        return user;
      })
    );
  }
  
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.URL}/login`, credentials, { headers: this.getAuthHeaders() });
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token'); 
  }
  
  
}

