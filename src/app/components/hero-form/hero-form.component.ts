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

@Component({
  selector: 'app-hero-form-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule],
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.scss'],
})
export class HeroFormComponent implements OnInit {
  heroForm!: FormGroup;

  genderOptions = Object.values(Gender);

  teamTypeOptions: Team[] = [];

  powerTypeOptions: Power[] = [];

  /**
   * @param dialogRef
   * @param fb 
   * @param powerService 
   * @param teamService 
   * @param hero
   */
  constructor(
    public dialogRef: MatDialogRef<HeroFormComponent>,
    private fb: FormBuilder,
    private powerService: PowerService,
    private teamService: TeamService,
    @Inject(MAT_DIALOG_DATA) public hero: ExtendedHero | null
  ) { }

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
        teamNames: teamNames,
      };

      this.dialogRef.close({action: heroData.id ? 'edit' : 'add', data: heroData});
    }
  }

  onCancel(): void {
    this.dialogRef.close({action:'close', data: null}); 
  }
}
