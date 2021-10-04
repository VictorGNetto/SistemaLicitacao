import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'item-opcoes',
  templateUrl: './item-opcoes.component.html',
  styleUrls: ['./item-opcoes.component.css']
})
export class ItemOpcoesComponent implements OnInit {

  @Input() itemID = "";
  @Input() salvarItem = false;

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

}
