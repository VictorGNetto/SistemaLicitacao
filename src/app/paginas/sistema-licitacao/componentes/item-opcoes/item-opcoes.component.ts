import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { EventEmitter, Input, Output } from '@angular/core';

import { ItemService } from 'src/app/providers/sistema-licitacao/item.service';

interface Subitem {
  tipo: string,                     // "subdescricao", "opcao" e "opcao-entrada-texto"
  subdescricao?: string             // aplicável somente quando tipo="subdescricao"
  opcao?: string                    // aplicável somente quando tipo="opcao" ou "opcao-entrada-texto"
  placeholderEntradaTexto?: string  // aplicável somente quando tipo="opcao-entrada-texto"
}

@Component({
  selector: 'item-opcoes',
  templateUrl: './item-opcoes.component.html',
  styleUrls: ['./item-opcoes.component.css']
})
export class ItemOpcoesComponent implements OnInit {

  @Input() itemID = "";
  @Input() salvarItem = false;

  nivelIndentacao = 0; // 0, 1 ou 2
  nivelIndentacaoClass = "container-0";

  descricao = "";
  subitens: Subitem[] = [
    // { tipo: "subdescricao", subdescricao: "123" },
    // { tipo: "opcao", opcao: "456" },
    // { tipo: "opcao-entrada-texto", opcao: "789", placeholderEntradaTexto: "000" }
  ];

  modoPrevisualizacao = false;

  @Output() salvado = new EventEmitter<void>();

  constructor(private itemProvider: ItemService) {}

  ngOnInit(): void {
    const itemNovo = this.itemID.startsWith("item novo");
    this.itemProvider.carregarItem(this.itemID, itemNovo).subscribe({
      next: res => {
        const dados = JSON.parse(res);
        this.descricao = itemNovo ? "" : dados["descricao"];
        this.subitens = itemNovo ? [] : dados["subitens"];
        this.mudarNivelIndentacao(itemNovo ? 0 : dados["nivelIndentacao"]);
        this.modoPrevisualizacao = itemNovo ? false : true;
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.salvarItem) {
      const dados = JSON.stringify({
        "descricao": this.descricao,
        "subitens": this.subitens,
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

  adicionarSubdescricao() {
    this.subitens.push({
      tipo: "subdescricao", subdescricao: ""
    });
  }

  adicionarOpcao() {
    this.subitens.push({
      tipo: "opcao", opcao: ""
    });
  }

  adicionarOpcaoComEntradaTexto() {
    this.subitens.push({
      tipo: "opcao-entrada-texto", opcao: "", placeholderEntradaTexto: ""
    });
  }

  removerSubitem(index: number) {
    this.subitens.splice(index, 1);
  }

  tooglePrevisualizacao() {
    this.modoPrevisualizacao = !this.modoPrevisualizacao;
  }

}
