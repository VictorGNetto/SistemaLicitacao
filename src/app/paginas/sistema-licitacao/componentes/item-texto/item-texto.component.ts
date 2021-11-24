import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { EventEmitter, Input, Output } from '@angular/core';

import { ItemService } from 'src/app/providers/sistema-licitacao/item.service';

// Este aqui é o Item Texto, que permite a criação de Textos Fixos
// e Entradas de Texto por quem cria o Documento Base, e o preenchimento
// das Entradas de Texto por quem preenche um Documento.

interface Subitem {
  tipo: string; // "texto-fixo" ou "entrada-texto"
  conteudo?: string; // aplicável somente quando tipo="texto-fixo"
  placeholder?: string; // aplicável somente quando tipo="entrada-texto"
}

@Component({
  selector: 'item-texto',
  templateUrl: './item-texto.component.html',
  styleUrls: ['./item-texto.component.css'],
})
export class ItemTextoComponent implements OnInit {
  @Input() itemID = '';
  @Input() salvarItem = false;
  // Se verdadeiro, quando o item é salvado o conteúdo das suas Entradas de Texto também são salvadas
  @Input() salvarEntradas = true;

  subitens: Subitem[] = [
    // { tipo: "texto-fixo", conteudo: "Aqui vai o conteúdo do texto fixo"},
    // { tipo: "entrada-texto", placeholder: "Aqui vai o placeholder da entrada de texto", entradaID: 1}
  ];

  // array com o conteudo das entradas de texto
  entradasTexto: string[] = [];

  @Input() modoExibicao: 'preenchimento' | 'edicao' | 'pre-visualizacao' =
    'pre-visualizacao';

  @Output() salvado = new EventEmitter<void>();

  constructor(private itemProvider: ItemService) {}

  ngOnInit(): void {
    const itemNovo = this.itemID.startsWith('item novo');
    this.itemProvider.carregarItem(this.itemID, itemNovo).subscribe({
      next: (res) => {
        const dados = JSON.parse(res.dados);
        this.subitens = itemNovo ? [] : dados['subitens'];
        this.entradasTexto = itemNovo ? [] : dados['entradasTexto'];
      },
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.salvarItem) {
      if (!this.salvarEntradas) {
        this.entradasTexto = this.entradasTexto.map((_) => '');
      }

      const dados = JSON.stringify({
        subitens: this.subitens,
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

  adicionarTextoFixo() {
    this.subitens.push({
      tipo: 'texto-fixo',
      conteudo: '',
    });

    this.entradasTexto.push('');
  }

  adicionarEntradaTexto() {
    this.subitens.push({
      tipo: 'entrada-texto',
      placeholder: '',
    });

    this.entradasTexto.push('');
  }

  removerSubitem(index: number) {
    this.subitens.splice(index, 1);
    this.entradasTexto.splice(index, 1);
  }

  habilitarPreVisualizacao() {
    this.modoExibicao = 'pre-visualizacao';
  }

  habilitarEdicao() {
    this.modoExibicao = 'edicao';
  }
}
