import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { EventEmitter, Input, Output } from '@angular/core';

import { ItemService } from 'src/app/providers/sistema-licitacao/item.service';
import { environment } from 'src/environments/environment';

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

  @Input() modoExibicao: 'preenchimento' | 'edicao' | 'pre-visualizacao' =
    'pre-visualizacao';

  @Output() salvado = new EventEmitter<void>();

  constructor(private itemProvider: ItemService) {}

  ngOnInit(): void {
    const itemNovo = this.itemID.startsWith('item novo');
    this.itemProvider.carregarItem(this.itemID, itemNovo).subscribe({
      next: (res) => {
        const dados = JSON.parse(res.dados);
        this.conteudo = itemNovo ? 'Nota: ' : dados['conteudo'];
      },
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.salvarItem) {
      const dados = JSON.stringify({
        conteudo: this.conteudo,
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

  habilitarPreVisualizacao() {
    this.modoExibicao = 'pre-visualizacao';
  }

  habilitarEdicao() {
    this.modoExibicao = 'edicao';
  }

  obterParagrafos(conteudo: string) {
    // remove espaços em branco do início e fim de conteudo
    conteudo = conteudo.trim();

    // divide conteudo em trechos separados por pelo menos duas quebras de linhas
    let paragrafos = conteudo.split('\n\n');

    paragrafos = paragrafos
      // remove paragrafos vazios
      .filter((e) => e !== '')
      // remove espaços em branco do início e fim de cada parágrafo
      .map((e) => e.trim())
      // transforma '\n' em ' '
      .map((e) => e.replace(/\n/g, ' '));

    return paragrafos;
  }
}
