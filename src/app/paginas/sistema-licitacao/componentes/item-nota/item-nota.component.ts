import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { EventEmitter, Input, Output } from '@angular/core';

import { ItemService } from 'src/app/providers/sistema-licitacao/item.service';

// Este aqui é o Item Nota, que permite ao criador do Documento Base passsar
// informações gerais a quem for preencher o Documento.

@Component({
  selector: 'item-nota',
  templateUrl: './item-nota.component.html',
  styleUrls: ['./item-nota.component.css'],
})
export class ItemNotaComponent implements OnInit {
  @Input() itemID = '';
  @Input() salvarItem = false;
  conteudo = '';
  paragrafos: string[] = []; // usado na previsualização
  recuo = 0; // 0, 1, 2, ...

  @Input() modoExibicao:
    | 'preenchimento'
    | 'edicao'
    | 'pre-visualizacao'
    | 'sei' = 'pre-visualizacao';

  @Output() salvado = new EventEmitter<void>();

  constructor(private itemProvider: ItemService) {}

  ngOnInit(): void {
    const itemNovo = this.itemID.startsWith('item novo');
    this.itemProvider.carregarItem(this.itemID, itemNovo).subscribe({
      next: (res) => {
        const dados = JSON.parse(res.dados);
        this.conteudo = itemNovo ? 'Nota: ' : dados['conteudo'];
        this.atualizarParagrafos();
        this.mudarRecuo(itemNovo ? 0 : dados['recuo']);
      },
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.atualizarParagrafos();

    if (this.salvarItem) {
      const dados = JSON.stringify({
        conteudo: this.conteudo,
        recuo: this.recuo,
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

  mudarRecuo(novoRecuo: number) {
    this.recuo = novoRecuo;
  }

  habilitarPreVisualizacao() {
    this.modoExibicao = 'pre-visualizacao';
  }

  habilitarEdicao() {
    this.modoExibicao = 'edicao';
  }

  atualizarParagrafos() {
    this.paragrafos = this.conteudo.split('\n').filter((x) => x !== '');
  }
}
