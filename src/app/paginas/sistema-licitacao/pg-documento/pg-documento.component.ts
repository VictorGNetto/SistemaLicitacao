import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Router } from '@angular/router';

import { DocumentoBaseService } from 'src/app/providers/sistema-licitacao/documento-base.service';
import { SalvarDados } from 'src/app/classes/salvar-dados';
import { DocumentoService } from 'src/app/providers/sistema-licitacao/documento.service';

interface Documento {
  documentoID: string;
  identificacao: string;
  status: string;
  criacao: string;
  edicao: string;
}

@Component({
  selector: 'app-pg-documento',
  templateUrl: './pg-documento.component.html',
  styleUrls: ['./pg-documento.component.css'],
})
export class PgDocumentoComponent implements OnInit {
  listaDocumentos: Documento[] = [];

  usuarioNome = 'Usuário ainda não identificado';
  usuarioID = -1;

  criandoDocumento = false;

  constructor(
    private salvarDados: SalvarDados,
    public dialog: MatDialog,
    private documentoProvider: DocumentoService
  ) {}

  ngOnInit(): void {
    const infoSessao = this.salvarDados.get('infoSessao');
    this.usuarioID = infoSessao['id'];
    this.usuarioNome = infoSessao['nome'];

    this.documentoProvider.listaDocumentos(this.usuarioID).subscribe({
      next: (lista: Documento[]) => (this.listaDocumentos = lista),
    });
  }

  openDialogCriacaoDocumento() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.width = '400px';
    dialogConfig.closeOnNavigation = true;

    const dialogRef = this.dialog.open(ListaDocumentoBaseDialog, dialogConfig);

    dialogRef.afterClosed().subscribe({
      next: (data) => {
        if (data) {
          this.criandoDocumento = true;
        }
      },
    });
  }

  openDialogExclusaoDocumento(documentoID: string, identificacao: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      identificacao: identificacao,
    };

    const dialogRef = this.dialog.open(ConfirmacaoExclusaoDocumentoDialog, dialogConfig);

    dialogRef.afterClosed().subscribe({
      next: (res) => {
        if (res) {
          this.excluirDocumento(documentoID);
        }
      }
    });
  }

  excluirDocumento(documentoID: string) {
    this.documentoProvider.excluirDocumento(documentoID).subscribe({
      next: (res) => {
        const index = this.listaDocumentos.findIndex(
          (doc) => doc.documentoID === res.documentoID
        );
        this.listaDocumentos.splice(index, 1);
      },
    });
  }
}

@Component({
  selector: 'lista-documento-base-dialog',
  templateUrl: './lista-documento-base-dialog.html',
})
export class ListaDocumentoBaseDialog implements OnInit {
  documentoBaseEscolhido = '';
  listaDocumentosBase: {
    documentoBaseID: string;
    nomeDocumentoBase: string;
  }[] = [];

  constructor(
    private dialogRef: MatDialogRef<PgDocumentoComponent>,
    private documentoBaseProvider: DocumentoBaseService,
    private documentoProvider: DocumentoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.documentoBaseProvider.listaDocumentosBase().subscribe({
      next: (lista) => (this.listaDocumentosBase = lista),
    });
  }

  criarDocumento() {
    this.documentoProvider
      .criarDocumento(this.documentoBaseEscolhido)
      .subscribe({
        next: (res) =>
          this.router.navigate([
            `/sistemaLicitacao/preenchimentoDocumento/${res.documentoID}`,
          ]),
      });

    this.dialogRef.close({ criandoDocumento: true });
  }
}

@Component({
  selector: 'confirmacao-exclusao-documento-dialog',
  templateUrl: './confirmacao-exclusao-documento-dialog.html',
})
export class ConfirmacaoExclusaoDocumentoDialog implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<PgDocumentoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { identificao: string }
  ) {}

  ngOnInit(): void {}

  confirmarExclusao() {
    this.dialogRef.close(true);
  }
}