import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SalvarDados } from 'src/app/classes/salvar-dados';

@Component({
  selector: 'app-pg-sistema-licitacao',
  templateUrl: './pg-sistema-licitacao.component.html',
  styleUrls: ['./pg-sistema-licitacao.component.css'],
})
export class PgSistemaLicitacaoComponent implements OnInit {
  permissaoAdmin = false;

  constructor(private salvarDados: SalvarDados, private router: Router) {}

  ngOnInit(): void {
    this.permissaoAdmin = this.salvarDados.get('permissaoAdmin');
  }

  irPortalAbc() {
    this.router.navigate(['/portalABC']);
  }

  irPaginaDocumento() {
    this.router.navigate(['/documento']);
  }

  irPaginaDocumentoBase() {
    this.router.navigate(['/documentoBase']);
  }

  irPaginaAnaliseDocumento() {
    this.router.navigate(['/analiseDocumento']);
  }
}
