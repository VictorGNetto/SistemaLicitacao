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
  @Input() itemID = "";
  @Input() salvarItem = false;
  conteudo = "";
  paragrafos: string[] = [];  // usado na previsualização
  nivelIndentacao = 0; // 0, 1 ou 2
  nivelIndentacaoClass = "container-0";

  modoPrevisualizacao = true;
  @Input() modoEdicao = true;

  @Output() salvado = new EventEmitter<void>();

  constructor(private itemProvider: ItemService) {}

  ngOnInit(): void {
    const itemNovo = this.itemID.startsWith("item novo");
    this.itemProvider.carregarItem(this.itemID, itemNovo).subscribe({
      next: res => {
        const dados = JSON.parse(res.dados);
        this.conteudo = itemNovo ? "Nota: " : dados["conteudo"];
        this.atualizarParagrafos();
        this.mudarNivelIndentacao(itemNovo ? 0 : dados["nivelIndentacao"]);
        this.modoPrevisualizacao = itemNovo ? false : true;
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.salvarItem) {
      const dados = JSON.stringify({
        "conteudo": this.conteudo,
        "nivelIndentacao": this.nivelIndentacao
      });

      const itemNovo = this.itemID.startsWith("item novo");
      this.itemProvider.salvarItem(this.itemID, dados, itemNovo).subscribe({
        next: res => {
          if (this.itemID !== res.itemID) {
            this.itemProvider.adicionarAtualizacaoItemID(this.itemID, res.itemID);
            this.itemID = res.itemID;
          }
          this.salvado.emit();
        }
      });
    }
  }

  mudarNivelIndentacao(novoNivelIndentacao: number) {
    this.nivelIndentacao = novoNivelIndentacao;
    if (this.modoEdicao) {
      this.nivelIndentacaoClass = `container-edicao-${novoNivelIndentacao}`;
    } else {
      this.nivelIndentacaoClass = `container-${novoNivelIndentacao}`;
    }
  }

  togglePrevisualizacao() {
    this.modoPrevisualizacao = !this.modoPrevisualizacao;

    if (this.modoPrevisualizacao) {
      this.atualizarParagrafos();  
    }
  }

  atualizarParagrafos() {
    this.paragrafos = this.conteudo.split("\n").filter(x => x !== "");
  }
}
