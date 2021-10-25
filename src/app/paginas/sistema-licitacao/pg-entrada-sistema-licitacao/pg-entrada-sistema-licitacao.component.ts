import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SalvarDados } from 'src/app/classes/salvar-dados';

@Component({
  selector: 'app-pg-entrada-sistema-licitacao',
  templateUrl: './pg-entrada-sistema-licitacao.component.html',
  styleUrls: ['./pg-entrada-sistema-licitacao.component.css'],
})
export class PgEntradaSistemaLicitacaoComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private salvarDados: SalvarDados
  ) {}

  ngOnInit(): void {
    const sessaoID = this.route.snapshot.queryParamMap.get('sessid') ?? '';
    this.salvarDados.set("sessaoID", sessaoID);

    this.router.navigate(['/sistemaLicitacao']);
  }
}
