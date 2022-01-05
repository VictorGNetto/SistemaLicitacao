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
import { MatSnackBar } from '@angular/material/snack-bar';

interface DocumentoBase {
  documentoBaseID: string;
  identificacaoDocumentoBase: string;
}

@Component({
  selector: 'app-pg-documento-base',
  templateUrl: './pg-documento-base.component.html',
  styleUrls: ['./pg-documento-base.component.css'],
})
export class PgDocumentoBaseComponent implements OnInit {
  listaDocumentosBase: DocumentoBase[] = [];
  listaDocumentosBaseFiltrados: DocumentoBase[] = [];
  filtro: string = '';

  criandoDocumentoBase = false;

  constructor(
    private documentoBaseProvider: DocumentoBaseService,
    private router: Router,
    private salvarDados: SalvarDados,
    public dialog: MatDialog,
    private _snackBarCriacaoDocumentoBase: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.documentoBaseProvider.listaDocumentosBase().subscribe({
      next: (lista: DocumentoBase[]) => {
        this.listaDocumentosBase = lista;
        this.listaDocumentosBaseFiltrados = lista;
      },
    });
  }

  // - Pede ao DocumentoBaseService que seja criado um Documento Base
  // - Acessa a página de criação de Documento Base utilizando o ID devolvido pelo DocumentoBaseService
  criarDocumentoBase() {
    this._snackBarCriacaoDocumentoBase.open('Criando Documento Base');
    this.documentoBaseProvider.criarDocumentoBase().subscribe({
      next: (res) => {
        this._snackBarCriacaoDocumentoBase.dismiss();
        this.router.navigate([`/criacaoDocumentoBase/${res.documentoBaseID}`]);
      },
    });

    this.criandoDocumentoBase = true;
  }

  filtrarListaDocumentosBase() {
    const filtro = this.filtro.trim().toLowerCase();
    this.listaDocumentosBaseFiltrados = this.listaDocumentosBase.filter(
      (e) => e.identificacaoDocumentoBase.toLowerCase().indexOf(filtro) >= 0
    );
  }

  openDialogExclusaoDocumentoBase(
    documentoBaseID: string,
    nomeDocumentoBase: string
  ) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      nomeDocumentoBase: nomeDocumentoBase,
    };

    const dialogRef = this.dialog.open(
      ConfirmacaoExclusaoDocumentoBaseDialog,
      dialogConfig
    );

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

  clonarDocumentoBase(documentoBaseID: string) {
    this._snackBarCriacaoDocumentoBase.open('Clonando Documento Base');
    this.documentoBaseProvider.clonarDocumentoBase(documentoBaseID).subscribe({
      next: (res) => {
        this._snackBarCriacaoDocumentoBase.dismiss();
        this.router.navigate([`/criacaoDocumentoBase/${res.documentoBaseID}`]);
      },
    });

    this.criandoDocumentoBase = true;
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
