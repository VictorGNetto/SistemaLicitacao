import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessaoService } from 'src/app/providers/sistema-licitacao/sessao.service';

@Component({
  selector: 'app-pg-sistema-licitacao',
  templateUrl: './pg-sistema-licitacao.component.html',
  styleUrls: ['./pg-sistema-licitacao.component.css']
})
export class PgSistemaLicitacaoComponent implements OnInit {
  sessaoID = "";
  sessaoInfo: any;
  usuarioID: number = -1;
  possuiPermissaoDocBase = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sessaoProvider: SessaoService
  ) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    this.sessaoID = state ? state["sessaoID"] : "";
  }

  ngOnInit(): void {
    this.sessaoProvider
      .obterInfoSessao(this.sessaoID)
      .subscribe({
        next: x => {
          this.sessaoInfo = x;
          this.usuarioID = x["id"];
        }
      });
  }

  irPaginaDocumentoBase() {
    this.router.navigate(["/sistemaLicitacao/documentoBase"], {
      state: {
        dados: "Aqui vão os dados!!!"
      }
    });
  }

}
