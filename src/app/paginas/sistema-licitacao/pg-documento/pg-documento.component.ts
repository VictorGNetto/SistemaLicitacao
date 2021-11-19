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
import { SeiService } from 'src/app/providers/sistema-licitacao/sei.service';

interface Documento {
  documentoID: string;
  identificacao: string;
  status: 'Em Edição' | 'Em Análise' | 'Aprovado';
  criacao: string;
  edicao: string;
}

@Component({
  selector: 'app-pg-documento',
  templateUrl: './pg-documento.component.html',
  styleUrls: ['./pg-documento.component.css'],
})
export class PgDocumentoComponent implements OnInit {
  listaDocumentosEmEdicao: Documento[] = [];
  listaDocumentosEmAnalise: Documento[] = [];
  listaDocumentosAprovados: Documento[] = [];

  usuarioNome = 'Usuário ainda não identificado';
  usuarioID = -1;

  criandoDocumento = false;

  constructor(
    private salvarDados: SalvarDados,
    public dialog: MatDialog,
    private documentoProvider: DocumentoService,
    private seiProvider: SeiService
  ) {}

  ngOnInit(): void {
    const infoSessao = this.salvarDados.get('infoSessao');
    this.usuarioID = infoSessao['id'];
    this.usuarioNome = infoSessao['nome'];

    this.documentoProvider.listaDocumentosPorAutor(this.usuarioID).subscribe({
      next: (lista: Documento[]) => {
        this.listaDocumentosEmEdicao = lista.filter(
          (doc) => doc.status === 'Em Edição'
        );
        this.listaDocumentosEmAnalise = lista.filter(
          (doc) => doc.status === 'Em Análise'
        );
        this.listaDocumentosAprovados = lista.filter(
          (doc) => doc.status === 'Aprovado'
        );
      },
    });
  }

  statusToClasseCssBotaoEstado(
    status: 'Em Edição' | 'Em Análise' | 'Aprovado'
  ) {
    switch (status) {
      case 'Em Edição':
        return 'btn-estado-edicao';
      case 'Em Análise':
        return 'btn-estado-analise';
      case 'Aprovado':
        return 'btn-estado-aprovado';
    }
  }

  statusToTitleBotaoEstado(status: 'Em Edição' | 'Em Análise' | 'Aprovado') {
    switch (status) {
      case 'Em Edição':
        return 'Enviar Documento para análise';
      case 'Em Análise':
        return 'Documento em análise';
      case 'Aprovado':
        return 'Documento aprovado';
    }
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

    const dialogRef = this.dialog.open(
      ConfirmacaoExclusaoDocumentoDialog,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe({
      next: (res) => {
        if (res) {
          this.excluirDocumento(documentoID);
        }
      },
    });
  }

  excluirDocumento(documentoID: string) {
    this.documentoProvider.excluirDocumento(documentoID).subscribe({
      next: (res) => {
        const index = this.listaDocumentosEmEdicao.findIndex(
          (doc) => doc.documentoID === res.documentoID
        );
        this.listaDocumentosEmEdicao.splice(index, 1);
      },
    });
  }

  enviarDocumentoParaAnalise(documentoID: string) {
    this.documentoProvider.mudarStatus(documentoID, 'Em Análise').subscribe({
      next: (res) => {
        const index = this.listaDocumentosEmEdicao.findIndex(
          (doc) => doc.documentoID === documentoID
        );

        // altera o status do documento
        this.listaDocumentosEmEdicao[index].status = res.status;

        // insere o documento no início da lista de Documentos Em Análise
        this.listaDocumentosEmAnalise.splice(
          0,
          0,
          this.listaDocumentosEmEdicao[index]
        );

        // remove o documento da lista de Documentos Em Edição
        this.listaDocumentosEmEdicao.splice(index, 1);
      },
    });
  }

  downloadArquivo(conteudoArquivo: string, nomeArquivo: string) {
    const blob = new Blob([conteudoArquivo], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);

    let a = document.createElement('a');
    document.body.appendChild(a);
    a.setAttribute('style', 'display: none');
    a.href = url;
    a.download = nomeArquivo;
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }

  exportarDocumento(documentoID: string) {
    this.seiProvider.exportarDocumento(documentoID).subscribe({
      next: (res) => {
        this.downloadArquivo(res.conteudo, res.nome + '.txt');
      }
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
    @Inject(MAT_DIALOG_DATA) public data: { identificacao: string }
  ) {}

  ngOnInit(): void {}

  confirmarExclusao() {
    this.dialogRef.close(true);
  }
}
