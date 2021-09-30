import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DocumentoBaseService } from 'src/app/providers/sistema-licitacao/documento-base.service';

interface DocumentoBase {
  documentoBaseID: string,
  nomeDocumentoBase: string
}

@Component({
  selector: 'app-pg-documento-base',
  templateUrl: './pg-documento-base.component.html',
  styleUrls: ['./pg-documento-base.component.css'],
})
export class PgDocumentoBaseComponent implements OnInit {
  listaDocumentosBase: { documentoBaseID: string; nomeDocumentoBase: string }[] = [];

  criandoDocumento = false;

  constructor(
    private documentoBaseProvider: DocumentoBaseService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.documentoBaseProvider.listaDocumentosBase().subscribe({
      next: (lista: DocumentoBase[]) => {
        this.listaDocumentosBase = lista;
      }
    });
  }

  // - Pede ao DocumentoBaseService que seja criado um Documento Base
  // - Acessa a página de criação de Documento Base utilizando o ID devolvido pelo DocumentoBaseService
  criarDocumentoBase() {
    this.documentoBaseProvider.criarDocumentoBase().subscribe(
      {
        next: (documentoBaseID: string) => {
          this.route.navigate([`/sistemaLicitacao/criacaoDocumentoBase/${documentoBaseID}`]);
        },
        // error: (err: Error) => {},
        // complete: () => {}
      }
    );

    this.criandoDocumento = true;
  }
}
