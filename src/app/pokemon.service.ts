import { Injectable } from '@angular/core';
import { Pokemon, PokemonList } from './pokemon.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class PokemonService {
  abstract getPokemonList(): Observable<PokemonList>;

  abstract getPokemonById(id: number): Observable<Pokemon>;

  abstract updatePokemon(pokemon: Pokemon): Observable<Pokemon>;

  abstract deletePokemon(id: number): Observable<void>;

  abstract addPokemon(pokemon: Omit<Pokemon, 'id'>): Observable<Pokemon>;

  abstract getPokemonTypeList(): string[];
}
