import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SessaoService } from 'src/app/providers/sistema-licitacao/sessao.service';
import { SalvarDados } from 'src/app/classes/salvar-dados';

@Component({
  selector: 'app-pg-sistema-licitacao',
  templateUrl: './pg-sistema-licitacao.component.html',
  styleUrls: ['./pg-sistema-licitacao.component.css']
})
export class PgSistemaLicitacaoComponent implements OnInit {
  possuiPermissaoDocBase = true;

  constructor(
    private router: Router,
    private sessaoProvider: SessaoService,
    private salvarDados: SalvarDados
  ) {}

  ngOnInit(): void {
    const sessaoID = this.salvarDados.get("sessaoID");

    this.sessaoProvider
      .obterInfoSessao(sessaoID)
      .subscribe({
        next: res => this.salvarDados.set("infoSessao", res)
      });
  }

  irPaginaDocumento() {
    this.router.navigate(["/sistemaLicitacao/documento"]);
  }

  irPaginaDocumentoBase() {
    this.router.navigate(["/sistemaLicitacao/documentoBase"]);
  }

}
