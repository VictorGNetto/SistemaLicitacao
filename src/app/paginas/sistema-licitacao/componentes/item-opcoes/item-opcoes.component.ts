import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'item-opcoes',
  templateUrl: './item-opcoes.component.html',
  styleUrls: ['./item-opcoes.component.css']
})
export class ItemOpcoesComponent implements OnInit {

  @Input() itemID = "";

  constructor() { }

  ngOnInit(): void {
  }

}
