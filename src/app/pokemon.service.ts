import { inject, Injectable } from '@angular/core';
import { POKEMON_LIST } from './pokemon-list.fake';
import { PokemonList } from './pokemon.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  readonly #http = inject(HttpClient);
  getPokemonList(): PokemonList {
    return POKEMON_LIST;
  }

  getPokemonById(id: number) {
    const pokemon = POKEMON_LIST.find((pokemon) => pokemon.id === id);

    if (!pokemon) {
      throw new Error(`No Pokemon found with id ${id}`);
    }

    return pokemon;
  }

  getPokemonTypeList(): string[] {
    return [
      'Plante',
      'Feu',
      'Eau',
      'Insecte',
      'Normal',
      'Electrik',
      'Poison',
      'Fée',
      'Vol',
    ];
  }
}
