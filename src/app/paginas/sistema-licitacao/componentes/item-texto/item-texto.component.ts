import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { EventEmitter, Input, Output } from '@angular/core';

import { ItemService } from 'src/app/providers/sistema-licitacao/item.service';

// Este aqui é o Item Texto, que permite a criação de Textos Fixos
// e Entradas de Texto por quem cria o Documento Base, e o preenchimento
// das Entradas de Texto por quem preenche um Documento.

interface Subitem {
  tipo: string,         // "texto-fixo" ou "entrada-texto"
  conteudo?: string     // aplicável somente quando tipo="texto-fixo"
  placeholder?: string  // aplicável somente quando tipo="entrada-texto"
}

@Component({
  selector: 'item-texto',
  templateUrl: './item-texto.component.html',
  styleUrls: ['./item-texto.component.css']
})
export class ItemTextoComponent implements OnInit {

  @Input() itemID = "";
  @Input() salvarItem = false;

  nivelIndentacao = 0; // 0, 1 ou 2
  nivelIndentacaoClass = "container-0";

  subitens: Subitem[] = [
    // { tipo: "texto-fixo", conteudo: "Aqui vai o conteúdo do texto fixo"},
    // { tipo: "entrada-texto", placeholder: "Aqui vai o placeholder da entrada de texto" }
  ];

  modoPrevisualizacao = true;

  @Output() salvado = new EventEmitter<void>();

  constructor(private itemProvider: ItemService) {}

  ngOnInit(): void {
    const itemNovo = this.itemID.startsWith("item novo");
    this.itemProvider.carregarItem(this.itemID, itemNovo).subscribe({
      next: res => {
        const dados = JSON.parse(res);
        this.subitens = itemNovo ? [] : dados["subitens"];
        this.mudarNivelIndentacao(itemNovo ? 0 : dados["nivelIndentacao"]);
        this.modoPrevisualizacao = itemNovo ? false : true;
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.salvarItem) {
      const dados = JSON.stringify({
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

  adicionarTextoFixo() {
    this.subitens.push({
      tipo: "texto-fixo", conteudo: ""
    });
  }

  adicionarEntradaTexto() {
    this.subitens.push({
      tipo: "entrada-texto", placeholder: ""
    });
  }

  removerSubitem(index: number) {
    this.subitens.splice(index, 1);
  }

  tooglePrevisualizacao() {
    this.modoPrevisualizacao = !this.modoPrevisualizacao;
  }
}
