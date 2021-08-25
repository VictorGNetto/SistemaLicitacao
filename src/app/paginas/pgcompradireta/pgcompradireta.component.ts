import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pgcompradireta',
  templateUrl: './pgcompradireta.component.html',
  styleUrls: ['./pgcompradireta.component.css']
})
export class PgcompradiretaComponent implements OnInit {
  tipoContratacao: number = 0;
  prestacaoServico: boolean = false;
  prestacaoServicoContinuada: string = "";
  adjudicacao: string = 'porItem';

  constructor() { }

  ngOnInit(): void {
  }

  onTipoContratacaoChange() {
    if (this.tipoContratacao == 3 || this.tipoContratacao == 4) {
      this.prestacaoServico = true;
    } else {
      this.prestacaoServico = false;
    }
  }
}
