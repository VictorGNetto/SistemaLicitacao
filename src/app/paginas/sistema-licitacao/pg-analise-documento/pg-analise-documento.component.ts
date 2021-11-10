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

  constructor(
    private salvarDados: SalvarDados,
    private documentoProvider: DocumentoService
  ) {}

  ngOnInit(): void {
    const infoSessao = this.salvarDados.get('infoSessao');
    this.usuarioID = infoSessao['id'];
    this.usuarioNome = infoSessao['nome'];

    this.documentoProvider.listaDocumentos(this.usuarioID).subscribe({
      next: (lista: Documento[]) => {
        this.listaDocumentos = lista;

        for (const doc of this.listaDocumentos) {
          if (doc.status === "Em Edição") {
            doc.classeCssBotaoEstado = 'btn-estado-edicao';
            doc.titleBotaoEstado = 'Enviar Documento para análise';
          } else if (doc.status === "Em Análise") {
            doc.classeCssBotaoEstado = 'btn-estado-analise';
            doc.titleBotaoEstado = 'Documento em análise';
          } else {
            doc.classeCssBotaoEstado = 'btn-estado-aprovado';
            doc.titleBotaoEstado = 'Documento aprovado';
          }
        }
      },
    });
  }
}
