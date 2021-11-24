import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { EventEmitter, Input, Output } from '@angular/core';

import { ItemService } from 'src/app/providers/sistema-licitacao/item.service';

// Este aqui é o Item Lista, que permite a criação de lista com enumeração
// latina ou romana. Cara item da lista pode ser um Texto Fixo, que só pode
// ser alterada por quem cria o Documento base; ou uma Entrada de Texto, que
// pode ser peenchida por quem preenche um Documento.

interface Subitem {
  tipo: string; // "texto-fixo" ou "entrada-texto"
  conteudo?: string; // aplicável somente quando tipo="texto-fixo"
  placeholder?: string; // aplicável somente quando tipo="entrada-texto"
}

@Component({
  selector: 'item-lista',
  templateUrl: './item-lista.component.html',
  styleUrls: ['./item-lista.component.css'],
})
export class ItemListaComponent implements OnInit {
  @Input() itemID = '';
  @Input() salvarItem = false;
  // Se verdadeiro, quando o item é salvado o conteúdo das suas Entradas de Texto também são salvadas
  @Input() salvarEntradas = true;

  enumeracaoLatina = ['a', 'b', 'c', 'd', 'e'];
  enumeracaoRomana = ['I', 'II', 'III', 'IV', 'V'];

  alfabeto: 'latino' | 'romano' = 'latino';
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
    console.log('imhere');
    const itemNovo = this.itemID.startsWith('item novo');
    this.itemProvider.carregarItem(this.itemID, itemNovo).subscribe({
      next: (res) => {
        const dados = JSON.parse(res.dados);
        this.alfabeto = itemNovo ? 'latino' : dados['alfabeto'];
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
        alfabeto: this.alfabeto,
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

  obterEnumeracao(index: number, alfabeto: 'latino' | 'romano') {
    if (alfabeto === 'latino') {
      if (index < this.enumeracaoLatina.length)
        return this.enumeracaoLatina[index] + ')';
      return '...';
    } else {
      // alfabeto === 'romano'
      if (index < this.enumeracaoRomana.length)
        return this.enumeracaoRomana[index] + ' -';
      return '...';
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
