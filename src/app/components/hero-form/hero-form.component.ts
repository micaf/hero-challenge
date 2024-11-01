import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ExtendedHero } from '../../models/hero.model';
import { Gender, PowerType, SuperPowers, TeamType } from '../../models/enum';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
@Component({
  selector: 'app-hero-form-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, ReactiveFormsModule, 
    MatSelectModule,
    MatOptionModule,
    MatFormFieldModule, MatInputModule, MatRadioModule],
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.scss'],
})
export class HeroFormComponent implements OnInit {
  heroForm!: FormGroup;
  genderOptions = Object.values(Gender);
  powerTypeOptions = Object.values(SuperPowers);
  teamTypeOptions = Object.values(TeamType);

  constructor(
    public dialogRef: MatDialogRef<HeroFormComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public hero: ExtendedHero | null
  ) { }

  ngOnInit(): void {
    this.heroForm = this.fb.group({
      name: [this.hero?.name || '', Validators.required],
      alias: [this.hero?.alias || ''],
      description: [this.hero?.description || '', Validators.required],
      gender: [this.hero?.gender || '', Validators.required],
      powerNames: [this.hero?.powerNames || ''],
      powersIds: [this.hero?.powersIds || []],
      teamNames: [this.hero?.teamNames || ''],
      teamIds: [this.hero?.teamIds || []],
    });
  }

  onSubmit(): void {
    if (this.heroForm.valid) {
      const heroData: ExtendedHero = {
        ...this.hero,
        ...this.heroForm.value
      };
      this.dialogRef.close(heroData); // Retorna los datos del formulario al confirmar
    }
  }

  onCancel(): void {
    this.dialogRef.close(null); // Cierra el modal sin realizar cambios
  }
}