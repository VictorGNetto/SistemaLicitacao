import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pgcompradireta',
  templateUrl: './pgcompradireta.component.html',
  styleUrls: ['./pgcompradireta.component.css']
})
export class PgcompradiretaComponent implements OnInit {
  // inputs de texto
  descricaoObjeto: string = "";
  justificativaServicoExecucaoContinuada: string = "";
  justificativaAdjudicacaoLote: string = "";

  // inputs de radio-button
  tipoContratacao: string = "";
  prestacaoServicoContinuada: string = "";
  caracterizacaoObjeto: string = "";
  adjudicacao: string = "";
  criterioJulgamentoPropostas: string = "";
  
  prestacaoServico: boolean = false;
  
  constructor() { }

  ngOnInit(): void {
  }

  onTipoContratacaoChange() {
    if (this.tipoContratacao == "servicoPrecoGlobal" || this.tipoContratacao == "servicoPrecoUnitario") {
      this.prestacaoServico = true;
    } else {
      this.prestacaoServico = false;
    }
  }
}
