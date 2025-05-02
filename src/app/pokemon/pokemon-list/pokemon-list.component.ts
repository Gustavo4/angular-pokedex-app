import { Component, computed, inject, signal } from '@angular/core';
import { Pokemon } from '../../pokemon.model';
import { PokemonService } from '../../pokemon.service';
import { PokemonBorderDirective } from '../../pokemon-border.directive';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-pokemon-list',
  imports: [PokemonBorderDirective, DatePipe],
  templateUrl: './pokemon-list.component.html',
  styles: ``
})
export class PokemonListComponent {
  readonly #pokemonService = inject(PokemonService);
  pokemonList = signal(this.#pokemonService.getPokemonList());
  readonly searchTerm = signal('');

  readonly pokemonListFiltered = computed(() => {
    const searchTerm = this.searchTerm();
    const pokemonList = this.#pokemonService.getPokemonList();

    return pokemonList.filter(pokemon => 
      pokemon.name.toLowerCase().includes(searchTerm.trim().toLowerCase()));
  });

  size(pokemon: Pokemon) {
    if (pokemon.life <= 15) {
      return 'Petit';
    }
    if (pokemon.life >= 25) {
      return 'Grand';
    }
    return 'Moyen';
  };
  
  incrementLife(pokemon: Pokemon) {
    pokemon.life = pokemon.life + 1;
  }

  decrementLife(pokemon: Pokemon) { 
    pokemon.life = pokemon.life - 1;
  }
  
}
