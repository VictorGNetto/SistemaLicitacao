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
  permissaoCriacaoDocumentoBase = false;
  permissaoRealizacaoAnalise = false;

  constructor(
    private salvarDados: SalvarDados,
    private router: Router,
    private permissao: PermissaoService
  ) {}

  ngOnInit(): void {
    const infoSessao = this.salvarDados.get('infoSessao');
    const usuarioID = infoSessao['id'];

    this.permissao.obterPermissoes(usuarioID).subscribe({
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
}
