import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor(private http: HttpClient) {}

  atualizacoesItemID: { antigo: string; novo: string }[] = [];

  adicionarAtualizacaoItemID(antigo: string, novo: string) {
    this.atualizacoesItemID.push({ antigo: antigo, novo: novo });
  }

  removerAtualizacaoItemID(antigo: string, _novo: string) {
    const index = this.atualizacoesItemID.findIndex((x) => x.antigo === antigo);

    if (index !== -1) {
      this.atualizacoesItemID.splice(index, 1);
    }
  }

  obterAtualizacoesItemID() {
    return this.atualizacoesItemID;
  }

  // - Verifica se o item requisitado já existe ou se acabou de ser criado
  //   - Se acabou de ser criado
  //      - Retorna um dado padrão
  //   - Se já existe
  //      - Requisita ao servidor os dados do item pelo seu ID
  //      - Retorna esses dados no formato de string
  // Observação: é necessário retornar na forma de uma string já que
  //             existem diversos tipos de Itens (nota, texto, opções),
  //             cada um deles com um formato específico para os seus
  //             dados. Como este serviço é compartilhado por todos os
  //             Itens, é necessário que o tipo de retorno dessa função
  //             seja agnóstico.
  carregarItem(itemID: string, itemNovo = false): Observable<string> {
    if (itemNovo) {
      return of('{}'); // JSON.stringify({}) = "{}"
    }

    const url = environment.urlBase + `carregar-item.php?itemID=${itemID}`;

    interface respostaCarregamentoItem {
      dados: string;
    }

    return this.http
      .get<respostaCarregamentoItem>(url)
      .pipe(map(res => res.dados));
  }

  // - Envia ao backend o ID e os dados de um item para que ele seja salvo
  // - O servidor cria um novo ID para os itens que ainda não tem e retorna esse ID
  // - Retorna o ID devolvido pelo servidor
  salvarItem(itemID: string, dados: string): Observable<{ itemID: string }> {
    const url = environment.urlBase + `salvar-item.php`;

    const opcoesHttp = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    interface respostaSalvamentoItem {
      itemID: string;
    }

    return this.http
      .post<respostaSalvamentoItem>(
        url,
        { itemID: itemID, dados: dados },
        opcoesHttp
      )
      .pipe(
        map(res => {
          return { itemID: res.itemID };
        })
      );
  }

  excluirItem(itemID: string): Observable<{ itemID: string }> {
    const url = environment.urlBase + `excluir-item.php?itemID=${itemID}`;

    interface respostaExclusaoItem {
      itemID: string;
    }

    return this.http
      .get<respostaExclusaoItem>(url)
      .pipe(map(res => {
        return { itemID: res.itemID }
      }));
  }
}
