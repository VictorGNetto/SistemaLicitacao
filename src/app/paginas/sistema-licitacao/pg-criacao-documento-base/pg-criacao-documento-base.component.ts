import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pg-criacao-documento-base',
  templateUrl: './pg-criacao-documento-base.component.html',
  styleUrls: ['./pg-criacao-documento-base.component.css']
})
export class PgCriacaoDocumentoBaseComponent implements OnInit {

  nomeDocumentoBase: string = "";
  secoes: string[] = [
    "ABC"
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
