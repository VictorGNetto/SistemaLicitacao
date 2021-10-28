import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DocumentoBaseService } from 'src/app/providers/sistema-licitacao/documento-base.service';
import { SalvarDados } from 'src/app/classes/salvar-dados';

interface DocumentoBase {
  documentoBaseID: string;
  nomeDocumentoBase: string;
}

@Component({
  selector: 'app-pg-documento-base',
  templateUrl: './pg-documento-base.component.html',
  styleUrls: ['./pg-documento-base.component.css'],
})
export class PgDocumentoBaseComponent implements OnInit {
  listaDocumentosBase: {
    documentoBaseID: string;
    nomeDocumentoBase: string;
  }[] = [];

  criandoDocumentoBase = false;

  usuarioNome = 'Usuário ainda não identificado';
  usuarioID = -1;

  constructor(
    private documentoBaseProvider: DocumentoBaseService,
    private router: Router,
    private salvarDados: SalvarDados
  ) {}

  ngOnInit(): void {
    const infoSessao = this.salvarDados.get('infoSessao');
    this.usuarioID = infoSessao['id'];
    this.usuarioNome = infoSessao['nome'];

    this.documentoBaseProvider.listaDocumentosBase().subscribe({
      next: (lista: DocumentoBase[]) => {
        this.listaDocumentosBase = lista;
      },
    });
  }

  // - Pede ao DocumentoBaseService que seja criado um Documento Base
  // - Acessa a página de criação de Documento Base utilizando o ID devolvido pelo DocumentoBaseService
  criarDocumentoBase() {
    this.documentoBaseProvider.criarDocumentoBase().subscribe({
      next: documentoBaseID =>
        this.router.navigate([
          `/sistemaLicitacao/criacaoDocumentoBase/${documentoBaseID}`,
        ]),
    });

    this.criandoDocumentoBase = true;
  }
}
