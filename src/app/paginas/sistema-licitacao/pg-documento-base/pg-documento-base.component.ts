import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

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
  listaDocumentosBase: DocumentoBase[] = [];

  criandoDocumentoBase = false;

  usuarioNome = 'Usuário ainda não identificado';
  usuarioID = -1;

  constructor(
    private documentoBaseProvider: DocumentoBaseService,
    private router: Router,
    private salvarDados: SalvarDados,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const infoSessao = this.salvarDados.get('infoSessao');
    this.usuarioID = infoSessao['id'];
    this.usuarioNome = infoSessao['nome'];

    this.documentoBaseProvider.listaDocumentosBase().subscribe({
      next: (lista: DocumentoBase[]) => (this.listaDocumentosBase = lista),
    });
  }

  // - Pede ao DocumentoBaseService que seja criado um Documento Base
  // - Acessa a página de criação de Documento Base utilizando o ID devolvido pelo DocumentoBaseService
  criarDocumentoBase() {
    this.documentoBaseProvider.criarDocumentoBase().subscribe({
      next: (res) =>
        this.router.navigate([
          `/sistemaLicitacao/criacaoDocumentoBase/${res.documentoBaseID}`,
        ]),
    });

    this.criandoDocumentoBase = true;
  }

  openDialogExclusaoDocumentoBase(documentoBaseID: string, nomeDocumentoBase: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      nomeDocumentoBase: nomeDocumentoBase,
    };

    const dialogRef = this.dialog.open(ConfirmacaoExclusaoDocumentoBaseDialog, dialogConfig);

    dialogRef.afterClosed().subscribe({
      next: (res) => {
        if (res) {
          this.excluirDocumentoBase(documentoBaseID);
        }
      },
    });
  }

  excluirDocumentoBase(documentoBaseID: string) {
    this.documentoBaseProvider.excluirDocumentoBase(documentoBaseID).subscribe({
      next: (res) => {
        const index = this.listaDocumentosBase.findIndex(
          (docb) => docb.documentoBaseID === res.documentoBaseID
        );
        this.listaDocumentosBase.splice(index, 1);
      },
    });
  }
}

@Component({
  selector: 'confirmacao-exclusao-documento-base-dialog',
  templateUrl: './confirmacao-exclusao-documento-base-dialog.html',
})
export class ConfirmacaoExclusaoDocumentoBaseDialog implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<PgDocumentoBaseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { nomeDocumentoBase: string }
  ) {}

  ngOnInit(): void {}

  confirmarExclusao() {
    this.dialogRef.close(true);
  }
}
