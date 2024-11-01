import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExtendedHero } from '../../models/hero.model';
import { Gender, PowerType } from '../../models/enum'; // Importa los enums

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.scss']
})
export class HeroFormComponent implements OnInit {
  hero?: ExtendedHero;
  @Output() formSubmit = new EventEmitter<ExtendedHero>();

  heroForm!: FormGroup;
  genderOptions = Object.values(Gender); // Usa el enum Gender
  powerTypeOptions = Object.values(PowerType); // Usa el enum PowerType

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.heroForm = this.fb.group({
      name: [this.hero?.name || '', Validators.required],
      alias: [this.hero?.alias || ''],
      description: [this.hero?.description || '', Validators.required],
      gender: [this.hero?.gender || '', Validators.required],
      powerType: [this.hero?.powerNames || ''], // Añade el tipo de poder
      powersIds: [this.hero?.powersIds || []],
      teamType: [this.hero?.powerNames || ''], // Añade el team
      teamIds: [this.hero?.teamIds || []],
    });
  }

  onSubmit(): void {
    if (this.heroForm.valid) {
      const heroData: ExtendedHero = {
        ...this.hero,
        ...this.heroForm.value
      };
      this.formSubmit.emit(heroData);
    }
  }

  onCancel() {

  }
}
