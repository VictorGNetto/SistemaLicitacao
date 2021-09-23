import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pg-sistema-licitacao',
  templateUrl: './pg-sistema-licitacao.component.html',
  styleUrls: ['./pg-sistema-licitacao.component.css']
})
export class PgSistemaLicitacaoComponent implements OnInit {

  tipoUsuario = "Analista";

  constructor() { }

  ngOnInit(): void {
  }

}
