import { Component, OnInit } from '@angular/core';

import { Compradireta } from '../../models/compradireta';
import { CompradiretaProviderService } from '../../providers/compradireta-provider.service';

@Component({
  selector: 'app-pgcompradireta',
  templateUrl: './pgcompradireta.component.html',
  styleUrls: ['./pgcompradireta.component.css']
})
export class PgcompradiretaComponent implements OnInit {
  id: string = "";

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
  
  constructor(private provider: CompradiretaProviderService) { }

  // this._internalProvider.getDepartamentos().subscribe((res: any) => {
  //   console.log(res.departamentos);
  //   this._deptos = res.departamentos as Departamento[];
  // });

  ngOnInit(): void {
    this.provider.getDocumento("ABC-2021").subscribe((res: any) => {
      this.id = res.documento["id"];
      this.descricaoObjeto = res.documento["i1_descricaoObjeto"];
      this.justificativaServicoExecucaoContinuada = res.documento["i1_justificativaServicoExecucaoContinuada"];
      this.justificativaAdjudicacaoLote = res.documento["i1_justificativaAdjudicacaoLote"];
      this.tipoContratacao = res.documento["i1_tipoContratacao"];
      this.prestacaoServicoContinuada = res.documento["i1_prestacaoServicoContinuada"];
      this.caracterizacaoObjeto = res.documento["i1_caracterizacaoObjeto"];
      this.adjudicacao = res.documento["i1_adjudicacao"];
      this.criterioJulgamentoPropostas = res.documento["i1_criterioJulgamentoPropostas"];
    });
  }

  onTipoContratacaoChange() {
    if (this.tipoContratacao == "servicoPrecoGlobal" || this.tipoContratacao == "servicoPrecoUnitario") {
      this.prestacaoServico = true;
    } else {
      this.prestacaoServico = false;
    }
  }

  salvarDocumento() {
    let documento = {
      "documento": {
        "id": this.id,
        "i1_descricaoObjeto": this.descricaoObjeto,
        "i1_justificativaServicoExecucaoContinuada": this.justificativaServicoExecucaoContinuada,
        "i1_justificativaAdjudicacaoLote": this.justificativaAdjudicacaoLote,
        "i1_tipoContratacao": this.tipoContratacao,
        "i1_prestacaoServicoContinuada": this.prestacaoServicoContinuada,
        "i1_caracterizacaoObjeto": this.caracterizacaoObjeto,
        "i1_adjudicacao": this.adjudicacao,
        "i1_criterioJulgamentoPropostas": this.criterioJulgamentoPropostas
      }
    };
    this.provider.salvarDocumento(documento);
  }
}
