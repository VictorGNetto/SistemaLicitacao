import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

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
  status: 'Em Edição' | 'Em Análise' | 'Aprovado';
  identificacao: string;
  tituloDocumento: string;
  secoes: Secao[];
  criacao: string;
  edicao: string;
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
  listaDocumentosPorAutor(usuarioID: Number): Observable<Documento[]> {
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
   * Obtém do backend a lista de Documentos pertencentes a um usuário.
   *
   * @param usuarioID é o ID do usuário dono dos Documentos
   * @returns a lista de Documentos pedida
   */
  listaDocumentosPorStatus(
    status: 'Em Edição' | 'Em Análise' | 'Aprovado'
  ): Observable<Documento[]> {
    const url = environment.urlBase + `lista-documentos.php?status=${status}`;

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

  /**
   * Recebe os dados de um documento e os envia ao backend para que eles
   * sejam salvados.
   *
   * @param documento são os dados do Documento a serem salvados
   * @returns nada!
   */
  salvarDocumento(documento: {
    documentoID: string;
    tituloDocumento: string;
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

  /**
   * Envia ao backend o ID de um Documento que deve ser excluído. O
   * backend exclui então o Documento, assim como todos os itens que
   * pertencem ao Documento.
   *
   * @param documentoID é o ID do Documento a ser excluído
   * @returns o ID do Documento Excluído
   */
  excluirDocumento(documentoID: string): Observable<{ documentoID: string }> {
    const url =
      environment.urlBase + `excluir-documento.php?documentoID=${documentoID}`;

    interface respostaExclusaoDocumento {
      documentoID: string;
    }

    return this.http.get<respostaExclusaoDocumento>(url).pipe(
      map((res) => {
        return { documentoID: res.documentoID };
      })
    );
  }

  mudarStatus(
    documentoID: string,
    novoStatus: 'Em Edição' | 'Em Análise' | 'Aprovado'
  ): Observable<{ status: 'Em Edição' | 'Em Análise' | 'Aprovado' }> {
    const url =
      environment.urlBase +
      `mudar-status-documento.php?documentoID=${documentoID}&status=${novoStatus}`;

    interface respostaMudancaStatusDocumento {
      status: 'Em Edição' | 'Em Análise' | 'Aprovado';
    }

    return this.http.get<respostaMudancaStatusDocumento>(url);
  }

  buscarDocumento(documentoID: string): Observable<Documento> {
    const url =
      environment.urlBase + `buscar-documento.php?documentoID=${documentoID}`;

    interface respostaBuscaDocumento {
      documento: Documento;
    }

    return this.http
      .get<respostaBuscaDocumento>(url)
      .pipe(map((res) => res.documento));
  }
}
