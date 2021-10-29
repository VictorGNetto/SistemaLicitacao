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
  nomeDocumento = "Termo de Referência - Compra Direta";
  documentoID = "";
  secoes: Secao[] = [
    {
      nome: '1ª Seção',
      itens: [
        {"tipo":"texto","itemID":"lrpraz"},
        {"tipo":"nota","itemID":"qynupj"},
        {"tipo":"opcoes","itemID":"mgnfyg"},
      ],
    },
    {
      nome: '2ª Seção',
      itens: [
        // { tipo: 'nota', itemID: 'item novo 255' },
        // { tipo: 'texto', itemID: 'item novo 256' },
        // { tipo: 'opcoes', itemID: 'item novo 257' },
      ],
    },
  ];
  secaoSelecionada = 0;

  constructor(private route: ActivatedRoute, private documentoProvider: DocumentoService) { }

  ngOnInit(): void {
    this.documentoID = this.route.snapshot.paramMap.get('documentoID') ?? '';
  
    this.documentoProvider
      .carregarDocumento(this.documentoID)
      .subscribe({
        next: documento => {
          this.nomeDocumento = documento.nomeDocumento;
          this.secoes = documento.secoes;
        }
      });
  }

  // --------------------------------------------------------------------------
  // Funções e Variáveis usadas no processo de salvamento do Documento Base ---
  // --------------------------------------------------------------------------
  salvandoItens = false;

  salvarItens() {
  }

  itenFoiSalvo() {

  }

}
