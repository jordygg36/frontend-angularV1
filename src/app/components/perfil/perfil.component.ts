import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {
  user: any = {};

  constructor(private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router) {}

    ngOnInit(): void {
     this.getUserById(); // Llamar a tu servicio con el idusuarios
    
    }
  
    getUserById(): void {  
    const idusuarios = this.route.snapshot.paramMap.get('idusuarios'); 

    if (idusuarios) { 
      console.log('ID obtenido de la URL:', idusuarios);
      this.usuarioService.fetchUserById(idusuarios).subscribe({
        next: (data) => {
          if (data) {
            this.user = data;
            console.log('Usuario cargado:', this.user);
          } else {
            console.error('Error: No se encontró el usuario.');
          }
        },
        error:(error)=> {
          console.error('Error al obtener el usuario:', error);
        }
      });
    }else {
      console.error('ID de usuario no proporcionado.');
    }
  }
  
    editUser(idusuarios: string): void {
      if (!idusuarios) {
        console.error('Error: idusuarios no definido');
        return;
      }
      this.router.navigate(['/edit-user', idusuarios]); 
    }
  }