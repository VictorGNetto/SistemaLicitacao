import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { EventEmitter, Input, Output } from '@angular/core';

import { ItemService } from 'src/app/providers/sistema-licitacao/item.service';

// Este aqui é o Item Opções, que permite a criação de um item com diversas
// escolhas. Cada escolha corresponde à uma opção deste Item. Além das opções,
// é possível adicionar subdescrições para um conjunto de opções. O Item como
// um todo possui uma descrição. Todos esses elementos que acabamos de
// descrever podem ser criados e editados por quem cria o Documento Base. Ao
// usuário que preenche um Documento, é permitido somente a escolha de uma
// das diversas opções criadas.

interface Subitem {
  tipo: string; // "subdescricao", "opcao" e "opcao-entrada-texto"
  subdescricao?: string; // aplicável somente quando tipo="subdescricao"
  opcao?: string; // aplicável somente quando tipo="opcao" ou "opcao-entrada-texto"
  textoFinal?: string;  // aplicável somente quando tipo="opcao" ou "opcao-entrada-texto"
  placeholderEntradaTexto?: string; // aplicável somente quando tipo="opcao-entrada-texto"
}

@Component({
  selector: 'item-opcoes',
  templateUrl: './item-opcoes.component.html',
  styleUrls: ['./item-opcoes.component.css'],
})
export class ItemOpcoesComponent implements OnInit {
  @Input() itemID = '';
  @Input() salvarItem = false;
  // Se verdadeiro, quando o item é salvado o conteúdo das suas Entradas de Texto e a Opção
  // escolhida também são salvados
  @Input() salvarEntradas = true;

  descricao = '';
  subitens: Subitem[] = [
    // { tipo: "subdescricao", subdescricao: "123" },
    // { tipo: "opcao", opcao: "456" },
    // { tipo: "opcao-entrada-texto", opcao: "789", placeholderEntradaTexto: "000" }
  ];

  // array com o conteudo das entradas de texto
  entradasTexto: string[] = [];
  opcao: number = -1;

  @Input() modoExibicao: 'preenchimento' | 'edicao' | 'pre-visualizacao' =
    'pre-visualizacao';

  @Output() salvado = new EventEmitter<void>();

  constructor(private itemProvider: ItemService) {}

  ngOnInit(): void {
    const itemNovo = this.itemID.startsWith('item novo');
    this.itemProvider.carregarItem(this.itemID, itemNovo).subscribe({
      next: (res) => {
        const dados = JSON.parse(res.dados);
        this.descricao = itemNovo ? '' : dados['descricao'];
        this.subitens = itemNovo ? [] : dados['subitens'];
        this.entradasTexto = itemNovo ? [] : dados['entradasTexto'];
        this.opcao = itemNovo ? -1 : dados['opcao'];
      },
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.salvarItem) {
      if (!this.salvarEntradas) {
        this.entradasTexto = this.entradasTexto.map((_) => '');
        this.opcao = -1;
      }

      const dados = JSON.stringify({
        descricao: this.descricao,
        subitens: this.subitens,
        opcao: this.opcao,
        entradasTexto: this.entradasTexto,
      });

      const itemNovo = this.itemID.startsWith('item novo');
      this.itemProvider.salvarItem(this.itemID, dados, itemNovo).subscribe({
        next: (res) => {
          if (this.itemID !== res.itemID) {
            this.itemProvider.adicionarAtualizacaoItemID(
              this.itemID,
              res.itemID
            );
            this.itemID = res.itemID;
          }
          this.salvado.emit();
        },
      });
    }
  }

  adicionarSubdescricao() {
    this.subitens.push({
      tipo: 'subdescricao',
      subdescricao: '',
    });

    this.entradasTexto.push('');
  }

  adicionarOpcao() {
    this.subitens.push({
      tipo: 'opcao',
      opcao: '',
    });

    this.entradasTexto.push('');
  }

  adicionarOpcaoComEntradaTexto() {
    this.subitens.push({
      tipo: 'opcao-entrada-texto',
      opcao: '',
      placeholderEntradaTexto: '',
    });

    this.entradasTexto.push('');
  }

  removerSubitem(index: number) {
    this.subitens.splice(index, 1);
    this.entradasTexto.splice(index, 1);
  }

  atualizarOpcao(opcao: number) {
    this.opcao = opcao;
  }

  habilitarPreVisualizacao() {
    this.modoExibicao = 'pre-visualizacao';
  }

  habilitarEdicao() {
    this.modoExibicao = 'edicao';
  }
}
