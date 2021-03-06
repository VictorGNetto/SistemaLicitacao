import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DocumentoService } from 'src/app/providers/sistema-licitacao/documento.service';

interface Item {
  tipo: string;
  itemID: string;
}

interface Secao {
  nome: string;
  itens: Item[];
}

@Component({
  selector: 'app-pg-preenchimento-documento',
  templateUrl: './pg-preenchimento-documento.component.html',
  styleUrls: ['./pg-preenchimento-documento.component.css']
})
export class PgPreenchimentoDocumentoComponent implements OnInit {
  tituloDocumento = "";
  documentoID = "";
  secoes: Secao[] = [];

  modoExibicaoCorrecoes: 'aberto' | 'fechado' = 'fechado';
  classeToolbarCorrecoes = 'bordas-arredondadas';

  constructor(private route: ActivatedRoute, private documentoProvider: DocumentoService) { }

  ngOnInit(): void {
    this.documentoID = this.route.snapshot.paramMap.get('documentoID') ?? '';
  
    this.documentoProvider
      .carregarDocumento(this.documentoID)
      .subscribe({
        next: documento => {
          this.tituloDocumento = documento.tituloDocumento;
          this.secoes = documento.secoes;
        }
      });
  }

  maximizarCorrecoes() {
    this.modoExibicaoCorrecoes = 'aberto';
    this.classeToolbarCorrecoes = 'bordas-superiores-arredondadas';
  }

  minimizarCorrecoes() {
    this.modoExibicaoCorrecoes = 'fechado';
    this.classeToolbarCorrecoes = 'bordas-arredondadas'
  }

  obterTotalItens() {
    let contador = 0;

    for (const secao of this.secoes) {
      contador += secao.itens.length;
    }

    return contador;
  }

  // --------------------------------------------------------------------------
  // Funções e Variáveis usadas no processo de salvamento do Documento --------
  // --------------------------------------------------------------------------
  salvandoItens = false;
  salvandoDocumento = false;
  itensNaoSalvados = 0;

  salvarItens() {
    this.itensNaoSalvados = this.obterTotalItens();

    if (this.itensNaoSalvados !== 0) {
      this.salvandoItens = true;
    } else {
      this.salvandoDocumento = true;
    }

    this.aguardarSalvamentoItens();
  }

  itenFoiSalvo() {
    this.itensNaoSalvados--;

    if (this.itensNaoSalvados === 0) {
      this.salvandoItens = false;
      this.salvandoDocumento = true;
    }
  }

  aguardarSalvamentoItens() {
    setTimeout(() => {
      if (this.salvandoItens) {
        this.aguardarSalvamentoItens();
      } else {
        this.salvarDocumento();
      }
    }, 100);
  }

  salvarDocumento() {
    this.documentoProvider
      .salvarDocumento({
        documentoID: this.documentoID,
        tituloDocumento: this.tituloDocumento,
        secoes: this.secoes
      })
      .subscribe({
        next: () => {
          this.salvandoDocumento = false;
        }
      });
  }

}