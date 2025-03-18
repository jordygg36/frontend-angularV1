import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './add-user.component.html', 
  styleUrls: ['./add-user.component.css'] 
  
})
export class AddUserComponent {
  newUser: any = {};
  selectedFile: File | null = null;

  constructor(private usuarioService: UsuarioService,private route: ActivatedRoute,
    private router: Router) {
    
  }

  addUser() {
    const formData = new FormData();
    formData.append('nombre', this.newUser.nombre);
    formData.append('apellido', this.newUser.apellido);
    formData.append('rfc', this.newUser.rfc);
    formData.append('email', this.newUser.email);
    formData.append('direccion', this.newUser.direccion);
    formData.append('idrol', this.newUser.idrol);
    formData.append('fecha_creacion', this.newUser.fecha_creacion);
    formData.append('password', this.newUser.password);
    if (this.selectedFile) {
      formData.append('imagen', this.selectedFile);
    }

    this.usuarioService.postUser(formData).subscribe({
      next: (response) => {
        console.log('Usuario agregado:', response);
      },
      error: (error) => {
        console.error('Error al agregar el usuario:', error);
      },
    });
    this.router.navigate(['/usuario']);
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
}
