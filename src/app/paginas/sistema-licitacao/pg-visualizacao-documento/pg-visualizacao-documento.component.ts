import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SeiService } from 'src/app/providers/sistema-licitacao/sei.service';

@Component({
  selector: 'app-pg-visualizacao-documento',
  templateUrl: './pg-visualizacao-documento.component.html',
  styleUrls: ['./pg-visualizacao-documento.component.css'],

  // Permite que o CSS definido no arquivo acima afete todos os elementos da página.
  // Como o HTML do documento SEI é obtido já com todas as classes configuradas
  // adequadamente, é exatamente essa opção de encapsulamento de CSS que queremos.
  encapsulation: ViewEncapsulation.None,
})
export class PgVisualizacaoDocumentoComponent implements OnInit {
  documentoSEI = '';

  constructor(private route: ActivatedRoute, private seiProvider: SeiService) {}

  ngOnInit(): void {
    const documentoID = this.route.snapshot.paramMap.get('documentoID') ?? '';

    this.seiProvider.exportarDocumento(documentoID).subscribe({
      next: (res) => (this.documentoSEI = res.conteudo),
    });
  }
}
