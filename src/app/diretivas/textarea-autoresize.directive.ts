// Código criado com base no post
// https://medium.com/@chandrahasstvs/building-your-own-text-area-auto-resize-directive-in-angular-bbe3e5144e97

import { Directive, HostListener, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appTextareaAutoresize]',
})
export class TextareaAutoresizeDirective {
  constructor(private elementRef: ElementRef) {}

  @HostListener(':input')
  onInput() {
    this.resize();
  }

  ngOnInit() {
    if (this.elementRef.nativeElement.scrollHeight) {
      setTimeout(() => this.resize());
    }
  }

  resize() {
    this.elementRef.nativeElement.style.height = '0';
    this.elementRef.nativeElement.style.height = (this.elementRef.nativeElement.scrollHeight - 15) + 'px';
  }
}
