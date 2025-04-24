import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appPokemonBorder]'
})
export class PokemonBorderDirective {

  private initialColor: string;

  constructor(private el: ElementRef) { 
    this.initialColor = this.el.nativeElement.style.borderColor;
    this.el.nativeElement.style.borderWidhth = '2px';
  }

  @HostListener('mouseenter') onMouseEnter() {
    const color = 'green';
    this.setBorderColor(color);
  }

  @HostListener('mouseleave') onMouseLeave() {
    const color = this.initialColor;
    this.setBorderColor(color);
  }

  private setBorderColor(color: string) {
    this.el.nativeElement.style.borderColor = color;
  }

}
