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

  // - Requisita ao backend a lista de Documentos Bases disponíveis
  // - Retorna essa lista
  listaDocumentosBase(): Observable<DocumentoBase[]> {
    const url = environment.urlBase + 'lista-documentos-base.php';

    interface respostaListagemDocumentosBase {
      listaDocumentosBase: DocumentoBase[];
    }

    return this.http
      .get<respostaListagemDocumentosBase>(url)
      .pipe(map((res) => res.listaDocumentosBase));
  }

  // - Requisita ao backend que seja criado um Documento Base
  // - Espera do servidor o ID do Documento Base criado
  // - Retorna o ID
  criarDocumentoBase(): Observable<string> {
    const url = environment.urlBase + 'criar-documento-base.php';

    // Formato da resposta que vem do servidor
    interface respostaCriacaoDocumentoBase {
      documentoBaseID: string;
    }

    return this.http
      .get<respostaCriacaoDocumentoBase>(url)
      .pipe(map((res) => res.documentoBaseID));
  }

  // - Requisita ao servidor um Documento Base pelo seu ID
  // - Retorna o Documento Base
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

  salvarDocumentoBase(documentoBase: DocumentoBase): Observable<void> {
    const url = environment.urlBase + 'salvar-documento-base.php';

    const opcoesHttp = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http
      .post<void>(url, documentoBase, opcoesHttp)
      .pipe(map(res => void 0))
  }
}
