import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { DocumentoService } from './documento.service';
import { ItemService } from './item.service';

function construirItemTexto(dados: string) {
  interface Subitem {
    tipo: string;
    conteudo?: string;
    placeholder?: string;
  }

  let subitens: Subitem[] = [];
  let entradasTexto: string[] = [];

  const _dados = JSON.parse(dados);
  subitens = _dados['subitens'];
  entradasTexto = _dados['entradasTexto'];

  let paragrafos: string[] = [];
  for (let i = 0; i < subitens.length; i++) {
    if (subitens[i].tipo === 'texto-fixo') {
      const conteudo = subitens[i].conteudo?.trim();

      // trata casos em que conteudo === '' ou conteudo === undefined
      if (!conteudo) continue;

      let paragrafosNovos = conteudo.split('\n').filter((e) => e !== '');

      if (paragrafosNovos.length === 0) continue;

      const ultimoParagrafo = paragrafos.pop();
      if (ultimoParagrafo) {
        paragrafosNovos[0] = ultimoParagrafo + paragrafosNovos[0];
      }

      paragrafos = paragrafos.concat(paragrafosNovos);
    } else {
      // subitens[i].tipo === 'entrada-texto'

      const conteudo = entradasTexto[i].trim();
      let paragrafosNovos = conteudo
        .split('\n')
        .filter((e) => e !== '')
        .map((e) => '<span class="destacar">' + e + '</span>');

      if (paragrafosNovos.length === 0) continue;

      const ultimoParagrafo = paragrafos.pop();
      if (ultimoParagrafo) {
        paragrafosNovos[0] = ultimoParagrafo + paragrafosNovos[0];
      }

      paragrafos = paragrafos.concat(paragrafosNovos);
    }
  }

  if (paragrafos.length === 0) return '';

  paragrafos = paragrafos.map((e) => '<p class="Item_Nivel2">' + e + '</p>');

  return paragrafos.join('\n') + '\n';
}

function construirItemOpcoes(dados: string) {
  interface Subitem {
    tipo: string;
    subdescricao?: string;
    opcao?: string;
    placeholderEntradaTexto?: string;
  }

  let descricao = '';
  let subitens: Subitem[];
  let entradasTexto: string[] = [];
  let opcao = -1;

  const _dados = JSON.parse(dados);
  descricao = _dados['descricao'];
  subitens = _dados['subitens'];
  entradasTexto = _dados['entradasTexto'];
  opcao = _dados['opcao'];

  let conteudoItem = `<p class="Item_Nivel2">${descricao}</p>\n`;
  for (let i = 0; i < subitens.length; i++) {
    if (subitens[i].tipo === 'subdescricao') {
      conteudoItem += `<p class="Item_Inciso_Romano">${subitens[i].subdescricao}</p>\n`;
    } else if (subitens[i].tipo === 'opcao') {
      const marcacao = opcao === i ? ' X ' : '&nbsp; &nbsp; ';
      const destaque = opcao === i ? ' destacar' : '';
      conteudoItem += `<p class="Texto_Justificado_Recuo_Primeira_Linha${destaque}">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; (${marcacao}) ${subitens[i].opcao}</p>\n`;
    } else {
      // subitens[i].tipo === 'opcao-entrada-texto'
      const marcacao = opcao === i ? ' X ' : '&nbsp; &nbsp; ';
      const destaque = opcao === i ? ' destacar' : '';
      const entradaTexto = opcao === i ? entradasTexto[i] : '';
      conteudoItem += `<p class="Texto_Justificado_Recuo_Primeira_Linha${destaque}">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; (${marcacao}) ${subitens[i].opcao} ${entradaTexto}</p>\n`;
    }
  }

  return conteudoItem;
}

