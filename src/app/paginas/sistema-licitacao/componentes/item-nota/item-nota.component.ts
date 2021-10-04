import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Input } from '@angular/core';
import { ItemService } from 'src/app/providers/sistema-licitacao/item.service';

@Component({
  selector: 'item-nota',
  templateUrl: './item-nota.component.html',
  styleUrls: ['./item-nota.component.css'],
})
export class ItemNotaComponent implements OnInit {
  @Input() itemID = '';
  conteudo = '';
  nivelIndentacao = 0; // 0, 1 ou 2
  nivelIndentacaoClass = 'container-0';

  constructor(private itemProvider: ItemService) {}

  ngOnInit(): void {
    const itemNovo = this.itemID.startsWith("item novo");
    this.itemProvider.carregarItem(this.itemID, itemNovo).subscribe({
      next: x => {
        const dados = JSON.parse(x);
        this.conteudo = itemNovo? "Nota: " : dados["conteudo"];
        this.mudarNivelIndentacao(itemNovo? 0 : dados["nivelIndentacao"]);
      }
    });
  }

  mudarNivelIndentacao(novoNivelIndentacao: number) {
    this.nivelIndentacao = novoNivelIndentacao;
    this.nivelIndentacaoClass = `container-${novoNivelIndentacao}`;
  }
}
