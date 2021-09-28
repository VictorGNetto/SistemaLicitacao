import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

import { environment } from 'src/environments/environment';

interface Item {
  tipo: string;
  id: string;
}

interface Secao {
  nome: string;
  itens: Item[];
}

interface DocumentoBase {
  nomeDocumentoBase: string,
  secoes: Secao[]
}

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
    interface respostaCriacaoDocumentoBase {
      documentoBaseID: string
    }

    return this.http.get<respostaCriacaoDocumentoBase>(url).pipe(
      map(res => res["documentoBaseID"] )
    );
  }

  carregarDocumentoBase(documentoBaseID: string): Observable<DocumentoBase> {
    let url = environment.urlBase + 'carregar-documento-base.php';

    interface respostaCarregamentoDocumentoBase {
        documentoBase: DocumentoBase
    }

    return this.http.get<respostaCarregamentoDocumentoBase>(url).pipe(
      map(res => res["documentoBase"])
    );
  }
}
