import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { PowerService } from '../../services/power.service';
import { TeamService } from '../../services/team.service';
import { of } from 'rxjs';
import { HeroFormComponent } from './hero-form.component';
import { ExtendedHero } from '../../models/hero.model';
import { Power } from '../../models/power.model';
import { Team } from '../../models/team.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../shared/material.module';


describe('HeroFormComponent', () => {
  let component: HeroFormComponent;
  let fixture: ComponentFixture<HeroFormComponent>;
  let powerService: jasmine.SpyObj<PowerService>;
  let teamService: jasmine.SpyObj<TeamService>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<HeroFormComponent>>;


  const mockPowers: Power[] = [
    { id: 1, name: 'Super Strength', description: 'Ability to exert extraordinary physical force.' },
    { id: 2, name: 'Telepathy', description: 'Ability to read and communicate thoughts.' },
  ];

  const mockTeams: Team[] = [
    { id: 1, name: 'Avengers', members: [1, 2] },
    { id: 2, name: 'Justice League', members: [3, 4] },
  ];

  const mockHero: ExtendedHero = {
    id: 1,
    name: 'Clark Kent',
    alias: 'Superman',
    description: 'Description',
    gender: 'Masculino',
    powersIds: [1],
    teamIds: [1]
  };

  beforeEach(waitForAsync(() => {
    const powerServiceSpy = jasmine.createSpyObj('PowerService', ['getPowers']);
    const teamServiceSpy = jasmine.createSpyObj('TeamService', ['getTeams']);
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    TestBed.configureTestingModule({
      imports: [
        HeroFormComponent, 
        ReactiveFormsModule,
        MaterialModule,
        BrowserAnimationsModule
      ],
      providers: [
        FormBuilder,
        { provide: PowerService, useValue: powerServiceSpy },
        { provide: TeamService, useValue: teamServiceSpy },
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: mockHero }
      ]
    }).compileComponents();

    powerService = TestBed.inject(PowerService) as jasmine.SpyObj<PowerService>;
    teamService = TestBed.inject(TeamService) as jasmine.SpyObj<TeamService>;
    dialogRef = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<HeroFormComponent>>;
  }));


  beforeEach(() => {
    powerService.getPowers.and.returnValue(of(mockPowers));
    teamService.getTeams.and.returnValue(of(mockTeams));

    fixture = TestBed.createComponent(HeroFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with provided hero data', () => {
    expect(component.heroForm.value).toEqual({
      name: mockHero.name,
      alias: mockHero.alias,
      description: mockHero.description,
      gender: mockHero.gender,
      powersIds: mockHero.powersIds,
      teamIds: mockHero.teamIds,
    });
  });

  it('should load powers and teams on initialization', fakeAsync(() => {
    component.ngOnInit();
    tick();

    expect(component.powerTypeOptions).toEqual(mockPowers);
    expect(component.teamTypeOptions).toEqual(mockTeams);
  }));

  it('should validate that name and alias only allow letters without spaces', () => {
    const nameControl = component.heroForm.get('name');
    const aliasControl = component.heroForm.get('alias');

    nameControl?.setValue('Clark123');
    aliasControl?.setValue('Superman!');
    fixture.detectChanges();

    expect(nameControl?.valid).toBeFalse();
    expect(aliasControl?.valid).toBeFalse();

    nameControl?.setValue('Clark');
    aliasControl?.setValue('Superman');
    fixture.detectChanges();

    expect(nameControl?.valid).toBeTrue();
    expect(aliasControl?.valid).toBeTrue();
  });

  it('should call onSubmit and close the dialog with hero data if form is valid', () => {
    component.heroForm.setValue({
      name: 'BruceWayne',
      alias: 'Batman',
      description: 'Description',
      gender: 'Masculino',
      powersIds: [1, 2],
      teamIds: [1, 2]
    });

    component.onSubmit();

    expect(dialogRef.close).toHaveBeenCalledWith(jasmine.objectContaining({
      name: 'BruceWayne',
      alias: 'Batman',
      powersIds: [1, 2],
      teamIds: [1, 2]
    }));
  });

  it('should not close the dialog if form is invalid', () => {
    component.heroForm.controls['name'].setValue('');  
    component.onSubmit();
    expect(dialogRef.close).not.toHaveBeenCalled();
  });

  it('should call onCancel and close the dialog with null', () => {
    expect(dialogRef.close).toHaveBeenCalledWith(null);
  });
});
