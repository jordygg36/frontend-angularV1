import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  URL = 'http://localhost:5000/api/productos';
  URL2 = 'http://localhost:5000/api/carrito';  

  constructor(private http: HttpClient) {}

  fetchProduct(): Observable<any> {
    return this.http.get(this.URL);
  }

  fetchCarrito(): Observable<any> {
    return this.http.get(this.URL2);
  }
  postProduct(products: any): Observable<any> {
    return this.http.post(this.URL, products);
  }

  postCarrito(products: any): Observable<any> {
    return this.http.post(this.URL2, products);
  }

  updateProduct(idproductos: string, products: any): Observable<any> {
    return this.http.put(`${this.URL}/${idproductos}`, products); // Asegúrate de que la URL esté bien formada
}


  deleteProduct(idproductos: string): Observable<any> {
    return this.http.delete(`${this.URL}/${idproductos}`); // Agregar la barra diagonal para que sea correcta la URL
  }

  deleteCar(idcarrito: string): Observable<any> {
    return this.http.delete(`${this.URL2}/${idcarrito}`); // Agregar la barra diagonal para que sea correcta la URL
  }

  fetchProductById(idproductos: string): Observable<any> {
    return this.http.get(`${this.URL}/${idproductos}`);
  }
  
  
  
}

