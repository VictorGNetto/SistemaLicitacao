import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pg-entrada-sistema-licitacao',
  templateUrl: './pg-entrada-sistema-licitacao.component.html',
  styleUrls: ['./pg-entrada-sistema-licitacao.component.css'],
})
export class PgEntradaSistemaLicitacaoComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit(): void {
    const sessaoID = this.route.snapshot.queryParamMap.get('sessid') ?? '';
    this.router.navigate(['/sistemaLicitacao'], {
      state: {
        sessaoID: sessaoID
      }
    });
  }
}
