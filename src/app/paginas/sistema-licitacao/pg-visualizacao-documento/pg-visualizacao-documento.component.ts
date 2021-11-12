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

interface ParagrafoSEI {
  tipo: string;
  conteudo: any;
}

@Component({
  selector: 'app-pg-visualizacao-documento',
  templateUrl: './pg-visualizacao-documento.component.html',
  styleUrls: ['./pg-visualizacao-documento.component.css'],
})
export class PgVisualizacaoDocumentoComponent implements OnInit {
  nomeDocumento = '';
  documentoID = '';
  paragrafosSEI: ParagrafoSEI[] = [];

  constructor(
    private route: ActivatedRoute,
    private documentoProvider: DocumentoService
  ) {}

  ngOnInit(): void {
    this.documentoID = this.route.snapshot.paramMap.get('documentoID') ?? '';

    this.documentoProvider.carregarDocumento(this.documentoID).subscribe({
      next: (documento) => {
        this.nomeDocumento = documento.nomeDocumento;
        for (const secao of documento.secoes) {
          this.paragrafosSEI.push({
            tipo: 'nomeSecao',
            conteudo: secao.nome,
          });

          for (const item of secao.itens) {
            this.paragrafosSEI.push({
              tipo: 'item',
              conteudo: item,
            });
          }
        }
      },
    });
  }
}
