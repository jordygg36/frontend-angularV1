import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule 
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  userId: string | null = null;
  token: string | null = null;
  isAuthenticated = false;
  isTokenExpired = false;

  constructor(private authService: AuthService, private router: Router, private ngZone: NgZone) {}

  ngOnInit(): void {
    // Suscribirse al estado de autenticación
    this.authService.isAuthenticated$.subscribe(status => {
      this.isAuthenticated = status;
      this.userId = this.authService.getUserData();
      
    });

    // Obtener el token
    this.token = this.authService.getToken();

    if (this.token) {
      this.isTokenExpired = this.checkTokenExpiration(this.token);

      if (this.isTokenExpired) {
        this.handleExpiredToken();
      }
    } else {
      this.router.navigate(['/login']);
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  private decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (error) {
      console.error('Error al decodificar el token', error);
      return null;
    }
  }

  private checkTokenExpiration(token: string): boolean {
    const decoded = this.decodeToken(token);
    if (!decoded || !decoded.exp) {
      return true;
    }
    return (decoded.exp * 1000) < Date.now();
  }

  private handleExpiredToken(): void {
    console.warn('El token ha expirado. Redirigiendo a inicio de sesión...');
    this.authService.logout();
    this.ngZone.run(() => this.router.navigate(['/login']));
  }
}
