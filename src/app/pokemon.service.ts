import { Injectable } from '@angular/core';
import { POKEMON_LIST } from './pokemon-list.fake';
import { PokemonList } from './pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  getPokemonList(): PokemonList {
    return POKEMON_LIST;
  } 

  getPokemonById(id: number) {
    const pokemon = POKEMON_LIST.find(pokemon => pokemon.id === id);

    if (!pokemon) {
      throw new Error(`No Pokemon found with id ${id}`); 
    }
    
    return pokemon;
  }

  getPokemonTypeList(): string[] {  
    return [
      'Feu',
      'Eau',
      'Plante',
      'Electrik',
      'Vol',
      'Poison',
      'Insecte',
      'Normal',
      'Fée',
    ];
  }
}
