import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Importamos AuthService

@Component({
  selector: 'app-productos-lista',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './productos-lista.component.html',
  styleUrls: ['./productos-lista.component.css']
})
export class ProductosListaComponent implements OnInit {
  arrayProducts: any = [];
  agregarCarrito: any = {};
  isAuthenticated: boolean = false; // Controla si el usuario está autenticado

  constructor(
    public productosService: ProductosService, 
    private router: Router, 
    private authService: AuthService // Inyectamos el servicio de autenticación
  ) {}

  ngOnInit(): void {
    this.fetch();
    this.authService.isAuthenticated$.subscribe(auth => {
      this.isAuthenticated = auth; // Verifica autenticación
    });
  }

  fetch() {
    this.productosService.fetchProduct().subscribe(result => {
      this.arrayProducts = result;
    });
  }
  
  addUser() {
    this.router.navigate(['/agregar-usuario']); // Navegar a la ruta de agregar usuario
  }

  editUser(id_usuario: string) {
    this.router.navigate(['/editar-usuario', id_usuario]); // Navegar a la ruta de editar usuario
  }
  
  deleteUser(id_usuario: string) {
    this.productosService.deleteProduct(id_usuario).subscribe(() => {
      this.arrayProducts = this.arrayProducts.filter((user: any) => user.id_usuario !== id_usuario);
    });
  }

  addCarrito(idProducto: string) {
    if (!this.isAuthenticated) {
      alert("Debes iniciar sesión para comprar productos.");
      return;
    }

    const productoSeleccionado = { idproductos: idProducto };
    this.productosService.postCarrito(productoSeleccionado).subscribe({
      next: (response) => {
        console.log('Producto agregado:', response);
        this.router.navigate(['/carrito-compras']); 
      },
      error: (error) => {
        console.error('Error al agregar al carrito:', error);
      }
    });
  }
}
