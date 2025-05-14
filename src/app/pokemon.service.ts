import { inject, Injectable } from '@angular/core';
import { POKEMON_LIST } from './pokemon-list.fake';
import { Pokemon, PokemonList } from './pokemon.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  readonly #http = inject(HttpClient);
  readonly #POKEMON_API_URL = 'http://localhost:3000/pokemons';

  getPokemonList(): Observable<PokemonList> {
    return this.#http.get<PokemonList>(this.#POKEMON_API_URL);
  }

  getPokemonById(id: number): Observable<Pokemon> {
    const url = this.#POKEMON_API_URL + '/' + id;
    return this.#http.get<Pokemon>(url);
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
