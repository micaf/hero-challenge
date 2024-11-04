import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ExtendedHero } from '../../models/hero.model';
import { Gender } from '../../models/enum';
import { PowerService } from '../../services/power.service';
import { Power } from '../../models/power.model';
import { Team } from '../../models/team.model';
import { TeamService } from '../../services/team.service';
import { MaterialModule } from '../../shared/material.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Component for displaying a form to add or edit a hero.
 * 
 * This component displays a form with fields for hero information,
 * allowing users to input the name, alias, description, gender, powers, and teams of a hero.
 */
@Component({
  selector: 'app-hero-form-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule],
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.scss'],
})
export class HeroFormComponent implements OnInit {
  /** Form group for the hero form */
  heroForm!: FormGroup;

  /** Options for the gender field, based on the `Gender` enum */
  genderOptions = Object.values(Gender);

  /** Available team options populated from the service */
  teamTypeOptions: Team[] = [];

  /** Available power options populated from the service */
  powerTypeOptions: Power[] = [];

  /**
   * Constructor for HeroFormComponent.
   *
   * @param dialogRef - Reference to the open dialog managing this component.
   * @param fb - FormBuilder for managing reactive forms.
   * @param powerService - Service for retrieving available powers.
   * @param teamService - Service for retrieving available teams.
   * @param hero - Data of the hero being edited, if any.
   */
  constructor(
    public dialogRef: MatDialogRef<HeroFormComponent>,
    private fb: FormBuilder,
    private powerService: PowerService,
    private teamService: TeamService,
    @Inject(MAT_DIALOG_DATA) public hero: ExtendedHero | null
  ) { }

  /**
   * Initializes the component by creating the form and loading available powers and teams.
   */
  ngOnInit(): void {
    this.heroForm = this.fb.group({
      name: [this.hero?.name || '', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      alias: [this.hero?.alias || '', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      description: [this.hero?.description || ''],
      gender: [this.hero?.gender || '', Validators.required],
      powersIds: [this.hero?.powersIds || [], Validators.required],
      teamIds: [this.hero?.teamIds || [], Validators.required],
    });

    this.powerService.getPowers().subscribe(powers => {
      this.powerTypeOptions = powers;
    });

    this.teamService.getTeams().subscribe(teams => {
      this.teamTypeOptions = teams;
    });
  }

  /**
   * Submits the form data if the form is valid.
   * Maps the selected power and team IDs to their names and closes the dialog with the hero data.
   */
  onSubmit(): void {
    if (this.heroForm.valid) {
      const selectedPowers = this.heroForm.get('powersIds')?.value || [];
      const powerNames = selectedPowers.map((id: number) => {
        const power = this.powerTypeOptions.find((p: any) => p.id === id);
        return power ? power.name : '';
      });

      const selectedTeams = this.heroForm.get('teamIds')?.value || [];
      const teamNames = selectedTeams.map((id: number) => {
        const team = this.teamTypeOptions.find((p: any) => p.id === id);
        return team ? team.name : '';
      });

      const heroData: ExtendedHero = {
        ...this.hero,
        ...this.heroForm.value,
        powersIds: selectedPowers,
        powerNames: powerNames,
        teamIds: selectedTeams,
        teamrNames: teamNames,
      };

      this.dialogRef.close(heroData);
    }
  }

  /**
   * Cancels the form and closes the dialog without making any changes.
   */
  onCancel(): void {
    this.dialogRef.close(null); // Cierra el modal sin realizar cambios
  }
}
