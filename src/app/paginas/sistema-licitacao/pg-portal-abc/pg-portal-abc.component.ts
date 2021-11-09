import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pg-portal-abc',
  templateUrl: './pg-portal-abc.component.html'
})
export class PgPortalAbcComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.location.href = "http://10.6.56.199/portal";
  }

}
