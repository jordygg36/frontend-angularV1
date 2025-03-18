import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; 
@Component({
  selector: 'app-carrito-compras',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './carrito-compras.component.html',
  styleUrl: './carrito-compras.component.css'
})
export class CarritoComprasComponent implements OnInit {
  arrayCarritos: any = [];
  constructor(public productosService: ProductosService, private router: Router) {}

  ngOnInit(): void {
    this.fetch();
  }

  fetch() {
    this.productosService.fetchCarrito().subscribe(result => {
      this.arrayCarritos = result;
    });
  }

  deleteCarrito(idcarrito: string) {
    this.productosService.deleteCar(idcarrito).subscribe(() => {
      this.arrayCarritos = this.arrayCarritos.filter((user: any) => user.idcarrito !== idcarrito);
    });
  }

  
}
