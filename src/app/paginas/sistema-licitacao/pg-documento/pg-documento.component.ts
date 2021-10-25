import { Component, OnInit } from '@angular/core';

import { SalvarDados } from 'src/app/classes/salvar-dados';

@Component({
  selector: 'app-pg-documento',
  templateUrl: './pg-documento.component.html',
  styleUrls: ['./pg-documento.component.css']
})
export class PgDocumentoComponent implements OnInit {
  usuarioNome = "Usuário ainda não identificado";
  usuarioID = -1;

  constructor(private salvarDados: SalvarDados) { }

  ngOnInit(): void {
    const infoSessao = this.salvarDados.get("infoSessao");
    this.usuarioID = infoSessao["id"];
    this.usuarioNome = infoSessao["nome"];
  }

}
