import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { EventEmitter, Input, Output } from '@angular/core';

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
    { tipo: "texto-fixo", conteudo: "Aqui vai o conteúdo do texto fixo"},
    { tipo: "entrada-texto", placeholder: "Aqui vai o placeholder da entrada de texto" }
  ];

  modoPrevisualizacao = false;

  @Output() salvado = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.salvarItem) {
      console.log("Salvando item " + this.itemID);
      this.salvado.emit();
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
