import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'item-nota',
  templateUrl: './item-nota.component.html',
  styleUrls: ['./item-nota.component.css']
})
export class ItemNotaComponent implements OnInit {

  @Input() itemID = "";
  conteudo = "";
  nivelIndentacao = 0;  // 0, 1 ou 2
  nivelIndentacaoClass = "container-0"

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.carregaConteudoPorID(changes.itemID.currentValue);
  }

  // TODO: implementar essa funcionalidade como um serviço
  carregaConteudoPorID(id: string) {
    this.conteudo = "Nota: "
  }

  mudarNivelIndentacao(novoNivelIndentacao: number) {
    this.nivelIndentacao = novoNivelIndentacao;
    this.nivelIndentacaoClass = `container-${novoNivelIndentacao}`;
  }

}
