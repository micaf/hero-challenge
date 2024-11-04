import { AfterViewInit, Component } from '@angular/core';
import { forkJoin, of, switchMap } from 'rxjs';

import { ExtendedHero } from '../../models/hero.model';
import { HeroService } from '../../services/hero.service';
import { TeamService } from '../../services/team.service';
import { PowerService } from '../../services/power.service';

/**
 * Dashboard component displaying a list of heroes and their respective teams and powers.
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements AfterViewInit {
  /**
   * List of heroes with their teams and powers.
   */
  heroes!: ExtendedHero[];

  /**
   * Indicates whether the component is loading results.
   */
  isLoadingResults = true;

  /**
   * Initializes services for hero, team, power operations, and dialog management.
   * @param heroService Service for hero data operations.
   * @param teamService Service for team data operations.
   * @param powerService Service for power data operations.
   */
  constructor(
    private heroService: HeroService,
    private teamService: TeamService,
    private powerService: PowerService,
  ) { }

  /**
   * Lifecycle hook called after the component's view has been initialized.
   * Calls `getAllHeroes` to load heroes' data.
   */
  ngAfterViewInit(): void {
    this.getAllHeroes();
  }

  /**
   * Fetches all heroes along with their associated teams and powers.
   * Updates the `heroes` array with the fetched data.
   */
  getAllHeroes() {
    this.isLoadingResults = true;
    this.heroService.getHeroes().pipe(
      switchMap((heroes) => {
        const teamIds = heroes.flatMap(hero => hero.teamIds).filter((id): id is number => id !== undefined);
        const powerIds = heroes.flatMap(hero => hero.powersIds).filter((id): id is number => id !== undefined);

        return forkJoin({
          heroes: of(heroes),
          teams: teamIds.length > 0 ? this.teamService.getTeamsByIds(teamIds) : of([]),
          powers: powerIds.length > 0 ? this.powerService.getPowersByIds(powerIds) : of([]),
        });
      })
    ).subscribe({
      next: ({ heroes, teams, powers }) => {
        this.heroes = heroes.map(hero => ({
          ...hero,
          teamNames: hero.teamIds?.map(id => teams.find(team => team.id === id)?.name),
          powerNames: hero.powersIds.map(id => powers.find(power => power.id === id)?.name)
        } as ExtendedHero));
        this.isLoadingResults = false;
      },
      error: (err) => {
        console.error(err);
        this.heroes = [];
        this.isLoadingResults = false;
      }
    });
  }

  /**
   * Deletes a hero by ID.
   * Updates the `heroes` array by removing the deleted hero.
   * @param heroId The ID of the hero to delete.
   */
  deleteHero(heroId: number): void {
    this.isLoadingResults = true;
    this.heroService.deleteHero(heroId).subscribe(() => {
      this.heroes = this.heroes.filter(h => h.id !== heroId);
      this.isLoadingResults = false;
    });
  }

  /**
   * Adds a new hero to the list.
   * @param hero The hero data to add.
   */
  addHero(hero: any) {
    this.isLoadingResults = true;
    this.heroService.addHero(hero)
      .subscribe(hero => {
        this.heroes.unshift(hero);
        this.isLoadingResults = false;
      });
  }

  /**
   * Edits an existing hero's details and moves it to the beginning of the list.
   * @param hero The updated hero data.
   */
  editHero(hero: any) {
    this.isLoadingResults = true;
    this.heroService.updateHero(hero).subscribe(() => {
      this.heroes = [hero, ...this.heroes.filter(h => h.id !== hero.id)];
      this.isLoadingResults = false;
    });
  }
}
