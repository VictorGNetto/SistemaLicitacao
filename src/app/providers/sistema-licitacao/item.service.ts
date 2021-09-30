import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor(private http: HttpClient) {}

  // - Verifica se o item requisitado já existe ou se acabou de ser criado
  //   - Se acabou de ser criado
  //      - Retorna um um dado padrão
  //   - Se já existe
  //      - Requisita ao servidor os dados de um item pelo seu ID
  //      - Retorna esses dados no formato de string
  // Observação: é necessário retornar na forma de uma string já que
  //             existem diversos tipos de Itens (nota, texto, opções),
  //             cada um deles com um formato específico para os seus
  //             dados. Como este serviço é compartilhado por todos os
  //             Itens, é necessário que o tipo de retorno dessa função
  //             seja agnóstico.
  carregarItem(itemID: string): Observable<string> {
    if (itemID.startsWith('item novo')) {
      return of(
        JSON.stringify({
          nivelIndentacao: 0,
        })
      );
    }

    let url = environment.urlBase + `carregar-item.php?itemID=${itemID}`;

    interface respostaCarregamentoItem {
      item: JSON;
    }

    return this.http
      .get<respostaCarregamentoItem>(url)
      .pipe(map(res => JSON.stringify(res['item'])));
  }
}
