import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { EventEmitter, Input, Output } from '@angular/core';

import { ItemService } from 'src/app/providers/sistema-licitacao/item.service';

@Component({
  selector: 'item-nota',
  templateUrl: './item-nota.component.html',
  styleUrls: ['./item-nota.component.css'],
})
export class ItemNotaComponent implements OnInit {
  @Input() itemID = "";
  @Input() salvarItem = false;
  conteudo = "";
  nivelIndentacao = 0; // 0, 1 ou 2
  nivelIndentacaoClass = "container-0";

  @Output() salvado = new EventEmitter<void>();

  constructor(private itemProvider: ItemService) {}

  ngOnInit(): void {
    const itemNovo = this.itemID.startsWith("item novo");
    this.itemProvider.carregarItem(this.itemID, itemNovo).subscribe({
      next: res => {
        const dados = JSON.parse(res);
        this.conteudo = itemNovo ? "Nota: " : dados["conteudo"];
        this.mudarNivelIndentacao(itemNovo ? 0 : dados["nivelIndentacao"]);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.salvarItem) {
      const dados = JSON.stringify({
        "conteudo": this.conteudo,
        "nivelIndentacao": this.nivelIndentacao
      });

      this.itemProvider.salvarItem(this.itemID, dados).subscribe({
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
    this.nivelIndentacaoClass = `container-${novoNivelIndentacao}`;
  }
}
