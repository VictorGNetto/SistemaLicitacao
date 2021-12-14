import { Component, OnInit } from '@angular/core';

import { SalvarDados } from 'src/app/classes/salvar-dados';
import { DocumentoService } from 'src/app/providers/sistema-licitacao/documento.service';

interface Documento {
  documentoID: string;
  identificacao: string;
  status: 'Em Edição' | 'Em Análise' | 'Aprovado';
  criacao: string;
  edicao: string;

  // informações relacionadas ao botão de estado (que altera o estado do Documento)
  classeCssBotaoEstado?:
    | 'btn-estado-edicao'
    | 'btn-estado-analise'
    | 'btn-estado-aprovado';
  titleBotaoEstado?:
    | 'Enviar Documento para análise'
    | 'Documento em análise'
    | 'Documento aprovado';
}

@Component({
  selector: 'app-pg-analise-documento',
  templateUrl: './pg-analise-documento.component.html',
  styleUrls: ['./pg-analise-documento.component.css'],
})
export class PgAnaliseDocumentoComponent implements OnInit {
  listaDocumentos: Documento[] = [];

  usuarioNome = 'Usuário ainda não identificado';
  usuarioID = -1;

  // Variáveis usadas na busca de um Documento pelo seu código
  codigo = "";
  documentoBuscado?: Documento;

  constructor(
    private salvarDados: SalvarDados,
    private documentoProvider: DocumentoService
  ) {}

  ngOnInit(): void {
    const infoSessao = this.salvarDados.get('infoSessao');
    this.usuarioID = infoSessao['id'];
    this.usuarioNome = infoSessao['nome'];

    this.documentoProvider.listaDocumentosPorStatus('Em Análise').subscribe({
      next: (lista: Documento[]) => {
        this.listaDocumentos = lista;

        for (const doc of this.listaDocumentos) {
          doc.classeCssBotaoEstado = this.statusToClasseCssBotaoEstado(
            doc.status
          );
          doc.titleBotaoEstado = this.statusToTitleBotaoEstado(doc.status);
        }
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

  mudarStatus(documentoID: string, status: 'Em Edição' | 'Em Análise' | 'Aprovado') {
    this.documentoProvider.mudarStatus(documentoID, status).subscribe({
      next: (res) => {
        const index = this.listaDocumentos.findIndex(
          (doc) => doc.documentoID === documentoID
        );
        const status = res.status;
        this.listaDocumentos[index].status = status;
        this.listaDocumentos[index].classeCssBotaoEstado =
          this.statusToClasseCssBotaoEstado(status);
        this.listaDocumentos[index].titleBotaoEstado =
          this.statusToTitleBotaoEstado(status);
      },
    });
  }

  buscarDocumento(documentoID: string) {
    this.documentoProvider.buscarDocumento(documentoID).subscribe({
      next: (res) => {
        this.documentoBuscado = res;
      }
    });
  }
}
