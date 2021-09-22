import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'item-texto',
  templateUrl: './item-texto.component.html',
  styleUrls: ['./item-texto.component.css']
})
export class ItemTextoComponent implements OnInit {

  @Input() itemID = "";

  constructor() { }

  ngOnInit(): void {
  }

}
