import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pg-visualizacao-documento',
  templateUrl: './pg-visualizacao-documento.component.html',
  styleUrls: ['./pg-visualizacao-documento.component.css']
})
export class PgVisualizacaoDocumentoComponent implements OnInit {
  documentoID = "";

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.documentoID = this.route.snapshot.paramMap.get('documentoID') ?? '';
  }

}
