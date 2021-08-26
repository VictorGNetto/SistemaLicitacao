import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { Compradireta } from '../models/compradireta';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompradiretaProviderService {
  constructor(private httpClient: HttpClient) {}

  getDocumento(codigo: string): Observable<Compradireta> {
    let [codigo_letras, ano] = this.parseCodigo(codigo);
    let url = environment.urlBase + `consultar-documento.php/?code=${ codigo_letras }&year=${ ano }`;

    return this.httpClient.get<Compradireta>(url).pipe(
      // retry(2),
      catchError(this.handleError)
    );
  }

  salvarDocumento(documento: any) {
    console.log(documento);
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

  // Transforma um código amigável AGH-2021 para um id ["AGH", 2021]
  parseCodigo(codigo: string): [string, number] {
    return ["ABC", 2021];
  }
}
