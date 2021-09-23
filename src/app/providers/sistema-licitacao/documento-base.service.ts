import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DocumentoBaseService {

  constructor() { }

  // - Requisita ao servidor que seja criado um Documento Base
  // - Espera do servidor o ID do Documento Base criado
  // - Retorna o ID
  criaDocumentoBase(): string {
    return "abc-defg-hij";
  }
}
