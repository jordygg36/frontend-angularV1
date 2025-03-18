import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = "octavo";
  isAuthenticated = false;
  userRole: number | null = null;
  userId: string | null = null;
  
  constructor(private authService: AuthService, private router: Router, private ngZone: NgZone) {}

  ngOnInit() {
    this.authService.isAuthenticated$.subscribe(status => {
      this.ngZone.run(() => {
        this.isAuthenticated = status;
        this.userRole = this.authService.getRole();
        this.userId = this.authService.getUserData();
        console.log(this.userId);
        console.log(this.userRole); 
      });
    });
  }
  perfil(idusuarios: string | null): void {
  console.log('Navegando al perfil con ID:', idusuarios); // Verifica que el ID no sea null o undefined
  if (!idusuarios) {
    console.error('Error: idusuarios no definido');
    return;
  }
  this.router.navigate(['/perfil', idusuarios]); 
}

  

  logout() {
    this.authService.logout();
    
    this.router.navigate(['/login']);
  }
}
