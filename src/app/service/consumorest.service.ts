import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VirtualTimeScheduler } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsumorestService {

  constructor(private http: HttpClient) {
  }
  getCategoriasRest(){
    return this.http.get('http://localhost:3110/api/categoria');
  }
}
