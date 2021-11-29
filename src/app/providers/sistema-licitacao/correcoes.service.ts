import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CorrecoesService {
  constructor(private http: HttpClient) {}

  criarCorrecoes(documentoID: string): Observable<void> {
    const url = environment.urlBase + `criar-correcoes.php?documentoID=${documentoID}`;

    return this.http.get<void>(url);
  }

  carregarCorrecoes(documentoID: string): Observable<{ dados: string }> {
    const url =
      environment.urlBase + `carregar-correcoes.php?documentoID=${documentoID}`;

    interface respostaCarregamentoCorrecoes {
      dados: string;
    }

    return this.http.get<respostaCarregamentoCorrecoes>(url).pipe(
      map((res) => {
        return { dados: res.dados };
      })
    );
  }

  salvarCorrecoes(documentoID: string, dados: string): Observable<void> {
    const url = environment.urlBase + `salvar-correcoes.php`;

    const opcoesHttp = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this.http
      .post<void>(url, { documentoID: documentoID, dados: dados }, opcoesHttp)
      .pipe(map((res) => void 0));
  }
}
