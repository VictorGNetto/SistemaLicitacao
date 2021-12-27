import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';

// Páginas do sistema
import { PgSistemaLicitacaoComponent } from './paginas/sistema-licitacao/pg-sistema-licitacao/pg-sistema-licitacao.component';
import { PgDocumentoBaseComponent } from './paginas/sistema-licitacao/pg-documento-base/pg-documento-base.component';
import { PgCriacaoDocumentoBaseComponent } from './paginas/sistema-licitacao/pg-criacao-documento-base/pg-criacao-documento-base.component';
import { PgPreenchimentoDocumentoComponent } from './paginas/sistema-licitacao/pg-preenchimento-documento/pg-preenchimento-documento.component';

import { ItemNotaComponent } from './paginas/sistema-licitacao/componentes/item-nota/item-nota.component';
import { ItemTextoComponent } from './paginas/sistema-licitacao/componentes/item-texto/item-texto.component';
import { ItemOpcoesComponent } from './paginas/sistema-licitacao/componentes/item-opcoes/item-opcoes.component';
import { TextareaAutoresizeDirective } from './diretivas/textarea-autoresize.directive';
import { PgEntradaSistemaLicitacaoComponent } from './paginas/sistema-licitacao/pg-entrada-sistema-licitacao/pg-entrada-sistema-licitacao.component';
import { PgEntradaSistemaLicitacaoAdminComponent } from './paginas/sistema-licitacao/pg-entrada-sistema-licitacao-admin/pg-entrada-sistema-licitacao-admin.component';
import { PgDocumentoComponent } from './paginas/sistema-licitacao/pg-documento/pg-documento.component';
import { ListaDocumentoBaseDialog } from './paginas/sistema-licitacao/pg-documento/pg-documento.component';
import { ConfirmacaoExclusaoDocumentoBaseDialog } from './paginas/sistema-licitacao/pg-documento-base/pg-documento-base.component';
import { ConfirmacaoExclusaoDocumentoDialog } from './paginas/sistema-licitacao/pg-documento/pg-documento.component';
import { PgPortalAbcComponent } from './paginas/sistema-licitacao/pg-portal-abc/pg-portal-abc.component';
import { PgAnaliseDocumentoComponent } from './paginas/sistema-licitacao/pg-analise-documento/pg-analise-documento.component';
import { PgVisualizacaoDocumentoComponent } from './paginas/sistema-licitacao/pg-visualizacao-documento/pg-visualizacao-documento.component';
import { ItemListaComponent } from './paginas/sistema-licitacao/componentes/item-lista/item-lista.component';
import { CorrecoesComponent } from './paginas/sistema-licitacao/componentes/correcoes/correcoes.component';
import { PgDocumentacaoDocumentosComponent } from './paginas/sistema-licitacao/pg-documentacao-documentos/pg-documentacao-documentos.component';
import { PgDocumentacaoDocumentosBaseComponent } from './paginas/sistema-licitacao/pg-documentacao-documentos-base/pg-documentacao-documentos-base.component';
import { PgDocumentacaoAnaliseDocumentosComponent } from './paginas/sistema-licitacao/pg-documentacao-analise-documentos/pg-documentacao-analise-documentos.component';

const appRoutes: Routes = [
  {
    path: 'entradaSistemaLicitacao',
    component: PgEntradaSistemaLicitacaoComponent,
  },
  {
    path: 'entradaSistemaLicitacaoAdmin',
    component: PgEntradaSistemaLicitacaoAdminComponent,
  },
  {
    path: '',
    component: PgSistemaLicitacaoComponent,
  },
  {
    path: 'documento',
    component: PgDocumentoComponent,
  },
  {
    path: 'documentoBase',
    component: PgDocumentoBaseComponent,
  },
  {
    path: 'analiseDocumento',
    component: PgAnaliseDocumentoComponent,
  },
  {
    path: 'criacaoDocumentoBase/:documentoBaseID',
    component: PgCriacaoDocumentoBaseComponent,
  },
  {
    path: 'preenchimentoDocumento/:documentoID',
    component: PgPreenchimentoDocumentoComponent,
  },
  {
    path: 'visualizacaoDocumento/:documentoID',
    component: PgVisualizacaoDocumentoComponent,
  },
  {
    path: 'portalABC',
    component: PgPortalAbcComponent,
  },
  {
    path: 'documentacao/documentos',
    component: PgDocumentacaoDocumentosComponent,
  },
  {
    path: 'documentacao/documentosBase',
    component: PgDocumentacaoDocumentosBaseComponent,
  },
  {
    path: 'documentacao/analiseDocumentos',
    component: PgDocumentacaoAnaliseDocumentosComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    PgCriacaoDocumentoBaseComponent,
    PgPreenchimentoDocumentoComponent,
    ItemNotaComponent,
    ItemTextoComponent,
    ItemOpcoesComponent,
    PgSistemaLicitacaoComponent,
    PgDocumentoBaseComponent,
    TextareaAutoresizeDirective,
    PgEntradaSistemaLicitacaoComponent,
    PgDocumentoComponent,
    ListaDocumentoBaseDialog,
    ConfirmacaoExclusaoDocumentoBaseDialog,
    ConfirmacaoExclusaoDocumentoDialog,
    PgPortalAbcComponent,
    PgAnaliseDocumentoComponent,
    PgVisualizacaoDocumentoComponent,
    ItemListaComponent,
    CorrecoesComponent,
    PgDocumentacaoDocumentosComponent,
    PgDocumentacaoDocumentosBaseComponent,
    PgDocumentacaoAnaliseDocumentosComponent,
    PgEntradaSistemaLicitacaoAdminComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTabsModule,
    MatRadioModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatSnackBarModule,
    MatInputModule,
    RouterModule.forRoot(appRoutes, {
      enableTracing: true,
      anchorScrolling: 'enabled',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
