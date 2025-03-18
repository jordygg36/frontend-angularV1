import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/login';  
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    
    const token = this.getToken();
    this.isAuthenticatedSubject.next(!!token);
  }

  
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { email, password }).pipe(
      tap(response => {
        if (response.token && response.user?.idrol && response.user?.idusuarios) {
          this.saveToken(response.token);
          this.saveRole(response.user.idrol);
          this.saveUserId(response.user.idusuarios);

          this.isAuthenticatedSubject.next(true); // Cambiar estado de autenticación
          console.log('Token recibido y guardado:', response.token); // Verificar que el token se guarda
        }
      })
    );
  }


  logout(): void {
    if (this.isPlatformBrowser()) {
      this.clearToken();
      this.clearRole();
      this.clearUserId();

      localStorage.removeItem('user');
    }
    this.isAuthenticatedSubject.next(false); 
  }


  saveToken(token: string): void {
    if (this.isPlatformBrowser()) {
      localStorage.setItem('jwtToken', token); 
    }
  }
  saveRole(role: number): void {
    if (this.isPlatformBrowser()) {
      localStorage.setItem('userRole', role.toString());
    }
  }

  saveUserId(userId: number): void {
    if (this.isPlatformBrowser()) {
      localStorage.setItem('userId', userId.toString());
    }
  }
  clearToken(): void {
    if (this.isPlatformBrowser()) {
      localStorage.removeItem('jwtToken'); 
    }
  }

  clearRole(): void {
    if (this.isPlatformBrowser()) {
      localStorage.removeItem('userRole');
    }
  }

  clearUserId(): void {
    if (this.isPlatformBrowser()) {
      localStorage.removeItem('userId');
    }
  }

  getToken(): string | null {
    return this.isPlatformBrowser() ? localStorage.getItem('jwtToken') : null;
  }

  getRole(): number | null {
    const role = this.isPlatformBrowser() ? localStorage.getItem('userRole') : null;
    return role ? parseInt(role, 10) : null;
  }

  getUserData(): string | null {
    return this.isPlatformBrowser() ? localStorage.getItem('userId') : null;

  }
  
 
  hasToken(): boolean {
    return !!this.getToken(); 
  }

  private isPlatformBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : new HttpHeaders();
  }
}
