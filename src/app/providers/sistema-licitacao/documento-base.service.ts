import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DocumentoBaseService {
  constructor(private http: HttpClient) {}

  // - Requisita ao servidor que seja criado um Documento Base
  // - Espera do servidor o ID do Documento Base criado
  // - Retorna o ID
  criarDocumentoBase(): Observable<string> {
    let url = environment.urlBase + `criar-documento-base.php`;

    // Formato da resposta que vem do servidor
    interface respostaCriacaoDocumento {
      baseDocumentoID: string
    }

    return this.http.get<respostaCriacaoDocumento>(url).pipe(
      map(res => res["baseDocumentoID"] )
    )
  }
}
