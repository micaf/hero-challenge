import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';

import { DashboardComponent } from './dashboard.component';
import { HeroService } from '../../services/hero.service';
import { TeamService } from '../../services/team.service';
import { PowerService } from '../../services/power.service';
import { MatDialog } from '@angular/material/dialog';
import { ExtendedHero } from '../../models/hero.model';
import { HeroListComponent } from '../hero-list/hero-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../shared/material.module';
import { Power } from '../../models/power.model';
import { Team } from '../../models/team.model';

/**
 * Test suite for DashboardComponent.
 */
describe('DashboardComponent', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;
    let heroService: jasmine.SpyObj<HeroService>;
    let teamService: jasmine.SpyObj<TeamService>;
    let powerService: jasmine.SpyObj<PowerService>;

    /** Mock data for heroes */
    const mockHeroes: ExtendedHero[] = [
        { id: 1, name: 'Clark Kent', alias: 'Superman', description: 'Description', gender: 'Masculino', powersIds: [1, 3], teamIds: [1, 2] }
    ];

    /** Mock data for teams */
    const mockTeams: Team[] = [
        {
            id: 1,
            name: 'Avengers',
            members: [2, 4, 5, 8, 9, 10, 11, 12, 13, 14, 15],
        }
    ];

    /** Mock data for powers */
    const mockPowers: Power[] = [
        {
            id: 1,
            name: 'Super Strength',
            description: 'Ability to exert extraordinary physical force.',
        }
    ];

    /**
     * Setup and initialization for the test suite.
     */
    beforeEach(waitForAsync(() => {
        const heroServiceSpy = jasmine.createSpyObj('HeroService', ['getHeroes', 'deleteHero', 'addHero', 'updateHero']);
        const teamServiceSpy = jasmine.createSpyObj('TeamService', ['getTeamsByIds']);
        const powerServiceSpy = jasmine.createSpyObj('PowerService', ['getPowersByIds']);
        const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

        heroServiceSpy.getHeroes.and.returnValue(of([]));

        TestBed.configureTestingModule({
            declarations: [DashboardComponent],
            imports: [BrowserAnimationsModule, HeroListComponent, MaterialModule],
            providers: [
                { provide: HeroService, useValue: heroServiceSpy },
                { provide: TeamService, useValue: teamServiceSpy },
                { provide: PowerService, useValue: powerServiceSpy },
                { provide: MatDialog, useValue: dialogSpy }
            ]
        }).compileComponents();

        heroService = TestBed.inject(HeroService) as jasmine.SpyObj<HeroService>;
        teamService = TestBed.inject(TeamService) as jasmine.SpyObj<TeamService>;
        powerService = TestBed.inject(PowerService) as jasmine.SpyObj<PowerService>;

        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
    }));

    /**
     * Test case for component creation.
     */
    it('should create', () => {
        expect(component).toBeTruthy();
    });

    /**
     * Test case to verify that heroes load on initialization.
     */
    it('should load heroes on initialization', () => {
        heroService.getHeroes.and.returnValue(of(mockHeroes));
        teamService.getTeamsByIds.and.returnValue(of(mockTeams));
        powerService.getPowersByIds.and.returnValue(of(mockPowers));

        component.getAllHeroes();

        expect(heroService.getHeroes).toHaveBeenCalled();
        expect(component.heroes.length).toBe(1);
    });

    /**
     * Test case for adding a hero when addHero event is emitted.
     */
    it('should add a hero when addHero event is emitted', fakeAsync(() => {
        const newHero = { id: 1, name: 'Clark Kent', alias: 'Superman', description: 'Description', gender: 'Masculino', powersIds: [1, 3], teamIds: [1, 2] };

        component.heroes = [];
        heroService.addHero.and.returnValue(of(newHero));

        fixture.componentInstance.ngAfterViewInit();
        fixture.detectChanges();

        const heroListComponentDebugElement = fixture.debugElement.query(By.directive(HeroListComponent));
        expect(heroListComponentDebugElement).not.toBeNull();

        const heroListComponent = heroListComponentDebugElement.componentInstance;
        heroListComponent.addHero.emit(newHero);

        tick();
        fixture.detectChanges();

        expect(heroService.addHero).toHaveBeenCalledWith(newHero);
        expect(component.heroes.length).toBe(1);
    }));

    /**
     * Test case for deleting a hero when deleteHero event is emitted.
     */
    it('should delete a hero when deleteHero event is emitted', fakeAsync(() => {
        const heroToDeleteId = 1;
        component.heroes = [
            { id: heroToDeleteId, name: 'Clark Kent', alias: 'Superman', description: 'Description', gender: 'Masculino', powersIds: [1, 3], teamIds: [1, 2] }
        ];

        heroService.deleteHero.and.returnValue(of(component.heroes[0]));

        fixture.componentInstance.ngAfterViewInit();
        fixture.detectChanges();

        const heroListComponentDebugElement = fixture.debugElement.query(By.directive(HeroListComponent));
        expect(heroListComponentDebugElement).not.toBeNull();

        const heroListComponent = heroListComponentDebugElement.componentInstance;
        heroListComponent.deleteHero.emit(heroToDeleteId);

        tick();
        fixture.detectChanges();

        expect(heroService.deleteHero).toHaveBeenCalledWith(heroToDeleteId);
        expect(component.heroes.length).toBe(0);
    }));

    /**
     * Test case for editing a hero and moving it to the beginning of the list.
     */
    it('should edit a hero and move it to the beginning of the list', fakeAsync(() => {
        const editedHero: ExtendedHero = { ...mockHeroes[0], name: 'Superman Edited' };
        component.heroes = [...mockHeroes];
        heroService.updateHero.and.returnValue(of(editedHero));

        fixture.componentInstance.ngAfterViewInit();
        fixture.detectChanges();

        const heroListComponentDebugElement = fixture.debugElement.query(By.directive(HeroListComponent));
        expect(heroListComponentDebugElement).not.toBeNull();

        const heroListComponent = heroListComponentDebugElement.componentInstance;
        heroListComponent.editHero.emit(editedHero);

        tick();
        fixture.detectChanges();

        expect(heroService.updateHero).toHaveBeenCalledWith(editedHero);
        expect(component.heroes[0].name).toBe('Superman Edited');
    }));

    /**
     * Test case for handling errors gracefully in getAllHeroes.
     */
    it('should handle error in getAllHeroes gracefully', fakeAsync(() => {
        heroService.getHeroes.and.returnValue(throwError(() => new Error('Error fetching heroes')));
        spyOn(console, 'error');

        component.ngAfterViewInit();
        tick();
        fixture.detectChanges();

        expect(console.error).toHaveBeenCalledWith(jasmine.any(Error));
        expect(component.heroes).toEqual([]);
    }));
});
