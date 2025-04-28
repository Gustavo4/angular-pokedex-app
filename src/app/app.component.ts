import { Component, computed, signal } from '@angular/core';
import { POKEMON_LIST } from './pokemon-list.fake';
import { Pokemon } from './pokemon.model';
import { PokemonBorderDirective } from './pokemon-border.directive';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [PokemonBorderDirective, DatePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  pokemonList = signal(POKEMON_LIST);

  size(pokemon: Pokemon) {
    if (pokemon.life <= 15) {
      return 'Petit';
    }
    if (pokemon.life >= 25) {
      return 'Grand';
    }
    return 'Moyen';
  };

  imageSrc = signal('https://assets.pokemon.com/assets/cms2/img/pokedex/detail/025.png');


  incrementLife(pokemon: Pokemon) {
    pokemon.life = pokemon.life + 1;
  }
  decrementLife(pokemon: Pokemon) { 
    pokemon.life = pokemon.life - 1;
  }

}
