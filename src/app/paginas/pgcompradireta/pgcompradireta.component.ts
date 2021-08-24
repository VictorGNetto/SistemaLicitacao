import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pgcompradireta',
  templateUrl: './pgcompradireta.component.html',
  styleUrls: ['./pgcompradireta.component.css']
})
export class PgcompradiretaComponent implements OnInit {
  tipoContratacao: string = "";
  prestacaoServico: boolean = false;
  prestacaoServicoContinuada: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  onTipoContratacaoChange() {
    if (this.tipoContratacao == "3" || this.tipoContratacao == "4") {
      this.prestacaoServico = true;
    } else {
      this.prestacaoServico = false;
    }
  }

}
