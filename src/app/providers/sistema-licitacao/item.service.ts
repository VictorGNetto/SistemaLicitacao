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

  /**
   * Carrega os dados de um Item do backend usando o seu ID. Se o Item for
   * novo, é retornado uma resposta padrão.
   * Obs.: é necessário retornar na forma de uma string já que existem
   *       diversos tipos de Itens (Nota, Texto, Opções), cada um deles com
   *       um formato específico para os seus dados. Como este serviço é
   *       compartilhado por todos os Itens, é necessário que o tipo de
   *       retorno dessa função seja agnóstico.
   * 
   * @param itemID é o ID do Item a ser carregado
   * @param itemNovo indica se o Item é novo, simplificando a resposta
   * @returns uma string com os dados do Item. Esses dados podem são acessados
   *          usando JSON.parse(*)
   */
  carregarItem(
    itemID: string,
    itemNovo = false
  ): Observable<{ dados: string }> {
    if (itemNovo) {
      return of({ dados: '{}' }); // JSON.stringify({}) = "{}"
    }

    const url = environment.urlBase + `carregar-item.php?itemID=${itemID}`;

    interface respostaCarregamentoItem {
      dados: string;
    }

    return this.http.get<respostaCarregamentoItem>(url).pipe(
      map((res) => {
        return { dados: res.dados };
      })
    );
  }

  /**
   * Envia os dados de um Item para o backend para que eles sejam salvados
   * no banco de dados.
   * 
   * @param itemID é o ID do item a ser salvado
   * @param dados são os dados do Item, obtido via JSON.stringfy(*)
   * @param itemNovo indica se o Item é novo (se ainda não possui um ID)
   * @returns o ID do Item salvado
   */
  salvarItem(
    itemID: string,
    dados: string,
    itemNovo = false
  ): Observable<{ itemID: string }> {
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
        { itemID: itemID, dados: dados, novo: itemNovo },
        opcoesHttp
      )
      .pipe(
        map((res) => {
          return { itemID: res.itemID };
        })
      );
  }

  /**
   * Recebe o ID de um Item e informa o backend que os dados desse Item devem
   * ser excluídos do banco de dados.
   * 
   * @param itemID é o ID do Item a ser excluído
   * @returns o ID do Item excluído
   */
  excluirItem(itemID: string): Observable<{ itemID: string }> {
    const url = environment.urlBase + `excluir-item.php?itemID=${itemID}`;

    interface respostaExclusaoItem {
      itemID: string;
    }

    return this.http.get<respostaExclusaoItem>(url).pipe(
      map((res) => {
        return { itemID: res.itemID };
      })
    );
  }
}
