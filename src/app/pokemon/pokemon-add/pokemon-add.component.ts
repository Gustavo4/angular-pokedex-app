import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PokemonService } from '../../pokemon.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, of } from 'rxjs';
import { getPokemonColor, Pokemon, POKEMON_RULES } from '../../pokemon.model';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-pokemon-add',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './pokemon-add.component.html',
  styles: ``,
})
export class PokemonAddComponent {
  readonly route = inject(ActivatedRoute);
  readonly router = inject(Router);
  readonly pokemonService = inject(PokemonService);
  readonly pokemonId = Number(this.route.snapshot.paramMap.get('id'));
  readonly pokemonResponse = toSignal(
    this.pokemonService.getPokemonById(this.pokemonId).pipe(
      map((pokemon) => ({ value: pokemon, error: undefined })),
      catchError((error) => of({ value: undefined, error: error })),
    ),
  );
  readonly loading = this.pokemonResponse() === undefined;
  readonly error = this.pokemonResponse()?.error;
  readonly pokemon = this.pokemonResponse()?.value;

  readonly POKEMON_RULES = POKEMON_RULES;

  readonly form = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(POKEMON_RULES.MIN_NAME),
      Validators.maxLength(POKEMON_RULES.MAX_NAME),
      Validators.pattern(POKEMON_RULES.NAME_PATTERN),
    ]),
    picture: new FormControl('', [Validators.required]),
    life: new FormControl(10),
    damage: new FormControl(1),
    types: new FormControl(
      [new FormControl('Normal')],
      [
        Validators.required,
        Validators.minLength(POKEMON_RULES.MIN_TYPES),
        Validators.maxLength(POKEMON_RULES.MAX_TYPES),
      ],
    ),
  });

  get pokemonPicture(): FormControl {
    return this.form.get('picture') as FormControl;
  }

  get pokemonName(): FormControl {
    return this.form.get('name') as FormControl;
  }

  get pokemonLife(): FormControl {
    return this.form.get('life') as FormControl;
  }

  get pokemonDamage(): FormControl {
    return this.form.get('damage') as FormControl;
  }

  incrementLife() {
    const newValue = this.pokemonLife.value + 1;
    this.pokemonLife.setValue(newValue);
  }

  decrementLife() {
    const newValue = this.pokemonLife.value - 1;
    this.pokemonLife.setValue(newValue);
  }

  incrementDamage() {
    const newValue = this.pokemonDamage.value + 1;
    this.pokemonDamage.setValue(newValue);
  }

  decrementDamage() {
    const newValue = this.pokemonDamage.value - 1;
    this.pokemonDamage.setValue(newValue);
  }

  get pokemonTypeList(): FormArray {
    return this.form.get('types') as FormArray;
  }

  isPokemonTypeSelected(type: string): boolean {
    return !!this.pokemonTypeList.controls.find(
      (control) => control.value === type,
    );
  }

  onPokemonTypeChange(type: string, isChecked: boolean) {
    if (isChecked) {
      const control = new FormControl(type);
      this.pokemonTypeList.push(control);
    } else {
      const index = this.pokemonTypeList.controls
        .map((control) => control.value)
        .indexOf(type);
      this.pokemonTypeList.removeAt(index);
    }
  }

  getPokemonColor(type: string): string {
    return getPokemonColor(type);
  }

  getChipTextColor(type: string): 'black' | 'white' {
    return type === 'Electrik' ? 'black' : 'white';
  }

  onSubmit() {
    Object.values(this.form.controls).forEach((control) =>
      control.markAsDirty(),
    );

    if (this.form.invalid) {
      return;
    }

    const pokemon: Omit<Pokemon, 'id'> = {
      name: this.pokemonName.value,
      picture: this.pokemonPicture.value,
      life: this.pokemonLife.value,
      damage: this.pokemonDamage.value,
      types: this.pokemonTypeList.controls.map((control) => control.value) as [
        string,
        string,
        string,
      ],
      created: new Date(),
    };

    this.pokemonService.addPokemon(pokemon).subscribe((pokemonAdded) => {
      this.router.navigate(['/pokemons', pokemonAdded.id]);
    });
  }
}
