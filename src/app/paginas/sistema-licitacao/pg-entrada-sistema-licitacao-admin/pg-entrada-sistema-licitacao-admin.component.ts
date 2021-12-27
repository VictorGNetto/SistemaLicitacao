import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SalvarDados } from 'src/app/classes/salvar-dados';
import { SessaoService } from 'src/app/providers/sistema-licitacao/sessao.service';

@Component({
  selector: 'app-pg-entrada-sistema-licitacao-admin',
  templateUrl: './pg-entrada-sistema-licitacao-admin.component.html',
  styleUrls: ['./pg-entrada-sistema-licitacao-admin.component.css'],
})
export class PgEntradaSistemaLicitacaoAdminComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private salvarDados: SalvarDados,
    private sessaoProvider: SessaoService
  ) {}

  ngOnInit(): void {
    this.salvarDados.remove('sessaoID');
    this.salvarDados.remove('infoSessao');

    const sessaoID = this.route.snapshot.queryParamMap.get('sessid') ?? '';

    if (sessaoID === '') {
      this.router.navigate(['/portalABC']);
      return;
    }

    this.salvarDados.set('sessaoID', sessaoID);
    this.salvarDados.set('permissaoAdmin', true);

    this.sessaoProvider.obterInfoSessao(sessaoID).subscribe({
      next: (res) => {
        this.salvarDados.set('infoSessao', res.infoSessao);
        this.router.navigate(['/']);
      },
    });
  }
}
