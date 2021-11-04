import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
   * Obtém do backend a lista de Documentos pertencentes a um usuário.
   *
   * @param usuarioID é o ID do usuário dono dos Documentos
   * @returns a lista de Documentos pedida
   */
  listaDocumentos(usuarioID: Number): Observable<Documento[]> {
    const url =
      environment.urlBase + `lista-documentos.php?autorID=${usuarioID}`;

    interface respostaListagemDocumentos {
      listaDocumentos: Documento[];
    }

    return this.http
      .get<respostaListagemDocumentos>(url)
      .pipe(map((res) => res.listaDocumentos));
  }

  /**
   * Cria um novo Documento a partir de um Documento base: o nome, as seções
   * e os itens dessas seções serão os mesmos. A diferença é que tudo isso
   * é clonado no banco de dados, permitindo que o Documento criado seja
   * editado/preenchido sem alterar o conteúdo do Documento Base.
   *
   * @param documentoBaseID é o ID do Documento Base que está sendo clonado
   * @returns o ID do Documento criado
   */
  criarDocumento(documentoBaseID: string): Observable<{ documentoID: string }> {
    const infoSessao = this.salvarDados.get('infoSessao');
    const autorID = infoSessao['id'];

    const url =
      environment.urlBase +
      `criar-documento.php?documentoBaseID=${documentoBaseID}&autorID=${autorID}`;

    interface respostaCriacaoDocumento {
      documentoID: string;
    }

    return this.http.get<respostaCriacaoDocumento>(url).pipe(
      map((res) => {
        return { documentoID: res.documentoID };
      })
    );
  }

  /**
   * Carrega os dados de um Documento do backend usando o ID do Documento
   *
   * @param documentoID é o ID do Documento a ser carregado
   * @returns o Documento (documentoID, autorID, ..., secoes)
   */
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

  salvarDocumento(documento: {
    documentoID: string;
    nomeDocumento: string;
    secoes: Secao[];
  }): Observable<void> {
    const url = environment.urlBase + 'salvar-documento.php';

    const opcoesHttp = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this.http
      .post<void>(url, documento, opcoesHttp)
      .pipe(map((res) => void 0));
  }
}
