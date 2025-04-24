import { Directive, ElementRef, HostListener, input } from '@angular/core';

@Directive({
  selector: '[appPokemonBorder]'
})
export class PokemonBorderDirective {

  private initialColor: string;
  pokemonType = input('');

  constructor(private el: ElementRef) { 
    this.initialColor = this.el.nativeElement.style.borderColor;
    this.el.nativeElement.style.borderWidhth = '2px';
  }

  @HostListener('mouseenter') onMouseEnter() {
    const color = this.getBorderColor();
    this.setBorderColor(color);
  }

  @HostListener('mouseleave') onMouseLeave() {
    const color = this.initialColor;
    this.setBorderColor(color);
  }

  private setBorderColor(color: string) {
    this.el.nativeElement.style.borderColor = color;
  }

private getBorderColor(): string {
    switch (this.pokemonType()) {
      case 'Feu':
        return '#EF5350';
      case 'Eau':
        return '#42A5F5';
      case 'Plante':
        return '#66BB6A';
      case 'Insecte':
        return '#8d6e63';
      case 'Vol':
        return '#90CAF9';
      case 'Poison':
        return '#b388ff';
      case 'Fée':
        return '#f8bbd0';
      case 'Electrik':
        return '#f4ff81';
      default:
        return '#303030';
    }
  }

}