function construirItemLista(dados: string) {
  interface Subitem {
    tipo: string;
    conteudo?: string;
    placeholder?: string;
  }

  let alfabeto: 'latino' | 'romano' = 'latino';
  let subitens: Subitem[] = [];
  let entradasTexto: string[] = [];

  const _dados = JSON.parse(dados);
  alfabeto = _dados['alfabeto'];
  subitens = _dados['subitens'];
  entradasTexto = _dados['entradasTexto'];

  const classeLista =
    alfabeto === 'latino' ? 'Item_Alinea_Letra' : 'Item_Inciso_Romano';
  let conteudoItem = '';
  for (let i = 0; i < subitens.length; i++) {
    let incremento = '';
    if (subitens[i].tipo === 'texto-fixo') {
      incremento =
        subitens[i].conteudo?.length !== 0
          ? `<p class="${classeLista}">${subitens[i].conteudo} </p>\n`
          : '';
    } else {
      // subitens[i].tipo === 'entrada-texto'
      incremento =
        entradasTexto[i].length !== 0
          ? `<p class="${classeLista} destacar">${entradasTexto[i]} </p>\n`
          : '';
    }

    conteudoItem += incremento;
  }

  return conteudoItem;
}

@Injectable({
  providedIn: 'root',
})
export class SeiService {
  constructor(
    private documentoProvider: DocumentoService,
    private itemProvider: ItemService
  ) {}

  exportarDocumento(
    documentoID: string
  ): Observable<{ nome: string; conteudo: string }> {
    const observable = new Observable<{ nome: string; conteudo: string }>(
      (observer) => {
        let nomeDocumento = '';
        let nomeSecoes: string[] = [];
        let conteudoItens: string[][] = [];

        let itensEmConstrucao = -1; // total de Itens que ainda precisam ser construídos

        this.documentoProvider.carregarDocumento(documentoID).subscribe({
          next: (res) => {
            itensEmConstrucao = 0;

            // atribui o nome do documento
            nomeDocumento = res.nomeDocumento;

            for (let i = 0; i < res.secoes.length; i++) {
              // atribui o nome da seção
              nomeSecoes.push(res.secoes[i].nome);

              // inicializa o conteudo dos itens com seus respectivos IDs e tipo
              // e incrementa o contador de itens em construção
              conteudoItens.push([]);
              for (let j = 0; j < res.secoes[i].itens.length; j++) {
                if (res.secoes[i].itens[j].tipo !== 'nota') {
                  conteudoItens[i].push(
                    JSON.stringify({
                      itemID: res.secoes[i].itens[j].itemID,
                      tipo: res.secoes[i].itens[j].tipo,
                    })
                  );
                  itensEmConstrucao += 1;
                }
              }
            }

            // atribui adequadamente o conteudo dos itens
            // e decrementa o contador de itens em construção
            for (let i = 0; i < res.secoes.length; i++) {
              for (let j = 0; j < conteudoItens[i].length; j++) {
                const itemID = JSON.parse(conteudoItens[i][j]).itemID;
                const tipo = JSON.parse(conteudoItens[i][j]).tipo;

                this.itemProvider.carregarItem(itemID).subscribe({
                  next: (res) => {
                    if (tipo === 'texto') {
                      conteudoItens[i][j] = construirItemTexto(res.dados);
                    } else if (tipo === 'opcoes') {
                      conteudoItens[i][j] = construirItemOpcoes(res.dados);
                    } else if (tipo === 'lista') {
                      conteudoItens[i][j] = construirItemLista(res.dados);
                    }
                    itensEmConstrucao -= 1;
                  },
                });
              }
            }
          },
        });

        function publicaDocumento() {
          if (itensEmConstrucao === 0) {
            // constrói o arquivo
            let conteudoArquivo = `<p class="Texto_Centralizado_Maiusculas_Negrito">${nomeDocumento}</p>\n`;
            for (let i = 0; i < nomeSecoes.length; i++) {
              conteudoArquivo += `<p class="Item_Nivel1">${nomeSecoes[i]}</p>\n`;

              for (let j = 0; j < conteudoItens[i].length; j++) {
                conteudoArquivo += conteudoItens[i][j];
              }
            }

            // envia para o observer
            observer.next({ nome: nomeDocumento, conteudo: conteudoArquivo });
          } else {
            setTimeout(publicaDocumento, 100);
          }
        }

        publicaDocumento();

        return {
          unsubscribe() {},
        };
      }
    );

    return observable;
  }
}
