import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  arrayUser: any = [];

  constructor(public usuarioService: UsuarioService, private router: Router) {}

  ngOnInit(): void {
    this.fetch();
  }

  fetch() {
    this.usuarioService.fetchUser().subscribe(result => {
      this.arrayUser = result;
    });
  }

  addUser() {
    this.router.navigate(['/add-user']);
  }

  editUser(idusuarios: string) {
    this.router.navigate(['/edit-user', idusuarios]);
  }

  deleteUser(idusuarios: string) {
    this.usuarioService.deleteUser(idusuarios).subscribe(() => {
      this.arrayUser = this.arrayUser.filter((user: any) => user.idusuarios!== idusuarios);
    });
  }
}
