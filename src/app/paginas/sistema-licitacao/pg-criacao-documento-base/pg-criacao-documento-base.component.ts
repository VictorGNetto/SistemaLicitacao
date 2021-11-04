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

  // @offset === 0 -> insere à esquerda; @offset === 1 -> insere à direita;
  adicionarSecao(offset: number) {
    let qtdSecoes = this.secoes.length;
    let novaSecao: Secao = {
      nome: `${qtdSecoes + 1}ª Seção`,
      itens: [],
    };
    this.secoes.splice(this.secaoSelecionada + offset, 0, novaSecao);
  }

  removerSecao() {
    const index = this.secaoSelecionada;

    for (const item of this.secoes[index].itens) {
      this.itensExcluidos.push(item.itemID);
    }
    
    this.secoes.splice(index, 1);
  }

  salvarNomeSecao(index: number, event: FocusEvent) {
    let target = event.target as HTMLInputElement;
    this.secoes[index].nome = target.value;
  }

  onMudancaSecao(selectedIndex: number) {
    this.secaoSelecionada = selectedIndex;
  }

  adicionarPseudoitem(index: number) {
    let indexSecao = this.secaoSelecionada;
    this.secoes[indexSecao].itens.splice(index, 0, {
      tipo: 'pseudoitem',
      itemID: ''
    });
  }

  adicionarItem(tipo: string) {
    let index = this.secaoSelecionada;
    this.secoes[index].itens.push({
      tipo: tipo,
      itemID: `item novo ${this.itensCriados}`,
    });
    this.itensCriados++;
  }

  transformarItem(tipo: string, index: number) {
    let indexSecao = this.secaoSelecionada;
    this.secoes[indexSecao].itens[index] = {
      tipo: tipo,
      itemID: `item novo ${this.itensCriados}`,
    };
    this.itensCriados++;
  }

  removerItem(itemID: string) {
    this.itensExcluidos.push(itemID);

    let indexSecao = this.secaoSelecionada;
    let indexItem = this.secoes[indexSecao].itens.findIndex(
      (elem) => elem.itemID === itemID
    );
    this.secoes[indexSecao].itens.splice(indexItem, 1);
  }

  obterTotalItens() {
    let contador = 0;

    for (const secao of this.secoes) {
      contador += secao.itens.filter(item => item.tipo !== "pseudoitem").length;
    }

    return contador;
  }

  // --------------------------------------------------------------------------
  // Funções e Variáveis usadas no processo de salvamento do Documento Base ---
  // --------------------------------------------------------------------------
  salvandoItens = false;
  salvandoDocumentoBase = false;
  itensNaoSalvados = 0;
  itensExcluidos: string[] = [];

  // - Aqui inicia o processo de salvamento do Documento Base + seus Itens
  // - Este processo inicia com o salvamento dos Itens
  // - Durante este processo, o itemID de alguns Itens podem ser atualizados
  salvarItens() {
    this.itensNaoSalvados = this.obterTotalItens();

    if (this.itensNaoSalvados !== 0) {
      this.salvandoItens = true;
    } else {
      this.salvandoDocumentoBase = true;
    }

    this.excluirItensNaoUsados();

    this.aguardarSalvamentoItens();
  }

  // - Envia ao servidor um comando para deletar itens que não são mais usados
  excluirItensNaoUsados() {
    for (const itemID of this.itensExcluidos) {
      if (!itemID.startsWith('item novo')) {
        this.itemProvider.excluirItem(itemID).subscribe({
          next: () => {},
        });
      }
    }

    this.itensExcluidos = [];
  }

  // - Função chamada assincronamente sempre que um Item do Documento Base
  //   é salvado. Quando todos os Itens são salvados, é chamada a função
  //   this.atualizarItemIDs que, então, finaliza a etata de salvamento dos
  //   Itens
  itenFoiSalvo() {
    this.itensNaoSalvados--;

    if (this.itensNaoSalvados === 0) {
      this.atualizarItemIDs();
    }
  }

  // - Obtém a atulização de itemIDs do serviço de Itens e então as informações
  //   contidas em this.secoes
  // - Ao final, atribui o valor false para a variável this.salvandoItens,
  //   indicando assim que os Itens foram salvados e que o processo de salvamento
  //   do Documento Base pode iniciar
  // - Por fim, a variável this.salvandoDocumentoBase recebe o valor true,
  //   indicando que agora o Documento Base está sendo salvo e não permitindo
  //   que as variável this.salvandoItens e this.salvandoDocumentoBase estejam,
  //   ambas, com o valor false durante o processo de salvamento
  atualizarItemIDs() {
    const atualizacoesItemID = this.itemProvider.obterAtualizacoesItemID();

    // Percorre todos os Itens
    for (const secao of this.secoes) {
      for (const item of secao.itens) {
        if (item.itemID.startsWith('item novo')) {
          const index = atualizacoesItemID.findIndex(
            (x) => x.antigo === item.itemID
          );
          item.itemID = atualizacoesItemID[index].novo;
          this.itemProvider.removerAtualizacaoItemID(
            atualizacoesItemID[index].antigo,
            atualizacoesItemID[index].novo
          );
        }
      }
    }

    this.salvandoItens = false;
    this.salvandoDocumentoBase = true;
  }

  // - Para salvar o Documento Base, é preciso que o itemID de todos os Itens
  //   estejam devidamente atualizados. Isso só ocorre quando this.salvandoItens
  //   for false. Essa função serve então como uma sala de espera, e só chama
  //   a rotina de salvamento de Documento Base quando todos os Itens já estão
  //   salvados
  aguardarSalvamentoItens() {
    setTimeout(() => {
      if (this.salvandoItens) {
        this.aguardarSalvamentoItens();
      } else {
        this.salvarDocumentoBase();
      }
    }, 100);
  }

  // - Finaliza o processo de salvamento salvando o Documento Base
  salvarDocumentoBase() {
    let secoes: Secao[] = [];
    for (const secao of this.secoes) {
      secoes.push({
        nome: secao.nome,
        itens: secao.itens.filter(item => item.tipo !== "pseudoitem")
      });
    }

    this.documentoBaseProvider
      .salvarDocumentoBase({
        documentoBaseID: this.documentoBaseID,
        nomeDocumentoBase: this.nomeDocumentoBase,
        secoes: secoes,
      })
      .subscribe({
        next: () => {
          this.salvandoDocumentoBase = false;
        },
      });
  }
}
