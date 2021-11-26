import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SalvarDados } from 'src/app/classes/salvar-dados';
import { PermissaoService } from 'src/app/providers/sistema-licitacao/permissao.service';

@Component({
  selector: 'app-pg-sistema-licitacao',
  templateUrl: './pg-sistema-licitacao.component.html',
  styleUrls: ['./pg-sistema-licitacao.component.css'],
})
export class PgSistemaLicitacaoComponent implements OnInit {
  usuarioID = -1;
  permissaoCriacaoDocumentoBase = false;
  permissaoRealizacaoAnalise = false;

  constructor(
    private salvarDados: SalvarDados,
    private router: Router,
    private permissao: PermissaoService
  ) {}

  ngOnInit(): void {
    const infoSessao = this.salvarDados.get('infoSessao');
    this.usuarioID = infoSessao['id'];

    this.obterPermissoes();
  }
  
  obterPermissoes() {
    this.permissao.obterPermissoes(this.usuarioID.toString()).subscribe({
      next: res => {
        this.permissaoCriacaoDocumentoBase = res.criacaoDocumentoBase;
        this.permissaoRealizacaoAnalise = res.realizacaoAnalise;
      }
    });
  }

  irPortalAbc() {
    this.router.navigate(['/portalABC']);
  }

  irPaginaDocumento() {
    this.router.navigate(['/sistemaLicitacao/documento']);
  }

  irPaginaDocumentoBase() {
    this.router.navigate(['/sistemaLicitacao/documentoBase']);
  }

  irPaginaAnaliseDocumento() {
    this.router.navigate(['/sistemaLicitacao/analiseDocumento']);
  }
}
