import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { Observable, forkJoin, of, switchMap } from 'rxjs';

import { ExtendedHero } from '../../models/hero.model';
import { HeroService } from '../../services/hero.service';
import { TeamService } from '../../services/team.service';
import { PowerService } from '../../services/power.service';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements AfterViewInit {

  heroes!: ExtendedHero[];
  isLoading$: Observable<boolean>;

  /**
   * @param heroService Service for hero data operations.
   * @param teamService Service for team data operations.
   * @param powerService Service for power data operations.
   */
  constructor(
    private heroService: HeroService,
    private teamService: TeamService,
    private powerService: PowerService,
    private loadingService: LoadingService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.isLoading$ = this.loadingService.loading$;
  }

  ngAfterViewInit(): void {
    this.getAllHeroes();
    this.changeDetectorRef.detectChanges();
  }

  getAllHeroes() {
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
          teamNames: hero.teamIds?.map(id => teams.find(team => team.id === id)?.name).filter(name => name),
          powerNames: hero.powersIds.map(id => powers.find(power => power.id === id)?.name).filter(name => name)
      } as ExtendedHero));
      },
      error: (err) => {
        console.error(err);
        this.heroes = [];
      }
    });
  }

  /**
   * @param heroId The ID of the hero to delete.
   */
  deleteHero(heroId: number): void {
    this.heroService.deleteHero(heroId).subscribe(() => {
      this.heroes = this.heroes.filter(h => h.id !== heroId);
    });
  }

  /**
   * @param hero The hero data to add.
   */
  addHero(hero: any) {
    this.heroService.addHero(hero)
      .subscribe(hero => {
        this.heroes.unshift(hero);
      });
  }

  /**
   * Edits an existing hero's details and moves it to the beginning of the list.
   * @param hero The updated hero data.
   */
  editHero(hero: any) {
    this.heroService.updateHero(hero).subscribe(() => {
      this.heroes = [hero, ...this.heroes.filter(h => h.id !== hero.id)];
    });
  }
}
