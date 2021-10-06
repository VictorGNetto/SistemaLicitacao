import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DocumentoBaseService } from 'src/app/providers/sistema-licitacao/documento-base.service';
import { ItemService } from 'src/app/providers/sistema-licitacao/item.service';

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

@Component({
  selector: 'app-pg-criacao-documento-base',
  templateUrl: './pg-criacao-documento-base.component.html',
  styleUrls: ['./pg-criacao-documento-base.component.css'],
})
export class PgCriacaoDocumentoBaseComponent implements OnInit {
  nomeDocumentoBase: string = '';
  documentoBaseID: string = '';
  secoes: Secao[] = [
    {
      nome: '1ª Seção',
      itens: [
        // { tipo: 'nota', itemID: 'item novo 255' },
        // { tipo: 'texto', itemID: 'item novo 256' },
        // { tipo: 'opcoes', itemID: 'item novo 257' },
      ],
    },
  ];
  secaoSelecionada = 0;
  itensCriados = 0;

  constructor(
    private route: ActivatedRoute,
    private documentoBaseProvider: DocumentoBaseService,
    private itemProvider: ItemService
  ) {}

  ngOnInit(): void {
    this.documentoBaseID =
      this.route.snapshot.paramMap.get('documentoBaseID') ?? '';

    this.documentoBaseProvider
      .carregarDocumentoBase(this.documentoBaseID)
      .subscribe({
        next: (documentoBase: DocumentoBase) => {
          this.nomeDocumentoBase = documentoBase.nomeDocumentoBase;
          this.secoes = documentoBase.secoes;
        },
      });
  }

  adicionarSecao() {
    let qtdSecoes = this.secoes.length;
    let novaSecao: Secao = {
      nome: `${qtdSecoes + 1}ª Seção`,
      itens: [],
    };
    this.secoes.push(novaSecao);
  }

  removerSecao() {
    this.secoes.splice(this.secaoSelecionada, 1);
  }

  salvarNomeSecao(index: number, event: FocusEvent) {
    let target = event.target as HTMLInputElement;
    this.secoes[index].nome = target.value;
  }

  onMudancaSecao(selectedIndex: number) {
    this.secaoSelecionada = selectedIndex;
  }

  adicionarItem(tipo: string) {
    let index = this.secaoSelecionada;
    this.secoes[index].itens.push({
      tipo: tipo,
      itemID: `item novo ${this.itensCriados}`,
    });
    this.itensCriados++;
  }

  deletaItem(id: string) {
    const item = document.getElementById(id);
    let indexSecao = this.secaoSelecionada;
    let indexItem = this.secoes[indexSecao].itens.findIndex(
      (elem) => elem.itemID === id
    );
    this.secoes[indexSecao].itens.splice(indexItem, 1);
  }

  obterTotalItens() {
    let contador = 0;

    for (const secao of this.secoes) {
      contador += secao.itens.length;
    }

    return contador;
  }

  // --------------------------------------------------------------------------
  // Funções e Variáveis usadas no processo de salvamento do Documento Base ---
  // --------------------------------------------------------------------------
  salvandoItens = false;
  salvandoDocumentoBase = false;
  itensNaoSalvados = 0;

  // - Inicia o processo de salvamento fazendo this.salvandoItens = true; e
  //   this.salvandoDocumentoBase = true;
  // - A mudança nessas variáveis desabilita algumas funcionalidades
  //   da página
  // - Além disso, this.salvandoItens = true; sinaliza os itens que eles devem
  //   ser salvados
  // - Armazena o total de itens não salvados na variável this.itensNaoSalvados
  // - Um evento emitido pelos itens, quando eles são salvados, faz com que a
  //   função this.itensFoiSalvo() seja chamado. Essa função então atualiza o
  //   total de itens não salvados
  // - Quando this.itensNaoSalvados === 0 significa que todos os itens estão
  //   salvados e então this.salvandoItens recebe o falor false
  salvarDocumentoBase() {
    this.salvandoItens = true;
    this.salvandoDocumentoBase = true;

    this.itensNaoSalvados = this.obterTotalItens();
  }

  itenFoiSalvo() {
    this.itensNaoSalvados--;

    if (this.itensNaoSalvados === 0) {
      this.atualizarItemIDs();
    }
  }

  atualizarItemIDs() {
    const atualizacoesItemID = this.itemProvider.obterAtualizacoesItemID();

    // Percorre todos os Itens
    for (const secao of this.secoes) {
      for (const item of secao.itens) {
        if (item.itemID.startsWith("item novo")) {
          const index = atualizacoesItemID.findIndex(x => x.antigo === item.itemID);
          item.itemID = atualizacoesItemID[index].novo;
          this.itemProvider.removerAtualizacaoItemID(atualizacoesItemID[index].antigo, atualizacoesItemID[index].novo);
        }
      }
    }

    this.documentoBaseProvider
      .salvarDocumentoBase({
        documentoBaseID: this.documentoBaseID,
        nomeDocumentoBase: this.nomeDocumentoBase,
        secoes: this.secoes,
      })
      .subscribe({
        next: () => {
          this.salvandoDocumentoBase = false;
        },
      });

    // this.salvandoItens = false; throws Angular ExpressionChangedAfterItHasBeenCheckedError
    // Por isso é necessário usar o setTimeout
    // setTimeout(() => {
    //   this.salvandoItens = false;
    // });
    this.salvandoItens = false;
  }
}
