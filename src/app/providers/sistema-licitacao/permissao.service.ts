import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PermissaoService {
  constructor(private http: HttpClient) {}

  obterPermissoes(
    usuarioID: string
  ): Observable<{ criacaoDocumentoBase: boolean; realizacaoAnalise: boolean }> {
    const url = environment.urlBase + `obter-permissoes.php?usuarioID=${usuarioID}`;

    interface respostaPermissoesUsuario {
      criacaoDocumentoBase: boolean;
      realizacaoAnalise: boolean;
    }

    return this.http.get<respostaPermissoesUsuario>(url);
  }
}
