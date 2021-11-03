import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

interface Item {
  tipo: string;
  itemID: string;
}

interface Secao {
  nome: string;
  itens: Item[];
}

interface DocumentoBase {
  documentoBaseID: string;
  nomeDocumentoBase: string;
  secoes: Secao[];
}

@Injectable({
  providedIn: 'root',
})
export class DocumentoBaseService {
  constructor(private http: HttpClient) {}

  /**
   * Requisita ao backendo a lista de Documentos Bases disponíveis
   *
   * @returns a lista de Documentos Base
   */
  listaDocumentosBase(): Observable<DocumentoBase[]> {
    const url = environment.urlBase + 'lista-documentos-base.php';

    interface respostaListagemDocumentosBase {
      listaDocumentosBase: DocumentoBase[];
    }

    return this.http
      .get<respostaListagemDocumentosBase>(url)
      .pipe(map((res) => res.listaDocumentosBase));
  }

  /**
   * Requisita ao backend que seja criado um Documento Base, espera do
   * servidor o ID do Documento Base criado e então retorna esse ID.
   *
   * @returns o ID do Documento Base criado
   */
  criarDocumentoBase(): Observable<{ documentoBaseID: string }> {
    const url = environment.urlBase + 'criar-documento-base.php';

    // Formato da resposta que vem do servidor
    interface respostaCriacaoDocumentoBase {
      documentoBaseID: string;
    }

    return this.http.get<respostaCriacaoDocumentoBase>(url).pipe(
      map((res) => {
        return { documentoBaseID: res.documentoBaseID };
      })
    );
  }

  /**
   * Carregas os dados de um Documento Base do backend usando o seu ID.
   * 
   * @param documentoBaseID é o ID do Documento Base a ser carregado
   * @returns os dados do Documento Base
   */
  carregarDocumentoBase(documentoBaseID: string): Observable<DocumentoBase> {
    const url =
      environment.urlBase +
      `carregar-documento-base.php?documentoBaseID=${documentoBaseID}`;

    interface respostaCarregamentoDocumentoBase {
      documentoBase: DocumentoBase;
    }

    return this.http
      .get<respostaCarregamentoDocumentoBase>(url)
      .pipe(map((res) => res.documentoBase));
  }

  /**
   * Recebe os dados de um Documento Base (Nome e secoes) e então os envia
   * ao backend para que eles sejam salvados.
   * 
   * @param documentoBase são os dados do Documento Base a serem salvados
   * @returns nada!
   */
  salvarDocumentoBase(documentoBase: DocumentoBase): Observable<void> {
    const url = environment.urlBase + 'salvar-documento-base.php';

    const opcoesHttp = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this.http
      .post<void>(url, documentoBase, opcoesHttp)
      .pipe(map((res) => void 0));
  }
}
