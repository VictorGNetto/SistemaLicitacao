import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { EventEmitter, Input, Output } from '@angular/core';

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

  descricao = "Descrição";
  subitens: Subitem[] = [
    { tipo: "subdescricao", subdescricao: "123" },
    { tipo: "opcao", opcao: "456" },
    { tipo: "opcao-entrada-texto", opcao: "789", placeholderEntradaTexto: "000" }
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

  removerSubitem(index: number) {
    this.subitens.splice(index, 1);
  }

  tooglePrevisualizacao() {
    this.modoPrevisualizacao = !this.modoPrevisualizacao;
  }

}
