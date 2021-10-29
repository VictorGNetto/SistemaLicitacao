import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SalvarDados } from 'src/app/classes/salvar-dados';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

interface Item {
  tipo: string;
  itemID: string;
}

interface Secao {
  nome: string;
  itens: Item[];
}

interface Documento {
  documentoID: string;
  autorID: string;
  documentoBaseID: string;
  status: string;
  identificacao: string;
  nomeDocumento: string;
  secoes: Secao[];
}

@Injectable({
  providedIn: 'root',
})
export class DocumentoService {
  constructor(private http: HttpClient, private salvarDados: SalvarDados) {}

  /**
   * Cria um novo Documento a partir de um Documento base: o nome, as seções
   * e os itens dessas seções serão os mesmos. A diferença é que tudo isso
   * é clonado no banco de dados, permitindo que o Documento criado seja
   * editado/preenchido sem alterar o conteúdo do Documento Base.
   *
   * @param documentoBaseID - ID do Documento Base que está sendo clonado
   */
  criarDocumento(documentoBaseID: string): Observable<string> {
    const infoSessao = this.salvarDados.get('infoSessao');
    const autorID = infoSessao['id'];

    const url =
      environment.urlBase +
      `criar-documento.php?documentoBaseID=${documentoBaseID}&autorID=${autorID}`;

    interface respostaCriacaoDocumento {
      documentoID: string;
    }

    return this.http
      .get<respostaCriacaoDocumento>(url)
      .pipe(map((res) => res.documentoID));
  }

  carregarDocumento(documentoID: string): Observable<Documento> {
    const url =
      environment.urlBase + `carregar-documento.php?documentoID=${documentoID}`;

    interface respostaCarregamentoDocumento {
      documento: Documento;
    }

    return this.http
      .get<respostaCarregamentoDocumento>(url)
      .pipe(map((res) => res.documento));
  }
}
