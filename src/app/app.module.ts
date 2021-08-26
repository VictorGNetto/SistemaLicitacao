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
import {MatTabsModule} from '@angular/material/tabs';
import {MatRadioModule} from '@angular/material/radio';
import {MatIconModule} from '@angular/material/icon';

import { PgcompradiretaComponent } from './paginas/pgcompradireta/pgcompradireta.component';
import { MetadadosdocumentoComponent } from './paginas/componentes/sistemalicitacao/metadadosdocumento/metadadosdocumento.component';
import { InfoComponent } from './paginas/componentes/sistemalicitacao/info/info.component';

const appRoutes: Routes  = [
  { path: '', redirectTo: '/compraDireta', pathMatch: 'full' },
  { path: 'compraDireta', component: PgcompradiretaComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    PgcompradiretaComponent,
    MetadadosdocumentoComponent,
    InfoComponent
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
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
